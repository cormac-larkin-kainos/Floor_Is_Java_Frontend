import { Application, Request, Response } from "express";
import { Job } from "../model/Job";
import JobService from "../service/JobService";

const jobService = require('../service/JobService')

module.exports = function(app: Application){

    let jobservice: JobService = new JobService();

    app.get("/jobs", async (req: Request, res: Response) => {
       
        let jobs: Job[] =  [];

        try {
        
            jobs = await jobservice.getAllJobs();
        } catch (error) {
            console.error(error);
        }
    res.render('view-all-jobs', {jobs});
    })
}