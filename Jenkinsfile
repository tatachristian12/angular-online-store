pipeline {
    agent any 
    
    stages {
        stage('Build Frontend Assets') {
            agent {
                docker {
                    image 'node:20-alpine'
                    // Reuses the workspace folder so files persist across stages
                    reuseNode true 
                }
            }
            steps {
                // These run smoothly inside the isolated Node environment
                sh 'npm ci'
                sh 'npm run build'
            }
        }

        stage('Build and Tag Docker Image') {
            // This stage jumps back to the main host agent to talk to your Mac's Docker daemon
            steps {
                sh 'docker build -t tatachristian12/angular-online-store:latest .'
            }
        }
    }
}