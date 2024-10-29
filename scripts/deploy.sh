#!/bin/bash

source .env
# Docker Hub Credentials (Set these as environment variables for security)
# DOCKER_USERNAME="${DOCKER_USERNAME:-your_dockerhub_username}"
# DOCKER_PASSWORD="${DOCKER_PASSWORD:-your_dockerhub_password}"
# REPO_URL="https://github.com/vagadiya2005/Microservices.git"
# PROJECT_DIR="Microservices"


# Pull code from the remote repository
echo "Pulling code from remote repository..."
if [ -d "$PROJECT_DIR" ]; then
  cd $PROJECT_DIR
  git pull origin main
else
  git clone $REPO_URL
  cd $PROJECT_DIR
fi

# Docker login
echo "Logging into Docker Hub..."
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

# Build, tag, and push Docker images for each service
declare -A services=( ["auth-service"]="auth-service-img" ["profile-service"]="profile-service-img" ["nginx"]="nginx-service-img" )

for service in "${!services[@]}"; do
  echo "Building Docker image for $service..."
  cd $service || exit
  docker build -t "${services[$service]}" .

  echo "Tagging and pushing Docker image for $service to Docker Hub..."
  docker tag "${services[$service]}:latest" "$DOCKER_USERNAME/${services[$service]}:latest"
  docker push "$DOCKER_USERNAME/${services[$service]}:latest"
  cd ..
done

# Deploy using docker-compose
echo "Deploying with docker-compose..."
cd ..
docker-compose down || true
docker-compose up -d --build

echo "Deployment completed successfully!"
