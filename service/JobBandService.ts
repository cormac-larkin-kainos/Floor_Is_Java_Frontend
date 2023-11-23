import { JobBand } from '../model/JobBand';
import axios from 'axios';

export default class JobBandService {

  private URL: string = process.env.API_URL;
    
  
  constructor(){
    if(!this.URL){
      throw new Error('API_URL ENVIRONMENT NOT SET');
    }
  }

  async getJobBands(): Promise<JobBand[]>{
    try{
      const response = await axios.get(this.URL + 'jobBands');
      const jobBands: JobBand[] = response.data;
        
      return jobBands;
    } catch(e) {
      console.log(e);
      throw new Error('Could not get job bands');
    }
  }

}