import * as jose from 'jose';
import UserRole from '../model/UserRole';

export default function getTokenRole(token:string): UserRole | null {
  const JWT = jose.decodeJwt(token);
  if (!JWT) {
    return null;
  }

  if (!JWT.role) {
    return null;
  }

  return UserRole[JWT.role as keyof typeof UserRole];
}