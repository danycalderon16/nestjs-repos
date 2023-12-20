import { SetMetadata } from '@nestjs/common';
import { Validroles } from 'src/auth/interfaces';

export const  META_ROLES = 'roles'

export const RoleProtected = (...args: Validroles[]) => {
  
  return SetMetadata(META_ROLES, args)
};
