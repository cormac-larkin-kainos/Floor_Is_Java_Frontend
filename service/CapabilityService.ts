import { Capability } from '../model/Capability';
import axios from 'axios';

export default class JobService {

  private URL: string = process.env.API_URL;
    
  
  constructor(){
    if(!this.URL){
      throw new Error('API_URL ENVIRONMENT NOT SET');
    }
  }

  async getCapabilities(): Promise<Capability[]>{
    try{
      const response = await axios.get(this.URL + 'capabilities');
      const capabilities: Capability[] = response.data;
      
      console.log('Hi!');

      return capabilities;
    } catch(e) {
      console.log(e);
      throw new Error('Could not get capabilities');
    }
  }


}