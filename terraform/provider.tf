terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "3.63.0"
    }
  }
  # Uncomment the next block after initial "terraform init && terraform apply"
  # backend "gcs" {
  #   bucket = "sparksbook-bucket-tfstate"
  #   prefix = "terraform/state"
  # }
  required_version = ">= 1.0.0"
}

provider "google" {
  project = var.project_id
  region  = var.region
}
