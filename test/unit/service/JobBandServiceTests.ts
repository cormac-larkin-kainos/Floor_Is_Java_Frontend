import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import chai from 'chai';
const expect = chai.expect;

import JobBandService from '../../../service/JobBandService';

const jobBandService = new JobBandService();

describe('JobBandService', () => {
  describe('getJobBands', () => {
    it('should return job bands', async () => {
      const jobBands = [{ id: 1, name: 'Band A' }, { id: 2, name: 'Band B' }];
      const API_URL = process.env.API_URL + 'jobBands';
      const mock = new MockAdapter(axios);
      mock.onGet(API_URL).reply(200, jobBands);

      const result = await jobBandService.getJobBands();

      expect(result).to.deep.equal(jobBands);
    });

    it('should throw an error when unable to fetch job bands', async () => {
      const API_URL = process.env.API_URL + 'jobBands';
      const mock = new MockAdapter(axios);
      mock.onGet(API_URL).reply(500);

      let error;
      try {
        await jobBandService.getJobBands();
      } catch (e) {
        error = e.message;
      }

      expect(error).to.equal('Could not get job bands');
    });
  });
});
