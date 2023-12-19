import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const GetRawHeaders = createParamDecorator(
  (data, ctx:ExecutionContext )=> {
    const res = ctx.switchToHttp().getRequest();

    const raw = res.rawHeaders
        
    return raw
  }
)