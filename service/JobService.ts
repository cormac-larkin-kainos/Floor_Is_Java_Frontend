import { Job } from '../model/Job';
import axios from 'axios';


export default class JobService {

  private URL: string = process.env.API_URL;

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

  async getJobById(id:number): Promise<Job> {
    try {
      const response = await axios.get(this.URL + 'job/' + id);
      return response.data as Job;
    } catch(e) {
      console.error(e);
      throw new Error('Could not get job');
    }
  }

  async deleteJob(id:number) {
    try {
      await axios.delete(this.URL + 'jobs/' + id);
    } catch(e) {
      throw new Error('Could not delete job');
    }
  }

  async getJobResponsibilities(jobID: number): Promise<string[]> {
    try {
      const response = await axios.get(`${this.URL}jobs/${jobID}/responsibilities`);
      const responsibilities: string[] = response.data;
      return responsibilities;
    } catch (e) {
      console.error(e);
      throw new Error(`Could not get responsibilities for job ${jobID}`);
    }
  }
}