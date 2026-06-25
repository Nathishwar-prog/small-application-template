import { TokenPayload } from '../auth/token.utils';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
