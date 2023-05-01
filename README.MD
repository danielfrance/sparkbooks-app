# Sparkbooks

![logo](./flame.png)

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

- after you've followed the steps above, cd into `sparkbooks-server` and create a `.env` file. The project will ship with a `.env.example` file. You'll need to update this information. Someone on the team will have a `.env` file you can copy
- from `sparkbooks-server` run `sail artisan migrate` which will create all the database tables (make sure you have env variable for the database)
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

## Infrastructure

The `infrastructure` directory contains a helm chart to deploy the application (deployed via github actions) and the relevant terraform needed to provision the infrastructure to deploy this project.

The `terraform` directory holds 2 directories.

- `0-main` - The main infrastructure for this project.
- `1-workloads` - Deploys the workloads onto the GKE cluster.

### Updating Terraform

Make sure you have the `gcloud` cli installed and you are authenticated with access to the `sparkbooks-app` project.

```sh
gcloud auth login
gcloud auth application-default login
```

In the directory you need to update run `terraform init` and `terraform apply`.

### Accessing the Database

The production database is a Cloud SQL Postgres instance that is deployed inside the private VPC. The easiest way to access the database is to port-forward it from the GKE cluster.

```sh
gcloud container clusters get-credentials sparkbooks-cluster --zone us-south1-a --project sparkbooks-app

# Get Username
kubectl -n sparkbooks get secret sparkbook-env -o jsonpath="{.data.DB_USERNAME}" | base64 -d

# Get Password
kubectl -n sparkbooks get secret sparkbook-env -o jsonpath="{.data.DB_PASSWORD}" | base64 -d

# Forward DB to your localhost on port 54321
kubectl port-forward deployment/sparkbooks-server -n sparkbooks 54321:5432
```

## Resources

- [Laravel](https://laravel.com/docs/9.x/)
- [Laravel Sail](https://laravel.com/docs/9.x/sail)
- [GCP Document AI](https://github.com/googleapis/google-cloud-php-document-ai)
- [GCP Cloud Storage](https://cloud.google.com/storage)
- [NextJS Docs](https://nextjs.org/docs/getting-started)
