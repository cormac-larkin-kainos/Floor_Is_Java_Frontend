import * as dotenv from 'dotenv';
dotenv.config();
import { Job } from '../model/Job';
import axios from 'axios';

const URL: string = process.env.API_URL;

export default class JobService {

  async getAllJobs(): Promise<Job[]>{
    try{
      const response = await axios.get(URL + "jobs");
      const jobs: Job[] = response.data;
    
      return jobs;
    } catch(e) {
      throw new Error('Could not get jobs');
    }
  }  
}