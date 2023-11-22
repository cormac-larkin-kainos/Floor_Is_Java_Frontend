import { Job } from '../model/Job';

export class JobValidator {
  validateJob = function (job: Job): string {
    if (job.title.length > 255){
      return 'Job title should not exceed 255 characters';
    }
    if (job.title.length < 5){
      return 'Job title should be greater than 5 characters';
    }
    if ( job.jobSpec.length > 255)
      return 'Job specification should not exceed 255 characters';

    if ( job.jobSpec.length < 5)
      return 'Job specification should be greater than 5 characters';
  };
}