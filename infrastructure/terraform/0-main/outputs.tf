output "cluster_endpoint" {
  value       = google_container_cluster.default.endpoint
  description = "The public cluster endpoint"
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

output "external_dns_gcp_service_account_email" {
  value = module.workload-identity-external-dns.gcp_service_account_email
}

output "external_secrets_gcp_service_account_email" {
  value = module.workload-identity-external-secrets.gcp_service_account_email
}

output "sparkbooks_gcp_service_account_email" {
  value = module.workload-identity-cloud-sql.gcp_service_account_email
}

output "gke_helm_deploy_sa_key" {
  value       = base64decode(google_service_account_key.gke_helm_deploy_key.private_key)
  sensitive   = true
  description = "Used in GitHub Actions to authenticate to GKE"
}
