resource "google_secret_manager_secret" "ghcr-token" {
  secret_id = "ghcr_token"

  replication {
    automatic = true
  }
}

resource "google_secret_manager_secret" "sparkbooks-env" {
  secret_id = "sparkbooks_env"

  replication {
    automatic = true
  }
}
