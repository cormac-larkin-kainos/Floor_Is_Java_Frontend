import { Application, Request, Response } from 'express';
import { Job } from '../model/Job';
import JobService from '../service/JobService';
import CapabilityService from '../service/CapabilityService';
import roleAccess from '../middleware/auth';
import UserRole from '../model/UserRole';
import { Capability } from '../model/Capability';
import JobBandService from '../service/JobBandService';
import { JobBand } from '../model/JobBand';
import { JobRequest } from '../model/JobRequest';
import getTokenRole from '../utils/getTokenRole';


module.exports = function(app: Application) {

  const jobservice: JobService = new JobService();
  const jobbandservice: JobBandService = new JobBandService();
  const capabilityservice: CapabilityService = new CapabilityService();
  

  app.get('/jobs',roleAccess([UserRole.Admin,UserRole.User]), async (req: Request, res: Response) => {
    try {
      const tokenRole: UserRole = getTokenRole(req.session.token);
      const jobs: Job[] = await jobservice.getAllJobs();

      res.render('view-all-jobs', {
        jobs: jobs, 
        token: req.session.token,
        role: tokenRole ? tokenRole.toString() : UserRole.User.toString()
      });
    } catch (e) {
      res.render('view-all-jobs', {
        token: req.session.token,
        errormessage: req.session.errormessage
      });
      console.error(e);
    }
    
  });

  app.get('/add-job', roleAccess([UserRole.Admin]) ,async (req: Request, res: Response) => {
    console.log('IN ADD JOB GET'); 
    let capabilities: Capability[] =  [];
    let jobBands: JobBand[] = [];
    try{
      capabilities = await capabilityservice.getCapabilities();
      jobBands = await jobbandservice.getJobBands();
      console.log('CAPABILITIES: ', capabilities);
      res.render('add-job', { 
        token: req.session.token,
        role: getTokenRole(req.session.token),
        capabilities: capabilities, 
        jobBands: jobBands 
      });
    } catch (error) {
      console.error(error);
    }
  });

  app.get('/deletejob',roleAccess([UserRole.Admin]), async (req:Request, res:Response) => {
    try {
      const jobs: Job[] = await jobservice.getAllJobs();
      res.render('deletejobs',{
        token: req.session.token,
        jobs: jobs,
        errormessage: req.session.errormessage,
        successmessage: req.session.successmessage
      });
    } catch(e){
      req.session.errormessage = e.message;
      res.render('deletejobs',{
        errormessage: req.session.errormessage,
      });
    }
  });

  app.post('/deletejob',roleAccess([UserRole.Admin]), async (req:Request, res:Response) => {
    res.redirect('/confirmdeletejob/' + req.body.job);
  });

  app.post('/confirmdeletejob',roleAccess([UserRole.Admin]), async (req:Request, res:Response) => {
    try {
      const id:number = parseInt(req.body.job);
      jobservice.deleteJob(id);

      req.session.successmessage = 'Job deleted successfully';
      res.redirect('/deletejob');

    } catch (error) {
      req.session.errormessage = 'There was an error attempting to delete the job';
      res.redirect('/deletejob');
      console.error(error);
    }
  });

  app.post('/add-job', roleAccess([UserRole.Admin]), async (req: Request, res: Response) => {

    // Is this correctly returning the new Job ID?
    const data: JobRequest = req.body;
    try {
      await jobservice.addJob(data);

      res.redirect('/jobs');
    }catch (e) {
      console.error(e);
      res.locals.errormessage = e.message;
      const capabilities = await capabilityservice.getCapabilities();
      const jobBands = await jobbandservice.getJobBands();

      const { body } = req;

      res.render('add-job', {
        token: req.session.token,
        role: getTokenRole(req.session.token),
        capabilities: capabilities, 
        jobBands: jobBands,
        ...body
      });
    }
  });


  app.get('/confirmdeletejob/:id',roleAccess([UserRole.Admin]), async(req:Request, res:Response) => {
    try {
      const job: Job = await jobservice.getJobById(parseInt(req.params.id));

      if(!job){
        req.session.errormessage = 'Could not find that job';
        res.redirect('/deletejob');
        return;
      }

      res.render('confirmdelete',{
        token: req.session.token,
        errormessage: req.session.errormessage,
        job: job,
      });

      req.session.errormessage = null;
      req.session.successmessage = null;
    } catch(e){
      req.session.errormessage = e.message;
      res.redirect('/deletejob');
    }
  });

  app.get('/job-spec/:jobID', roleAccess([UserRole.Admin,UserRole.User]), async (req: Request, res: Response) => {
    const jobID = parseInt(req.params.jobID);

    try {
      const responsibilities = await jobservice.getJobResponsibilities(jobID);

      res.render('job-spec', { 
        token: req.session.token,
        responsibilities 
      });
    } catch (error) {
      console.error(error);
      res.render('job-spec',{
        token: req.session.token,
      });
    }
  });
};