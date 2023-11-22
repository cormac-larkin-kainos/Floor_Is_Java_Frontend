import { Request, Response, Application } from 'express';
import { Login } from '../model/Auth';
import AuthService from '../service/AuthService';
import axios from 'axios';

const authService: AuthService = new AuthService();

module.exports = function (app: Application) {
  app.get('/login', async (req: Request, res: Response) => {
    res.render('login');
  });

  app.post('/login', async (req: Request, res: Response) => {
    const data: Login = req.body;
    
    try {
      req.session.token = await authService.login(data);
      axios.defaults.headers.common.Authorization = `Bearer ${req.session.token}`;
      res.redirect('/');

    } catch (e) {
      console.error(e);
      res.locals.errormessage = e.message;
      res.render('login', req.body);
    }
  });

  app.post('/logout', (req: Request, res: Response) => {
    req.session.token = null;
    res.redirect('/login');
  });
};
