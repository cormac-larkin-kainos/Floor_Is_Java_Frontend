# Floor_Is_Java_Frontend

REST API
This application provides a frontend for the REST API: https://github.com/cormac-larkin-kainos/Floor_Is_Java_Backend

1. Follow the steps in the above link to run the REST API

# How to start the Floor_Is_Java_Frontend application
---
Run `npm install` to build your application

In root folder of the project create .env file with the following `API_URL=http://localhost:8080/api/`

Run `npm start` to run application
To check that your application is running enter url `http://localhost:3000/jobs`

# Tests

1. Run `npm test` to run unit tests
2. Run `UI_TEST_URL=http://localhost:3000 && npm run test-ui` to run UI tests locally, change the URL to run against remote

# Config

You can change the URL of the REST API by setting the API_URL environment variable

# Build and run the service through docker
---

You can build in a number of ways using docker and integrate it with a database, these are listed below:
pre-requisite = docker and docker compose are installed in your local system.
               your docker image for `https://github.com/cormac-larkin-kainos/Floor_Is_Java_Frontend` is 
                available locally (the web ui has a dependency on this) and running.

1.  Ensure the environment variables are correct for your api or enter these as 
    additional arguments on the docker build command.

    Run `docker build --build-arg API_URL=http://localhost:8080/api/ -t your-image-name .` from your src directory.
    This will read from your docker file, build the environment required for the 
    image, build your service and create the image locally.
    
    Use `docker images` to verify your image is available after running the above command.
    
    Now run `docker run -d -p 3000:3000 your-image-name`, this will then spin up your image and host on the given port.
    
    Done....the service should be able to operate as expected.      
    