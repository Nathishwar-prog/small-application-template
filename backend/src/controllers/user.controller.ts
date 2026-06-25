import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { ResponseHelper } from '../errors/response.helper';
import { UserDtoMapper } from '../dto/user.dto';

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public register = async (req: Request, res: Response): Promise<Response> => {
    const user = await this.userService.register(req.body);
    const sanitizedUser = UserDtoMapper.toResponse(user);
    return ResponseHelper.created(res, sanitizedUser, 'User registered successfully');
  };

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await this.userService.authenticate(
      email,
      password,
    );

    // Save refreshToken to HttpOnly Cookie
    const { TokenUtils } = await import('../auth/token.utils');
    TokenUtils.setRefreshCookie(res, refreshToken);

    const sanitizedUser = UserDtoMapper.toResponse(user);
    return ResponseHelper.success({
      res,
      message: 'Login successful',
      data: { accessToken, user: sanitizedUser },
    });
  };

  public refresh = async (req: Request, res: Response): Promise<Response> => {
    // Get refresh token from cookie or body
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    const { TokenUtils } = await import('../auth/token.utils');
    if (!refreshToken) {
      const { BadRequestError } = await import('../errors/app-error');
      throw new BadRequestError('Refresh token is required');
    }

    const { accessToken, newRefreshToken } =
      await this.userService.refreshAccessToken(refreshToken);
    TokenUtils.setRefreshCookie(res, newRefreshToken);

    return ResponseHelper.success({
      res,
      message: 'Token refreshed successfully',
      data: { accessToken },
    });
  };

  public logout = async (req: Request, res: Response): Promise<Response> => {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (refreshToken) {
      await this.userService.logout(refreshToken);
    }

    const { TokenUtils } = await import('../auth/token.utils');
    TokenUtils.clearRefreshCookie(res);

    return ResponseHelper.success({
      res,
      message: 'Logout successful',
    });
  };

  public getProfile = async (req: Request, res: Response): Promise<Response> => {
    // req.user is set by authentication middleware
    const userId = req.user!.userId;
    const user = await this.userService.getUserById(userId);
    const sanitizedUser = UserDtoMapper.toResponse(user);

    return ResponseHelper.success({
      res,
      message: 'Profile retrieved successfully',
      data: sanitizedUser,
    });
  };

  public updateProfile = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.user!.userId;
    const user = await this.userService.updateUser(userId, req.body);
    const sanitizedUser = UserDtoMapper.toResponse(user);

    return ResponseHelper.success({
      res,
      message: 'Profile updated successfully',
      data: sanitizedUser,
    });
  };

  public getUserList = async (req: Request, res: Response): Promise<Response> => {
    const skip = parseInt(req.query.skip as string) || 0;
    const take = parseInt(req.query.take as string) || 20;

    const users = await this.userService.getUsers(skip, take);
    const sanitizedUsers = UserDtoMapper.toResponseList(users);

    return ResponseHelper.success({
      res,
      message: 'User list retrieved successfully',
      data: sanitizedUsers,
    });
  };

  public deleteUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.userService.deleteUser(id);

    return ResponseHelper.success({
      res,
      message: 'User deleted successfully',
    });
  };
}

export default UserController;
