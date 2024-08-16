import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Payload } from './auth.service';

export interface RequestUser extends Request {
  user: Payload;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestUser>();
    const token = this.getToken(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload: Payload = await this.jwtService.verifyAsync(token);
      request.user = payload;
    } catch (err) {
      console.error(err);
      throw new UnauthorizedException();
    }

    return true;
  }

  private getToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
