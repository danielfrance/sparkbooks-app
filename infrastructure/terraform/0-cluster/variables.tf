variable "project_id" {
  description = "The project ID to host the cluster in"
  default     = "sparkbooks-app"
}

variable "region" {
  description = "The region to host the cluster in"
  default     = "us-south1"
}

variable "zone" {
  description = "The zone to host the cluster in (required if is a zonal cluster)"
  default     = "us-south1-a"
}

variable "network_name" {
  description = "The name of the network"
  default     = "spark-private"
}

variable "gke_cluster_name" {
  description = "The name of the cluster"
  default     = "sparkbooks-cluster"
}
