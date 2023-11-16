import { Request, Response, Application } from 'express';
import { Login } from '../model/Auth';
import AuthService from '../service/AuthService';
import axios from 'axios';
import { Job } from '../model/Job';

const authService: AuthService = new AuthService();

module.exports = function (app: Application) {
  app.get('/login', async (req: Request, res: Response) => {
    res.render('login');
  });

  app.post('/login', async (req: Request, res: Response) => {
    const data: Login = req.body;
    
    try {
      req.session.token = await authService.login(data);
      const response = await axios.get('/jobs');
      const jobs: Job[] = response.data;
      console.log(req.session.token);
      res.render('view-all-jobs', { token: req.session.token, jobs });

    } catch (e) {
      console.error(e);
      res.locals.errormessage = e.message;
      res.render('login', req.body);
    }
  });

  app.post('/logout', (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error logging out', err);
        return res.redirect('/');
      }
      console.log('logout successful');
      res.redirect('/');
    });
  });
};
