import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {UserRoleEnum} from "../../entities/enum/user-role.enum";
import {AuthService} from "../auth.service";

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request?.user) {
      const { email } = request.user;
      const user = await this.authService.getUserByEmail(email);
      return user.role === UserRoleEnum.ADMIN;
    }

    return false;
  }
}