import { Application, Request, Response } from 'express';
import { Responsibility } from '../model/Responsibility';
import ResponsibilityService from '../service/ResponsibilityService';
import roleAccess from '../middleware/auth';
import UserRole from '../model/UserRole';

module.exports = function(app: Application){

  const responsibilityservice: ResponsibilityService = new ResponsibilityService();

  app.get('/jobs/{jobId}/responsibilities', roleAccess([UserRole.User, UserRole.Admin]), async (req: Request, res: Response) => {
       
    let responsibilities: Responsibility[] =  [];

    try {
        
      responsibilities = await responsibilityservice.getResponsibilitiesForJob();
    } catch (error) {
      console.error(error);
    }
    res.render('/job-spec', {responsibilities});
  });
};