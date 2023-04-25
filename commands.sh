PROJECT_ID=pdf-scanner-346920
SERVICE_ACCOUNT="github-actions-deployer"
GITHUB_REPO=danielfrance/sparkbooks-app
OIDC_POOL="automations-pool"
OIDC_PROVIDER="github-provider"

gcloud services enable \
    artifactregistry.googleapis.com \
    iamcredentials.googleapis.com \
    containerregistry.googleapis.com \
    run.googleapis.com \
    container.googleapis.com \
    --project $PROJECT_ID


## Create service account and assign proper permissions

gcloud iam service-accounts create $SERVICE_ACCOUNT \
    --display-name "$SERVICE_ACCOUNT" \
    --project $PROJECT_ID

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/run.developer"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT@pdf-scanner-346920.iam.gserviceaccount.com" \
    --role="roles/cloudbuild.builds.builder"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT@pdf-scanner-346920.iam.gserviceaccount.com" \
    --role="roles/artifactregistry.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT@pdf-scanner-346920.iam.gserviceaccount.com" \
    --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member="serviceAccount:$SERVICE_ACCOUNT@pdf-scanner-346920.iam.gserviceaccount.com" \
    --role="roles/container.admin"


#####
gcloud iam workload-identity-pools create "$OIDC_POOL" \
    --project="${PROJECT_ID}" \
    --location="global" \
    --display-name="Automations Pool"

gcloud iam workload-identity-pools providers create-oidc "$OIDC_PROVIDER" \
    --project="${PROJECT_ID}" \
    --location="global" \
    --workload-identity-pool="$OIDC_POOL" \
    --display-name="Github provider" \
    --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository" \
    --issuer-uri="https://token.actions.githubusercontent.com"

# The attribute mappings map claims in the GitHub Actions JWT to assertions you can make about the request (like the repository or GitHub username of the principal invoking the GitHub Action). These can be used to further restrict the authentication using --attribute-condition flags. For example, you can map the attribute repository value (which can be used later to restrict the authentication to specific repositories):
# https://token.actions.githubusercontent.com/.well-known/openid-configuration
# --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository"

# Allow authentications from the Workload Identity Provider originating from your repository:
WORKLOAD_IDENTITY_POOL_ID=$(gcloud iam workload-identity-pools \
    describe $OIDC_POOL \
    --location="global" \
    --format="value(name)")

gcloud iam service-accounts add-iam-policy-binding \
    "$SERVICE_ACCOUNT@${PROJECT_ID}.iam.gserviceaccount.com" \
    --project="${PROJECT_ID}" \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/$WORKLOAD_IDENTITY_POOL_ID/attribute.repository/$GITHUB_REPO"



gcloud iam service-accounts add-iam-policy-binding \
    $SERVICE_ACCOUNT@$PROJECT_ID.iam.gserviceaccount.com \
    --role="roles/iam.workloadIdentityUser" \
    --member="principalSet://iam.googleapis.com/${WORKLOAD_IDENTITY_POOL_ID}/attribute.repository/${GITHUB_REPO}"


WORKLOAD_IDENTITY_PROVIDER_LOCATION=$(gcloud iam workload-identity-pools providers \
    describe $OIDC_PROVIDER \
    --location="global" \
    --workload-identity-pool=$OIDC_POOL \
    --format="value(name)")
