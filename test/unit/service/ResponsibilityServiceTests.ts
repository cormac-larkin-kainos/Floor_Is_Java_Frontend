import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import chai from 'chai';
const expect = chai.expect;
import ResponsibilityService from '../../../service/ResponsibilityService';

const responsibilityService = new ResponsibilityService();

const jobID = 1; 

describe('ResponsibilityService', function () {
  describe('getResponsibilitiesForJob', function () {
    it('should return responsibilities from response', async () => {
      const mock = new MockAdapter(axios);

      const data = [
        { responsibilityId: 1, responsibilityDesc: 'Responsibility 1' },
        { responsibilityId: 2, responsibilityDesc: 'Responsibility 2' }
      ];

      mock.onGet('/job-spec').reply(200, data);
      const results = await responsibilityService.getResponsibilitiesForJob();

      expect(results).to.deep.equal(data);
    });

    it('should throw an exception when a 500 error is returned from axios', async () => {
      const mock = new MockAdapter(axios);

      mock.onGet(`/job-spec/${jobID}`).reply(500);

      let error;

      try {
        await responsibilityService.getResponsibilitiesForJob();
      } catch (e) {
        error = e.message;
      }

      expect(error).to.equal('Could not get responsibilities');
    });
  });
});
