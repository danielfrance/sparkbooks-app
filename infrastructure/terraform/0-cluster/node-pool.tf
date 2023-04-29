resource "google_container_node_pool" "default" {
  depends_on         = [google_container_cluster.default]
  name               = "default-pool"
  project            = var.project_id
  location           = var.zone
  cluster            = var.gke_cluster_name
  initial_node_count = 1

  autoscaling {
    min_node_count = 1
    max_node_count = 5
  }

  management {
    auto_repair  = true
    auto_upgrade = true
  }

  node_config {
    machine_type = "e2-small"
    disk_size_gb = 20
    disk_type    = "pd-standard"
    spot         = false

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]

    workload_metadata_config {
      mode = "GKE_METADATA"
    }
  }
}
