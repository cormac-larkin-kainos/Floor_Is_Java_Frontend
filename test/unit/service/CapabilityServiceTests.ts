import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import chai from 'chai';
const expect = chai.expect;

import CapabilityService from '../../../service/CapabilityService'; // Replace '...' with the correct import path

const capabilityService = new CapabilityService();

describe('CapabilityService', () => {
  describe('getCapabilities', () => {
    it('should return capabilities', async () => {
      const capabilities = [{ id: 1, name: 'Capability A' }, { id: 2, name: 'Capability B' }];
      const API_URL = process.env.API_URL + 'capabilities';
      const mock = new MockAdapter(axios);
      mock.onGet(API_URL).reply(200, capabilities);

      const result = await capabilityService.getCapabilities();

      expect(result).to.deep.equal(capabilities);
    });

    it('should throw an error when unable to fetch capabilities', async () => {
      const API_URL = process.env.API_URL + 'capabilities';
      const mock = new MockAdapter(axios);
      mock.onGet(API_URL).reply(500);

      let error;
      try {
        await capabilityService.getCapabilities();
      } catch (e) {
        error = e.message;
      }

      expect(error).to.equal('Could not get capabilities');
    });
  });
});
