pipeline {
    agent any

    stages {
        stage('Clone Repository and Run Docker Compose') {
            steps {
                sshagent(['server']) { // add private key in credential
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@PUBLIC_IP_OF_SERVER "
                        
                        cd /home/ubuntu/Microservices && \
                        
                        git pull https://github.com/vagadiya2005/Microservices.git && \
                        
                        docker-compose up -d --build
                        "
                    '''
                }
            }
        }
    }
}
