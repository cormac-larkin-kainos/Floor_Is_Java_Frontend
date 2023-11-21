import { Application, Request, Response } from 'express';
import { Job } from '../model/Job';
import JobService from '../service/JobService';
import roleAccess from '../middleware/auth';
import UserRole from '../model/UserRole';

module.exports = function(app: Application){

  const jobservice: JobService = new JobService();

  app.get('/jobs',roleAccess([UserRole.Admin]), async (req: Request, res: Response) => {
       
    let jobs: Job[] =  [];

    try {
      jobs = await jobservice.getAllJobs();
      res.render('view-all-jobs', {jobs: jobs, token: req.session.token});
    } catch (error) {
      console.error(error);
    }
    
  });
};