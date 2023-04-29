resource "helm_release" "external_secrets" {
  name       = "external-secrets"
  repository = "https://charts.external-secrets.io"
  chart      = "external-secrets"
  version    = "0.8.1"
  namespace  = "external-secrets"

  values = [
    # Add any values you want to set for the Helm chart here
  ]
}
