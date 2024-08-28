pipeline {
    agent any

    stages {
        stage('Clone Repository and Run Docker Compose') {
            steps {
                sshagent(['server']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ubuntu@13.201.120.102 "
                        
                        cd /home/ubuntu && \
                        
                        rm -rf Microdervices || true && \
                        
                        git clone https://github.com/vagadiya2005/Microservices.git Microdervices && \
                        
                        cd Microdervices && \
                        
                        docker-compose up -d --build
                        "
                    '''
                }
            }
        }
    }
}
