variable "name" {
  description = "General name"
  default     = "sparkbooks"
}

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

variable "cidr_ranges" {
  default = {
    "subnet"                       = "10.1.0.0/20"
    "gke_master_ipv4_cidr_block"   = "10.2.0.0/28"
    "gke_cluster_ipv4_cidr_block"  = "10.3.0.0/18"
    "gke_services_ipv4_cidr_block" = "10.4.0.0/20"
  }
}
