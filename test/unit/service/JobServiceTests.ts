const axios = require("axios");
import MockAdapter from 'axios-mock-adapter';
import chai from 'chai';
const expect = chai.expect;
import { Job } from '../../../model/Job';
import JobService from '../../../service/JobService';
import * as dotenv from 'dotenv';
import { JobRequest } from '../../../model/JobRequest';

const jobService = new JobService();

dotenv.config()

const job: Job = {
  jobID: 1,
  title: 'Software Engineer',
  jobSpec: 'This is a job spec',
  capability: 'Engineering',
  jobURL: 'www.jobs.com',
  jobBand: 'Consultant'
};

const jobRequest: JobRequest = {
  title: 'Software Engineer',
  jobSpec: 'This is a job spec',
  capabilityID: 1,
  jobURL: 'www.jobs.com',
  jobBandID: 1
};

describe('JobService', function () {
  describe('getAllJobs', function () {
    describe('addJob', function(){
      it('should return jobs from response', async () => {
        const mock = new MockAdapter(axios);

        const data = [job];

      const API_URL = process.env.API_URL + "jobs"

      mock.onGet(API_URL).reply(200, data);

        const results = await jobService.getAllJobs();

      expect(results[0]).to.deep.equal(job);
    });

    it('should throw an exception when a 500 error is returned from axios', async () => {
      const mock = new MockAdapter(axios);

      const API_URL = process.env.API_URL + "jobs"

      mock.onGet(API_URL).reply(500);

        let error;

        try {
          await jobService.getAllJobs();
        } catch (e) {
          error = e.message;
        }

        expect(error).to.equal('Could not get jobs');
      });

      it('should throw a could not create job error when a 500 error is returned from axios', async () =>{
        const mock = new MockAdapter(axios);
        const API_URL = process.env.API_URL + "add-job"
        mock.onPost(API_URL).reply(500);
        
        let error;
        try { 
          await jobService.addJob(jobRequest);
        }catch (e) {
          error = e.message;
        }
        expect(error).to.equal('Could not create job');
      });

    });
  });

  it('should return a validation response when job data is invalid', async () => {

    const mock = new MockAdapter(axios);
    const token: string ='';
    const API_URL = process.env.API_URL + "jobs"

    
    const invalidJob: JobRequest = {
      title: '', // Invalid title (empty string)
      jobSpec: 'Short', 
      capabilityID: 1,
      jobURL: 'www.jobs.com',
      jobBandID: 1
    };

    mock.onPost(API_URL,invalidJob).reply(400);
  
    let error;
    try {
      await jobService.addJob(invalidJob);
    } catch (e) {
      error = e.message; // Capture the error message thrown by the service
    }
  
    expect(error).to.equal('Job title should be greater than 5 characters');
  });
  
  
  it('should return the ID of the created job when job data is valid', async () => {
   
    const mock = new MockAdapter(axios);
    const token: string ='';
    const API_URL = process.env.API_URL + "jobs"
   
    const validJob: JobRequest = {
      title: 'Senior Software Engineer',
      jobSpec: 'This is a detailed job spec for a senior software engineer position',
      capabilityID: 2,
      jobURL: 'www.seniorjobs.com',
      jobBandID: 2
    };

    mock.onPost(API_URL,validJob).reply(200,10);

    const createdJobID = await jobService.addJob(validJob);
  
    // Modify the expectation to check for a number (the ID) instead of a string message
    expect(createdJobID).to.be.a('number');
    expect(createdJobID).to.equal(10); // Assuming IDs are positive integers
  });

});