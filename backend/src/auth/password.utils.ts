import bcrypt from 'bcryptjs';

export class PasswordUtils {
  /**
   * Hashes a plain-text password using bcrypt salt rounds.
   */
  public static async hash(password: string, saltRounds: number = 10): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  }

  /**
   * Compares a plain-text password against a stored hashed password.
   */
  public static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default PasswordUtils;
