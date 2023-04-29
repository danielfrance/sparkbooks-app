resource "helm_release" "external-dns" {
  name             = "external-dns"
  repository       = "https://charts.bitnami.com/bitnami"
  chart            = "external-dns"
  version          = "6.18.0"
  namespace        = "external-dns"
  create_namespace = true

  set {
    name  = "provider"
    value = "google"
  }

  set {
    name  = "google.project"
    value = var.project_id
  }

  set {
    name  = "serviceAccount.name"
    value = "external-dns"
  }

  set {
    name  = "serviceAccount.annotations.iam\\.gke\\.io/gcp-service-account"
    value = data.terraform_remote_state.cluster.outputs.external_dns_gcp_service_account_email
  }

  values = [
    # Add any values you want to set for the Helm chart here
  ]
}
