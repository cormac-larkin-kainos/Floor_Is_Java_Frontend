import { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';
import UserRole from '../model/UserRole';

export default function roleAccess(role:UserRole[]) {
  return (req:Request, res:Response, next: NextFunction) => {
    if (!req.session.token) {
      res.redirect('/login');
      return;
    }

    if (req.session.token.length === 0) {
      res.redirect('/login');
      return;
    }

    const JWT = jose.decodeJwt(req.session.token as string);
    if (!JWT) {
      res.redirect('/login');
      return;
    }

    if (!JWT.role) {
      res.redirect('/login');
      return;
    }

    const jwtRole : UserRole = UserRole[JWT.role as keyof typeof UserRole];

    if(role.includes(jwtRole)){
      next();
      return;
    }

    res.status(403).render('noaccess',{token: req.session.token});
  };
}