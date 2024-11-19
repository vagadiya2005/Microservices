pipeline {
    agent {
        label 'jenkins-agent'
    }

    stages {
        stage('Pulling code from remote repo.') {
            steps {
                sh 'cd Microservices && git pull https://github.com/vagadiya2005/Microservices.git'
            }
        }
        
        
        

        stage('Build and tag images in parallel') {
            parallel {
                stage('Build and tag auth-service') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: 'dockerHubCred', passwordVariable: 'dockerHubPass', usernameVariable: 'dockerHubUser')]) {
                            sh "cd Microservices && cd auth-service &&  docker build --cache-from=${env.dockerHubUser}/auth-service-img:latest -t auth-service-img . "
                            sh "docker tag auth-service-img:latest ${env.dockerHubUser}/auth-service-img:latest"
                        }
                    }
                }

                stage('Build and tag profile-service') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: 'dockerHubCred', passwordVariable: 'dockerHubPass', usernameVariable: 'dockerHubUser')]) {
                            sh "cd Microservices && cd profile-service && docker build --cache-from=${env.dockerHubUser}/profile-service-img:latest -t profile-service-img ."
                            sh "docker tag profile-service-img:latest ${env.dockerHubUser}/profile-service-img:latest"
                        }
                    }
                }

                stage('Build and tag nginx-service') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: 'dockerHubCred', passwordVariable: 'dockerHubPass', usernameVariable: 'dockerHubUser')]) {
                            sh "cd Microservices && cd nginx && docker build --cache-from=${env.dockerHubUser}/nginx-service-img:latest -t nginx-service-img ."
                            sh "docker tag nginx-service-img:latest ${env.dockerHubUser}/nginx-service-img:latest"
                        }
                    }
                }
            }
        }

        stage('Push all images to Docker Hub') {
            parallel {
                stage('Push auth-service image') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: 'dockerHubCred', passwordVariable: 'dockerHubPass', usernameVariable: 'dockerHubUser')]) {
                            sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                            sh "docker push ${env.dockerHubUser}/auth-service-img:latest"
                        }
                    }
                }

                stage('Push profile-service image') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: 'dockerHubCred', passwordVariable: 'dockerHubPass', usernameVariable: 'dockerHubUser')]) {
                            sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                            sh "docker push ${env.dockerHubUser}/profile-service-img:latest"
                        }
                    }
                }

                stage('Push nginx-service image') {
                    steps {
                        withCredentials([usernamePassword(credentialsId: 'dockerHubCred', passwordVariable: 'dockerHubPass', usernameVariable: 'dockerHubUser')]) {
                            sh "docker login -u ${env.dockerHubUser} -p ${env.dockerHubPass}"
                            sh "docker push ${env.dockerHubUser}/nginx-service-img:latest"
                        }
                    }
                }
            }
        }

        stage('Deploy docker-compose file') {
            steps {
    
                sh 'cd Microservices && docker-compose up -d --build'
            }
        }
    }
}
