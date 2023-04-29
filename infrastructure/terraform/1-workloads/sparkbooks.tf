resource "helm_release" "sparkbooks" {
  name             = "sparkbooks"
  namespace        = "sparkbooks"
  create_namespace = true
  chart            = "${path.module}/../../charts/sparkbooks"

  values = [
    "${file("${path.module}/../../charts/sparkbooks/values.yaml")}"
  ]

  # Add any required configuration for your chart using set, set_sensitive, or values attributes
}
