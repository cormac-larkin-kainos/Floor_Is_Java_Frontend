import * as dotenv from 'dotenv';
dotenv.config();
import { Job } from '../model/Job';
import axios from 'axios';

export default class JobService {
  url: string = process.env.API_URL;

  async getAllJobs(): Promise<Job[]>{
    try{
      const response = await axios.get(this.url + 'jobs');
      const jobs: Job[] = response.data;
    
      return jobs;
    } catch(e) {
      throw new Error('Could not get jobs');
    }
  }  
}