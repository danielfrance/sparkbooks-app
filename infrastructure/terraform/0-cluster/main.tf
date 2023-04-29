terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.56.0"
    }
  }
  backend "gcs" {
    bucket = "sparkbooks-terraform-state"
    prefix = "cluster"
  }
}

provider "google" {
  project = "sparkbooks-app"
  region  = "us-south1" # Dallas
}

data "google_client_config" "default" {}
