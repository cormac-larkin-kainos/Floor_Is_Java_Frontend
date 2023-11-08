import axios from "axios";
import { Job } from "../model/Job";

export default class JobService {

    URL: string = "http://localhost:8080/api/jobs";

    async getAllJobs(): Promise<Job[]>{
        try{
            const response = await axios.get(this.URL);
            const jobs: Job[] = response.data;
            console.log("Jobs -> ", jobs);
            return jobs;
        } catch(e) {
            throw new Error("Could not get jobs")
        }
}

}