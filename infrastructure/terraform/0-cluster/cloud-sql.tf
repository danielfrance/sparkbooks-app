module "postgresql" {
  depends_on = [google_service_networking_connection.private_vpc_connection]

  source  = "GoogleCloudPlatform/sql-db/google//modules/postgresql"
  version = "~> 15.0.0"

  project_id           = var.project_id
  name                 = "sparkbooks"
  random_instance_name = true
  database_version     = "POSTGRES_14"
  region               = var.region
  tier                 = "db-f1-micro"
  zone                 = var.zone
  availability_type    = "ZONAL"

  ip_configuration = {
    ipv4_enabled        = true
    require_ssl         = false
    private_network     = google_compute_network.default.self_link
    allocated_ip_range  = null
    authorized_networks = []
  }

  db_name         = "sparkbooks"
  disk_size       = 20
  disk_autoresize = true
  disk_type       = "PD_SSD"
  user_name       = "sparkbooks"
}

