import chai from 'chai';
const expect = chai.expect;
import { Job } from '../../../model/Job';
import { JobValidator } from '../../../validator/jobValidator';
import { JobRequest } from '../../../model/JobRequest';

describe('JobValidator', function () {
  describe('validateJob', function () {
  
    it('should return string if title above 255 characters', async () => {
      const validator = new JobValidator();
      const job: JobRequest = {
        title: 'Software EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware EngineerSoftware Engineer',
        jobSpec: 'This is a job spec',
        capabilityID: 1,
        jobURL: 'www.jobs.com',
        jobBandID: 1
      };
      const error = validator.validateJob(job);
      expect(error).to.equal('Job title should not exceed 255 characters');
        
    });
    it('should return string if title less than 5 characters', async () => {
      const validator = new JobValidator();
      const job: JobRequest = {
        title: 'Sof',
        jobSpec: 'This is a job spec',
        capabilityID: 1,
        jobURL: 'www.jobs.com',
        jobBandID: 2
      };
      const error = validator.validateJob(job);
      expect(error).to.equal('Job title should be greater than 5 characters');
             
    });
    it('should return string if job specification is above 255 characters', async () => {
      const validator = new JobValidator();
      const job: JobRequest = {
        title: 'Software Engineer',
        jobSpec: 'This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec This is a job spec  ',
        capabilityID: 1,
        jobURL: 'www.jobs.com',
        jobBandID: 2
      };
      const error = validator.validateJob(job);
      expect(error).to.equal('Job specification should not exceed 255 characters');
    });
    it('should return string if job specification is less than 5 characters', async () => {
    
    });const validator = new JobValidator();
    const job: JobRequest = {
      title: 'Software Engineer',
      jobSpec: 'Thi',
      capabilityID: 1,
      jobURL: 'www.jobs.com',
      jobBandID: 1
    };
    const error = validator.validateJob(job);
    expect(error).to.equal('Job specification should be greater than 5 characters');
  });


  it('should return null if JobRequest is valid', async () => {
    const validator = new JobValidator();
    const job: JobRequest = {
      title: 'Software Engineer',
      jobSpec: 'This is a job spec',
      capabilityID: 1,
      jobURL: 'www.jobs.com',
      jobBandID: 1
    };
    const error = validator.validateJob(job);
    expect(error).to.equal(null);
  });

  
});