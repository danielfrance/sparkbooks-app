resource "google_compute_network" "default" {
  name                    = var.network_name
  auto_create_subnetworks = "false"
  project                 = var.project_id
  routing_mode            = "REGIONAL"
}

resource "google_compute_subnetwork" "default" {
  depends_on    = [google_compute_network.default]
  name          = "${var.gke_cluster_name}-subnet"
  project       = google_compute_network.default.project
  region        = var.region
  network       = google_compute_network.default.name
  ip_cidr_range = "10.1.0.0/20"
}

resource "google_compute_global_address" "private_ip_range" {
  name          = "private-service-ip-range"
  purpose       = "VPC_PEERING"
  address_type  = "INTERNAL"
  prefix_length = 16
  network       = google_compute_network.default.self_link
}

resource "google_service_networking_connection" "private_vpc_connection" {
  network                 = google_compute_network.default.self_link
  service                 = "servicenetworking.googleapis.com"
  reserved_peering_ranges = [google_compute_global_address.private_ip_range.name]
}
