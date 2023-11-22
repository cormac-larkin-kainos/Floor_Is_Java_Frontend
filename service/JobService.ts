import * as dotenv from 'dotenv';
dotenv.config();
import { Job } from '../model/Job';
import { JobValidator } from '../validator/jobValidator';
import axios from 'axios';

axios.defaults.baseURL = process.env.API_URL;


export default class JobService {

  jobValidator: JobValidator = new JobValidator();

  URL: string = '/jobs';
  addJobURL: string = '/add-job';

  async getAllJobs(): Promise<Job[]>{
    try{
      const response = await axios.get(this.URL);
      const jobs: Job[] = response.data;
    
      return jobs;
    } catch(e) {
      throw new Error('Could not get jobs');
    }
  }
  async addJob(job: Job): Promise<number>{
    const error: string = this.jobValidator.validateJob(job);
    if (error) {
      throw new Error(error);
    }
    try{
      if (job.jobID < 0 ){
        throw new Error('Id number cannot be negative');
      }
      const url: string= process.env.API_URL + 'add-job';
      const response = await axios.post(url, job);  
      return response.data;
    } catch(e) {
      throw new Error('Could not create job');
    }
      
  }
}

  

  
  

