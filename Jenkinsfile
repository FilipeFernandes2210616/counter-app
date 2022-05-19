pipeline{
    agent any

    tools {nodejs "node"}

    parameters{
        string(name: 'SPEC', defaultValue:"cypress/integration/1-getting-started/todo.spec.js", description: "Enter the cypress script path that you want to execute")
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
                    execCommand: 'echo "Replace me by your build/install scripts"',
                    execTimeout: 120000,
                    flatten: false,
                    makeEmptyDirs: false,
                    noDefaultExcludes: false,
                    patternSeparator: '[, ]+',
                    remoteDirectory: '',
                    remoteDirectorySDF: false,
                    removePrefix: '',
                    sourceFiles: '**/*')],
                    usePromotionTimestamp: false,
                    useWorkspaceInPromotion: false,
                    verbose: true)]
                )
            }
        }
        stage('Run automated tests') {
            steps {
                sh 'sudo apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb'
                sh 'npm prune'
                sh 'npm cache clean --force'
                sh 'npm i'
                sh 'npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator'
                sh 'rm -f mochawesome.json'
                sh 'npx cypress run --config baseUrl="http://34.140.29.128" --browser ${BROWSER} --spec ${SPEC} --reporter mochawesome'
                sh 'npx mochawesome-merge cypress/results/*.json -o mochawesome-report/mochawesome.json'
                sh 'npx marge mochawesome-report/mochawesome.json'
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