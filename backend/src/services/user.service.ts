import { User } from '@prisma/client';
import { IUserRepository } from '../repositories/user.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { PasswordUtils } from '../auth/password.utils';
import { TokenUtils, TokenPayload } from '../auth/token.utils';
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/app-error';

export class UserService {
  private userRepository: IUserRepository;

  // Utilize Constructor Dependency Injection
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundError('User with the specified ID does not exist');
    }
    return user;
  }

  public async getUsers(skip?: number, take?: number): Promise<User[]> {
    return this.userRepository.findAll(skip, take);
  }

  public async register(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictError('A user with this email address already exists');
    }

    if (!dto.password) {
      throw new BadRequestError('Password is required for registration');
    }

    const passwordHash = await PasswordUtils.hash(dto.password);
    return this.userRepository.create({
      ...dto,
      passwordHash,
    });
  }

  public async authenticate(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.isActive) {
      throw new UnauthorizedError('Invalid login credentials provided');
    }

    const passwordMatch = await PasswordUtils.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid login credentials provided');
    }

    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    };

    const accessToken = TokenUtils.generateAccessToken(payload);
    const refreshToken = TokenUtils.generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Save refresh token to db (expiring in 7 days)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await this.userRepository.saveRefreshToken(user.id, refreshToken, expiresAt);

    return { accessToken, refreshToken, user };
  }

  public async refreshAccessToken(
    token: string,
  ): Promise<{ accessToken: string; newRefreshToken: string }> {
    const storedToken = await this.userRepository.findRefreshToken(token);
    if (!storedToken || storedToken.isRevoked || new Date() > storedToken.expiresAt) {
      throw new UnauthorizedError('Refresh token has expired or been revoked');
    }

    const user = storedToken.user;
    if (!user || !user.isActive) {
      throw new UnauthorizedError('User account associated with this token is inactive');
    }

    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    };

    const accessToken = TokenUtils.generateAccessToken(payload);
    const newRefreshToken = TokenUtils.generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Revoke old token and save new token
    await this.userRepository.revokeRefreshToken(token);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await this.userRepository.saveRefreshToken(user.id, newRefreshToken, expiresAt);

    return { accessToken, newRefreshToken };
  }

  public async logout(token: string): Promise<void> {
    await this.userRepository.revokeRefreshToken(token);
  }

  public async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    let passwordHash: string | undefined;
    if (dto.password) {
      passwordHash = await PasswordUtils.hash(dto.password);
    }

    // Email collision check if changing emails
    if (dto.email && dto.email !== user.email) {
      const existing = await this.userRepository.findByEmail(dto.email);
      if (existing) {
        throw new ConflictError('Email is already registered to another account');
      }
    }

    return this.userRepository.update(id, {
      ...dto,
      ...(passwordHash ? { passwordHash } : {}),
    });
  }

  public async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.userRepository.revokeUserRefreshTokens(id);
    await this.userRepository.delete(id);
  }
}

export default UserService;
