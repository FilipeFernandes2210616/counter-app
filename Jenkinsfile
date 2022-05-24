pipeline{
    agent any

    tools {nodejs "node"}

    parameters{
        string(name: 'SPEC', defaultValue:"cypress/integration/incrementItems.js", description: "Enter the cypress script path that you want to execute")
        choice(name: 'BROWSER', choices:['electron', 'chrome', 'edge', 'firefox'], description: "Select the browser to be used in your cypress tests")
    }

    stages {
        stage('Build/Deploy app to staging') {
            steps {
                sshPublisher(
                    publishers: [
                    sshPublisherDesc(
                    configName: 'staging',
                    transfers: [
                        sshTransfer(
                        cleanRemote: false,
                        excludes: '',
                        execCommand: '''
                        cd app
                        npm i
                        npm run build
                        cd build
                        sudo cp -R * /var/www/html/
                        ''',
                        execTimeout: 120000,
                        flatten: false,
                        makeEmptyDirs: false,
                        noDefaultExcludes: false,
                        patternSeparator: '[, ]+',
                        remoteDirectory: '',
                        remoteDirectorySDF: false,
                        removePrefix: '',
                        sourceFiles: 'app/**')
                    ],
                    usePromotionTimestamp: false,
                    useWorkspaceInPromotion: false,
                    verbose: true)]
                )
            }
        }
        stage('Run automated tests') {
            steps {
                    dir('/var/lib/jenkins/workspace/counter-app/tests'){
                    sh 'npm prune'
                    sh 'npm cache clean --force'
                    sh 'npm i'
                    sh 'npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator'
                    sh 'rm -f mochawesome.json'
                    sh 'sudo npm install cypress --unsafe-perm=true --allow-root'
                    sh 'sudo npx cypress run --config baseUrl="http://34.88.243.24" --browser ${BROWSER} --reporter mochawesome'
                    sh 'npx mochawesome-merge cypress/results/*.json -o mochawesome-report/mochawesome.json'
                    sh 'npx marge mochawesome-report/mochawesome.json'
                }
            }
        }
        stage('Perform manual testing') {
            steps {
                timeout(activity: true, time: 5) {
                    input 'Proceed to production?'
                }
            }
        }
        stage('Release to production') {
            steps {
                echo 'Releasing to production'
            }
        }
    }
}