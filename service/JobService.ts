import * as dotenv from 'dotenv';
import { Job } from '../model/Job';
import axios from 'axios';

dotenv.config();

export default class JobService {

  private URL: string = process.env.API_URL

  constructor(){
    if(!this.URL){
      throw new Error("API_URL ENVIRONMENT NOT SET");
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
}