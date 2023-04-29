output "cluster_endpoint" {
  value = google_container_cluster.default.endpoint
}

output "client_certificate" {
  value = base64decode(google_container_cluster.default.master_auth.0.client_certificate)
}

output "client_key" {
  sensitive = true
  value     = base64decode(google_container_cluster.default.master_auth.0.client_key)
}

output "cluster_ca_certificate" {
  sensitive = true
  value     = base64decode(google_container_cluster.default.master_auth.0.cluster_ca_certificate)
}
