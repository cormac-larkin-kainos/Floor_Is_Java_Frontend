import { Application, Request, Response } from "express";
import { Job } from "../model/Job";
import JobService from "../service/JobService";

const jobService = require('../service/JobService')

module.exports = function(app: Application){

    let jobservice: JobService = new JobService();

    app.get("/jobs", async (req: Request, res: Response) => {
        console.log("Hello")
        let jobs: Job[] =  [];

        try {
            console.log("Hello")
            jobs = await jobservice.getAllJobs();
        } catch (error) {
            console.error(error);
        }
    res.render('view-all-jobs', {jobs});
    })
}