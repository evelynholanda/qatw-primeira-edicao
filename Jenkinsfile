pipeline {
    agent any

    stages {
        stage('Node.js Dependencias') {
            steps {
                sh 'npm install'
            }
        }
        stage('Testes E2E') {
            steps {
                sh 'npx playwright test'
            }
        }
        
    }
}
