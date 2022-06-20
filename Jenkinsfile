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
                    sh 'sudo npm install -g --save-dev mochawesome mochawesome-merge mochawesome-report-generator --unsage-perm=true --allow-root --silent'
                    sh 'sudo rm -f mochawesome.json'
                    sh 'sudo npm install cypress --save-dev'
                    sh 'npx cypress run --config baseUrl=http://34.136.196.80 --browser electron'
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