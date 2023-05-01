terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.56.0"
    }
  }
  backend "gcs" {
    bucket = "sparkbooks-terraform-state"
    prefix = "workloads"
  }
}

data "terraform_remote_state" "cluster" {
  backend = "gcs"
  config = {
    bucket = "sparkbooks-terraform-state"
    prefix = "cluster"
  }
}

data "google_client_config" "default" {}

provider "helm" {
  kubernetes {
    host                   = data.terraform_remote_state.cluster.outputs.cluster_endpoint
    token                  = data.google_client_config.default.access_token
    client_certificate     = data.terraform_remote_state.cluster.outputs.client_certificate
    client_key             = data.terraform_remote_state.cluster.outputs.client_key
    cluster_ca_certificate = data.terraform_remote_state.cluster.outputs.cluster_ca_certificate
  }
}
