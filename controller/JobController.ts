import { Application, Request, Response } from 'express';
import { Job } from '../model/Job';
import JobService from '../service/JobService';

module.exports = function(app: Application){

  const jobservice: JobService = new JobService();

  app.get('/jobs', async (req: Request, res: Response) => {
       
    let jobs: Job[] =  [];

    try {
        
      jobs = await jobservice.getAllJobs();
    } catch (error) {
      console.error(error);
    }
    res.render('view-all-jobs', {jobs});
  });

  app.get('/job-spec/:jobID', async (req: Request, res: Response) => {
    const jobID = parseInt(req.params.jobID);

    try {
      const job = await jobservice.getJobResponsibilities(jobID); 
      const responsibilities = await jobservice.getJobResponsibilities(jobID);

      res.render('job-spec', { job, responsibilities });
    } catch (error) {
      console.error(error);
    }
  });
};