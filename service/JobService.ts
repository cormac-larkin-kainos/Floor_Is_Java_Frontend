import { Job } from '../model/Job';
import { JobValidator } from '../validator/jobValidator';
import axios from 'axios';


export default class JobService {

  private URL: string = process.env.API_URL;
  private jobValidator: JobValidator = new JobValidator();

  constructor(){
    if(!this.URL){
      throw new Error('API_URL ENVIRONMENT NOT SET');
    }
  }
  
  async getAllJobs(): Promise<Job[]>{
    try{
      const response = await axios.get(this.URL + 'jobs');
      const jobs: Job[] = response.data;
    
      return jobs;
    } catch(e) {
      console.log(e);
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
      const response = await axios.post(this.URL + 'add-job', job);  
      return response.data;
    } catch(e) {
      throw new Error('Could not create job');
    }
      
  }
}

  

  
  

