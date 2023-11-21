import { Application, Request, Response } from 'express';
import { Job } from '../model/Job';
import JobService from '../service/JobService';
import roleAccess from '../middleware/auth';
import UserRole from '../model/UserRole';
import getTokenRole from '../utils/getTokenRole';

module.exports = function(app: Application){

  const jobservice: JobService = new JobService();

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

  app.get('/deletejob',roleAccess([UserRole.Admin]), async (req:Request, res:Response) => {
    try {
      const jobs: Job[] = await jobservice.getAllJobs();
      res.render('deletejobs',{
        jobs: jobs,
        errormessage: req.session.errormessage,
        successmessage: req.session.successmessage
      })
    } catch(e){
      req.session.errormessage = e.message;
      res.render('deletejobs',{
        errormessage: req.session.errormessage,
      })
    }
  })

  app.post('/deletejob',roleAccess([UserRole.Admin]), async (req:Request, res:Response) => {
    res.redirect('/confirmdeletejob/' + req.body.job);
  });

  app.post('/confirmdeletejob',roleAccess([UserRole.Admin]), async (req:Request, res:Response) => {
    try {
      const id:number = parseInt(req.body.job);
      const result = await jobservice.deleteJob(id);

      if(!result){
        req.session.errormessage = "Could not delete the job";
        res.redirect("/confirmdeletejob/" + id)
        return;
      }

      req.session.successmessage = "Job deleted successfully";
      res.redirect('/deletejob');

    } catch (error) {
      req.session.errormessage = "There was an error attempting to delete the job"
      res.redirect("/deletejob");
      console.error(error)
    }
  })

  app.get('/confirmdeletejob/:id',roleAccess([UserRole.Admin]), async(req:Request, res:Response) => {
    try {
      const job: Job = await jobservice.getJobById(parseInt(req.params.id));

      if(!job){
        req.session.errormessage = "Could not find that job"
        res.redirect('/deletejob')
        return;
      }

      res.render("confirmdelete",{
        job: job,
      })
    } catch(e){
      req.session.errormessage = e.message
      res.redirect("/deletejob")
    }
  })

};