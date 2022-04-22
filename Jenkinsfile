pipeline {
    agent { docker { image 'node:16.13.1-alpine' } }
    stages {
        stage('build') {
            steps {
                sh 'cd server-mongodb docker-compose up'
            }
        }
    }
}