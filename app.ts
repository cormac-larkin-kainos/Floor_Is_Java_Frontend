import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import path from 'path';
import nunjucks from 'nunjucks';
import express from 'express';
import session from 'express-session';
import token from './middleware/token';
import getTokenRole from './utils/getTokenRole';

const app = express();

dotenv.config();

// Configure Nunjucks.
const appViews = path.join(__dirname, '/views/');

const nunjucksConfig = {
  autoescape: true,
  noCache: true,
  express: app
};

nunjucks.configure(appViews, nunjucksConfig);

// Configure express.
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 3600000}}));

declare module 'express-session' {
  interface SessionData {
    token: string,
    errormessage: string | null,
    successmessage: string | null,
  }
}

app.listen(3000, () => {
  console.log('*** Server listening on port 3000 ***');
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./controller/AuthController')(app);

//IF THE USER NEEDS TO BE LOGGED IN TO ACCESS IT PUT IT BELOW THIS APP.USE
app.use(token);
app.get('/', (req: Request, res: Response)=> {
  res.render('index', {
    token: req.session.token,
    role: getTokenRole(req.session.token),
  });
});


// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./controller/JobController')(app);
