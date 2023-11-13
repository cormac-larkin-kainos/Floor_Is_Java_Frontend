import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import chai from 'chai';
const expect = chai.expect;
import { Job } from '../../../model/Job';
import JobService from '../../../service/JobService';

const jobService = new JobService();


const job: Job = {
  jobID: 1,
  title: 'Software Engineer',
  jobSpec: 'This is a job spec',
  jobURL: 'www.jobs.com',
};

describe('JobService', function () {
  describe('getAllJobs', function () {
    it('should return jobs from response', async () => {
      const mock = new MockAdapter(axios);

      const data = [job];

      mock.onGet(jobService.URL).reply(200, data);

      const results = await jobService.getAllJobs();

      expect(results[0]).to.deep.equal(job);
    });

    it('should throw an exception when a 500 error is returned from axios', async () => {
      const mock = new MockAdapter(axios);

      mock.onGet(jobService.URL).reply(500);

      let error;

      try {
        await jobService.getAllJobs();
      } catch (e) {
        error = e.message;
      }

      expect(error).to.equal('Could not get jobs');
    });
  });
});
