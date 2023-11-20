import * as dotenv from 'dotenv';
import { Job } from '../model/Job';
import axios from 'axios';

dotenv.config();

export default class JobService {
  url: string = 'https://tk6ar7pqdr.eu-west-1.awsapprunner.com/api/';

  async getAllJobs(): Promise<Job[]>{
    try{
      const response = await axios.get(this.url + 'jobs');
      const jobs: Job[] = response.data;
    
      return jobs;
    } catch(e) {
      console.log(e);
      throw new Error('Could not get jobs');
    }
  } 
}