#!/bin/bash

# Load environment variables from .env file
source .env

# Docker Hub Credentials (Environment variables)
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

# Docker login with --password-stdin to avoid non-TTY error
echo "Logging into Docker Hub..."
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Build, tag, and push Docker images for each service
declare -A services=( ["auth-service"]="auth-service-img" ["profile-service"]="profile-service-img" ["nginx"]="nginx-service-img" )

for service in "${!services[@]}"; do
  echo "Building Docker image for $service..."
  
  if [ -d "$service" ]; then
    cd $service || exit
    docker build -t "${services[$service]}" .

    echo "Tagging and pushing Docker image for $service to Docker Hub..."
    docker tag "${services[$service]}:latest" "$DOCKER_USERNAME/${services[$service]}:latest"
    docker push "$DOCKER_USERNAME/${services[$service]}:latest"
    cd ..
  else
    echo "Error: Directory $service does not exist!"
    exit 1
  fi
done

# Deploy using docker-compose
echo "Deploying with docker-compose..."
cd ..
docker-compose down || true
docker-compose up -d --build

echo "Deployment completed successfully!"
