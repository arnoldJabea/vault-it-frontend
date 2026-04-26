pipeline {
    agent any

    environment {
        // Ajout de ton pseudo Docker Hub pour l'autorisation de push
        DOCKER_IMAGE = 'pierrick2/vault-it-frontend'
        DOCKER_TAG = "v${env.BUILD_ID}"
    }

    stages {
        stage('📥 Checkout Code') {
            steps {
                echo '1. Récupération du code source Frontend depuis GitHub...'
                checkout scm
            }
        }

        stage('📦 Install Dependencies') {
            steps {
                echo '2. Installation des modules...'
                sh 'npm install'
            }
        }

        stage('🐳 Build Docker Image (Multi-stage)') {
            steps {
                echo '3. Construction de l\'image Docker avec Nginx...'
                sh "docker build -t ${DOCKER_IMAGE}:latest -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('☁️ Push to Docker Registry') {
            steps {
                echo '4. Envoi de l\'image sur DockerHub...'
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                    sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                    sh "docker push ${DOCKER_IMAGE}:latest"
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }

        stage('🚀 Deploy Application') {
            steps {
                echo '5. Déploiement des conteneurs en production...'
                // Exécution locale de docker-compose
                sh "cd /home/Pierrick/vault-it-prod && docker-compose pull && docker-compose up -d"
            }
        }
    }

    post {
        success { echo '✅ SUCCESS : L\'image Frontend est prête et déployée !' }
        failure { echo '❌ FAILED : Erreur de build Frontend.' }
        always  { cleanWs() }
    }
}