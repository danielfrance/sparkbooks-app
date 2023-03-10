# Sparkbooks
<p align="center"><svg class="h-10 w-10" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" width="200">
            <path d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z" fill="#4C51BF" stroke="#4C51BF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z" fill="white"/>
        </svg>
        <br>
        **Sparkbooks**
    </p>

## About Sparkbooks
## AI receipt and invoice scanner


[add build status]

Sparkbooks is a [Laravel](https://laravel.com) API powered backend and a [NextJS](https://nextjs.org) powered frontend and built using Docker

## Project Dependencies
- [Docker](https://www.docker.com/)


## Getting Started
once you've pullded down the repo, you'll see the project is broken down into two directories; `sparkbooks-server` and `frontend`. To get started, following the commands below:
- cd into project directory
- run `npm install`
- run `npm bootstrap:install` - this will install all the dependencies for the both directories
- if this is your first installation - jump to the the First Installation section before running the next step
- run `npm run up` - this will spin up the docker container and the nextjs server


## First installation
- after you've followed the steps above, cd into `sparkbooks-server` and create a `.env` file.  The project will ship with a `.env.example` file. You'll need to update this information.  Someone on the team will have a `.env` file you can copy
- from `sparkbooks-server`  run `sail artisan migrate` which will create all the database tables (make sure you have env variable for the database)
- in the `sparkbooks-server` directory, also run `sail artisan db:seed --class=DevSeeder` this will seed the database with users, workspaces, permission, and roles.  
- You will also need GCP service account credentials created in order to utilize the parser fully

## Database GUI
If you're using a database GUI (which I recommend) you can connect to the docker container by adding the following information:
- database name: `sparkbooks`
- user name: `sail`
- password: `password`

## Trouble shooting
- if you have trouble spinning up the docker container, cd into `sparkbooks-server` and run `sail build --no-cache` (Sail is just a Laravel wrapper for Docker)
- make sure all the composer and npm packages are installed
 
## Resources

-   [Laravel](https://laravel.com/docs/9.x/)
-   [Laravel Sail](https://laravel.com/docs/9.x/sail)
-   [GCP Document AI](https://github.com/googleapis/google-cloud-php-document-ai)
-   [GCP Cloud Storage](https://cloud.google.com/storage)
-   [NextJS Docs](https://nextjs.org/docs/getting-started)
