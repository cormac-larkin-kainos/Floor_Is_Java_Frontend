const axios = require("axios");
import MockAdapter from 'axios-mock-adapter';
import chai from 'chai';
const expect = chai.expect;
import { Job } from '../../../model/Job';
import * as dotenv from 'dotenv';
import AuthService from '../../../service/AuthService';

const authService:AuthService = new AuthService();

dotenv.config()

describe('AuthService', function () {
  describe('login', function () {
    it('should return token when given valid credentials', async () => {
      const mock = new MockAdapter(axios);

      const API_URL = process.env.API_URL + "login"

      mock.onPost(API_URL).reply(200, "TEST.TEST.TEST");


      const results = await authService.login({
        username: process.env.TEST_VALID_USERNAME,
        password: process.env.TEST_VALID_PASSWORD
      })

      expect(results).to.equal("TEST.TEST.TEST");
    });

    it('should throw exception when invalid credentials passed', async () => {
        const mock = new MockAdapter(axios);
  
        const API_URL = process.env.API_URL + "login"
  
        mock.onPost(API_URL).reply(401);
  
        let error;

        try {
            const results = await authService.login({
                username: "test",
                password: "test"
              })
        } catch (e) {
            error = e.message;
        }

        expect(error).to.equal('Invalid Login credentials');
    });

    it('should throw an exception when a 500 error is returned from axios', async () => {
        const mock = new MockAdapter(axios);
  
        const API_URL = process.env.API_URL + "login"
  
        mock.onPost(API_URL).reply(500);
  
        let error;
  
        try {
            const results = await authService.login({
                username: "test",
                password: "test"
              })
        } catch (e) {
            error = e.message;
        }

        expect(error).to.equal('Invalid Login credentials');
      });
  });
});
