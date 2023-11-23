import { Application, Request, Response } from 'express';
import { Job } from '../model/Job';
import JobService from '../service/JobService';
import CapabilityService from '../service/CapabilityService';
import roleAccess from '../middleware/auth';
import UserRole from '../model/UserRole';
<<<<<<< HEAD
import { Capability } from '../model/Capability';
import JobBandService from '../service/JobBandService';
import { JobBand } from '../model/JobBand';
import { JobRequest } from '../model/JobRequest';
import getTokenRole from '../utils/getTokenRole';

=======
import getTokenRole from '../utils/getTokenRole';
>>>>>>> 575c94f5a3821388375b734d9ad2508b5ff31748

module.exports = function(app: Application){

  const jobservice: JobService = new JobService();
  const jobbandservice: JobBandService = new JobBandService();
  const capabilityservice: CapabilityService = new CapabilityService();
  
  

  app.get('/jobs',roleAccess([UserRole.Admin,UserRole.User]), async (req: Request, res: Response) => {
       
    let jobs: Job[] =  [];

    try {
      jobs = await jobservice.getAllJobs();
      res.render('view-all-jobs', {
<<<<<<< HEAD
        role: getTokenRole(req.session.token),
        jobs: jobs, 
        token: req.session.token});
=======
        jobs: jobs,
        token: req.session.token,
        role: getTokenRole(req.session.token)
      });
>>>>>>> 575c94f5a3821388375b734d9ad2508b5ff31748
    } catch (error) {
      console.error(error);
    }
    
  });

<<<<<<< HEAD
  app.get('/add-job', roleAccess([UserRole.Admin]) ,async (req: Request, res: Response) => {
  
    let capabilities: Capability[] =  [];
    let jobBands: JobBand[] = [];
    try{
      capabilities = await capabilityservice.getCapabilities();
      jobBands = await jobbandservice.getJobBands();

      console.log(capabilities);
      console.log(jobBands);

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

  app.post('/add-job', roleAccess([UserRole.Admin]), async (req: Request, res: Response) => {

    // Is this correctly returning the new Job ID?
    const data: JobRequest = req.body;
=======
  app.get('/add-job',roleAccess([UserRole.Admin]), async (req: Request, res: Response) => {

    const jobBands = [
      { value: 'engineering', label: 'Engineering' },
      { value: 'platforms', label: 'Platforms' },
      { value: 'data&AI', label: 'Data & AI' },
      { value: 'qualityAssurance', label: 'Quality Assurance' },
      { value: 'cyberSecurity', label: 'Cyber Security' },
    ];

    const jobCapabilities = [
      { value: 'engineering', label: 'Apprentice' },
      { value: 'engineering', label: 'Trainee' },
      { value: 'engineering', label: 'Associate' },
      { value: 'engineering', label: 'Senior Associate' },
      { value: 'engineering', label: 'Consultant' },
      { value: 'engineering', label: 'Manager' },
      { value: 'engineering', label: 'Principle' },
      { value: 'engineering', label: 'Leadership Community' },
    ];
  
    res.render('add-job', { 
      jobBands:jobBands, 
      jobCapabilities: jobCapabilities
    });
    
  });

  app.post('/add-job',roleAccess([UserRole.Admin]), async (req: Request, res: Response) => {
    const data: Job = req.body;
    let id: number;
>>>>>>> 575c94f5a3821388375b734d9ad2508b5ff31748
    try {
      await jobservice.addJob(data);

      res.redirect('/jobs');
    }catch (e) {
      console.error(e);
      res.locals.errormessage = e.message;

      res.render('add-job', req.body);
    }
  });


};