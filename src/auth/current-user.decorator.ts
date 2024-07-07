import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export const getCurrentUserByContext = (
  data: string,
  context: ExecutionContext,
): User => {
  let request: any = null;
  if (context.getType() === 'http') {
    request = context.switchToHttp().getRequest();
  } else if (context.getType() === 'rpc') {
    request = context.switchToRpc().getData();
  }

  if (!request || !request.user) {
    return null;
  }

  if (data) {
    // If specific data is requested, return only that data
    return request.user && request.user[data];
  }

  // If no specific data is requested, return the entire user object
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (data: string, context: ExecutionContext) =>
    getCurrentUserByContext(data, context),
);
