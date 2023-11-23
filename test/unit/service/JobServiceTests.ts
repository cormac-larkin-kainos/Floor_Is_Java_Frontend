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

      
      it('should throw an error when axios returns a negative id number', async () => {
        const url: string= process.env.API_URL + 'add-job';
        const mock = new MockAdapter(axios);
        mock.onPost(url).reply(500);

        let error;
        try {
          await jobService.addJob(jobRequest);
        } catch (e) {
          error = e.message;
        }

        expect(error).to.equal('Could not create job');

      });

    });
  });
});