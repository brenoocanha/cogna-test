/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SensisitveDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.omitPassword(data)));
  }

  private omitPassword(user: any) {
    if (!user) return user;

    if (Array.isArray(user)) {
      return user.map((u) => this.omitPassword(u));
    }

    if (typeof user === 'object' && 'password' in user) {
      const {
        password,
        security_code,
        security_code_expiration,
        security_code_used,
        ...userWithoutPassword
      } = user;
      return userWithoutPassword;
    }

    return user;
  }
}
