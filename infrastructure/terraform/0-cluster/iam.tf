module "workload-identity-external-dns" {
  source              = "terraform-google-modules/kubernetes-engine/google//modules/workload-identity"
  project_id          = var.project_id
  namespace           = "external-dns"
  name                = "external-dns"
  use_existing_k8s_sa = true
  annotate_k8s_sa     = false
}

resource "google_project_iam_member" "external-dns-admin" {
  project = var.project_id
  role    = "roles/dns.admin"
  member  = "serviceAccount:${module.workload-identity-external-dns.gcp_service_account_email}"
}

module "workload-identity-external-secrets" {
  source              = "terraform-google-modules/kubernetes-engine/google//modules/workload-identity"
  project_id          = var.project_id
  namespace           = "external-secrets"
  name                = "external-secrets"
  use_existing_k8s_sa = true
  annotate_k8s_sa     = false
}

resource "google_project_iam_member" "external-secrets-accessor" {
  project = var.project_id
  role    = "roles/secretmanager.secretAccessor"
  member  = "serviceAccount:${module.workload-identity-external-secrets.gcp_service_account_email}"
}

module "workload-identity-cloud-sql" {
  source              = "terraform-google-modules/kubernetes-engine/google//modules/workload-identity"
  project_id          = var.project_id
  namespace           = "sparkbooks"
  name                = "sparkbooks"
  use_existing_k8s_sa = true
  annotate_k8s_sa     = false
}

resource "google_project_iam_member" "cloud-sql-client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${module.workload-identity-cloud-sql.gcp_service_account_email}"
}
