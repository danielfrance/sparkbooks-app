resource "google_storage_bucket" "tfstate" {
  name          = "sparksbook-bucket-tfstate"
  force_destroy = false
  location      = "US"
  storage_class = "STANDARD"
  versioning {
    enabled = true
  }
}