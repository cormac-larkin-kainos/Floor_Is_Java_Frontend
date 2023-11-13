import { Request, Response } from 'express';
import path from 'path';
import nunjucks from 'nunjucks';
import express from 'express';
const app = express();

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.listen(3000, () => {
  console.log('*** Server listening on port 3000 ***');
});

app.get('/', (req: Request, res: Response)=> {
  res.render('index');
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./controller/JobController')(app);