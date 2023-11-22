const axios = require("axios");
import MockAdapter from 'axios-mock-adapter';
import chai from 'chai';
const expect = chai.expect;
import { Job } from '../../../model/Job';
import JobService from '../../../service/JobService';
import * as dotenv from 'dotenv';

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

describe('JobService', function () {
  describe('getAllJobs', function () {
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
  });

  describe("delete job",function() {
    it("Should return true when attempting to delete valid id",async () => {
      const mock = new MockAdapter(axios);
      const API_URL = process.env.API_URL + "jobs/" + -1;

      mock.onDelete(API_URL).reply(200)

      let success = await jobService.deleteJob(-1);

      expect(success).to.be.true;
    });

    it("Should return false when attempting to delete an id that doesn't exist", async () => {
      const mock = new MockAdapter(axios);
      const API_URL = process.env.API_URL + "jobs/" + -1;

      mock.onDelete(API_URL).reply(404);

      let success = await jobService.deleteJob(-1);

      expect(success).to.be.false;
    })

    it("Should return false if a server error occurs", async () => {
      const mock = new MockAdapter(axios);
      const API_URL = process.env.API_URL + "jobs/" + -1;

      mock.onDelete(API_URL).reply(500);

      let success = await jobService.deleteJob(-1);

      expect(success).to.be.false;
    });


  })
});
