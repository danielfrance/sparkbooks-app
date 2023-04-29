resource "helm_release" "external-secrets" {
  name             = "external-secrets"
  repository       = "https://charts.external-secrets.io"
  chart            = "external-secrets"
  version          = "0.7.1"
  namespace        = "external-secrets"
  create_namespace = true

  set {
    name  = "certController.serviceAccount.create"
    value = true
  }

  set {
    name  = "certController.serviceAccount.name"
    value = "external-secrets"
  }

  set {
    name  = "certController.serviceAccount.annotations.iam\\.gke\\.io/gcp-service-account"
    value = data.terraform_remote_state.cluster.outputs.external_secrets_gcp_service_account_email
  }

  set {
    name  = "resources.requests.cpu"
    value = "50m"
  }

  set {
    name  = "resources.requests.memory"
    value = "50Mi"
  }

  set {
    name  = "resources.limits.memory"
    value = "50Mi"
  }
}
