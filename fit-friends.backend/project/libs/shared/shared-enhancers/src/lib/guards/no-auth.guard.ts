import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {LoggedUserException} from '@project/util-core';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const email = request.body.email;
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return true;
    }
    const tokenEmail = this.jwtService.decode(token)['email'];
    if(tokenEmail !== email) {
      return true;
    }
    try {
      await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('jwt.accessTokenSecret'),
          ignoreExpiration: false
        }
      );
    } catch {
      return true;
    }
    throw new LoggedUserException({email, token});
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
