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
    master_ipv4_cidr_block  = var.cidr_ranges["gke_master_ipv4_cidr_block"]
  }

  ip_allocation_policy {
    cluster_ipv4_cidr_block  = var.cidr_ranges["gke_cluster_ipv4_cidr_block"]
    services_ipv4_cidr_block = var.cidr_ranges["gke_services_ipv4_cidr_block"]
  }

  // Cluster is a private cluster but the control plane is accessible from anywhere currently
  master_authorized_networks_config {
    cidr_blocks {
      cidr_block   = "0.0.0.0/0"
      display_name = "World"
    }
  }
}

resource "google_compute_firewall" "admission-webhooks" {
  name        = "admission-webhooks"
  description = "Allow master to hit pods for admission controllers/webhooks"
  project     = var.project_id
  network     = google_compute_network.default.name
  direction   = "INGRESS"

  source_ranges = ["10.2.0.0/28"]

  allow {
    protocol = "tcp"
    ports    = [8443]
  }
}
