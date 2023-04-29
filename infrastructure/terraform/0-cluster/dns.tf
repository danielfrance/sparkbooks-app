module "public-zone" {
  source     = "terraform-google-modules/cloud-dns/google"
  version    = "4.2.1"
  project_id = var.project_id
  type       = "public"
  name       = "sparkbooks-public-zone"
  domain     = "sparkbooks.io."
}
