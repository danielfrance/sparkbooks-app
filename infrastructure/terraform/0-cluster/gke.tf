provider "google-beta" {
  project = var.project_id
  region  = var.region
}

resource "google_container_cluster" "default" {
  provider                 = google-beta
  project                  = var.project_id
  name                     = var.gke_cluster_name
  location                 = var.zone
  initial_node_count       = 1
  networking_mode          = "VPC_NATIVE"
  network                  = google_compute_network.default.name
  subnetwork               = google_compute_subnetwork.default.name
  logging_service          = "none"
  remove_default_node_pool = true

  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  private_cluster_config {
    enable_private_nodes    = true
    enable_private_endpoint = false
    master_ipv4_cidr_block  = "10.2.0.0/28"
  }

  ip_allocation_policy {
    cluster_ipv4_cidr_block  = "10.3.0.0/18"
    services_ipv4_cidr_block = "10.4.0.0/20"
  }

  master_authorized_networks_config {
    cidr_blocks {
      cidr_block   = "0.0.0.0/0"
      display_name = "World"
    }
  }
}
