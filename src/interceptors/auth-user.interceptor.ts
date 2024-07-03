import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";

import { UserEntity } from "../modules/user/user.entity";
import { ContextProvider } from "../providers/context.provider";
import { StatusEnum } from '../constants/status.enum';
import { UserIsNotActiveException } from '../modules/auth/exceptions/user-is-not-active.exception';

@Injectable()
export class AuthUserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>){
        const request = context.switchToHttp().getRequest();

        if (request.user.status === StatusEnum.INACTIVE) {
            throw new UserIsNotActiveException()
        }

        ContextProvider.setAuthUser(<UserEntity>request.user);
        return next.handle();
    }
}