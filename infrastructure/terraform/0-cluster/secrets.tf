resource "google_secret_manager_secret" "ghcr-token" {
  secret_id = "ghcr_token"
}
