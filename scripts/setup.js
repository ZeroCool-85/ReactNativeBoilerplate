const { execSync } = require('child_process')
const readline = require('readline')
const fs = require('fs')

const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    fg: {
        Black: "\x1b[30m",
        Red: "\x1b[31m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
        White: "\x1b[37m",
        Crimson: "\x1b[38m"
    },
    bg: {
        Black: "\x1b[40m",
        Red: "\x1b[41m",
        Green: "\x1b[42m",
        Yellow: "\x1b[43m",
        Blue: "\x1b[44m",
        Magenta: "\x1b[45m",
        Cyan: "\x1b[46m",
        White: "\x1b[47m",
        Crimson: "\x1b[48m"
    }
};

setup()


process.stdin.resume()
process.stdin.setEncoding('utf8')

process.on('exit', (code) => {
    process.stdout.write(`${colors.fg.White}`)
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function setup() {
    await installDepth()
    await renameApp()
    await setUpGit()
}

async function installDepth () {
    execSync('yarn install && sudo npm install react-native-rename -g', {stdio: 'inherit'})
    return true
}

const questionName = () => {
    return new Promise((resolve, reject) => {
        rl.question('Name of your app: ', (answer) => {
            resolve(answer)
        })
    })
}

const questionRemoteRepo = () => {
    return new Promise((resolve, reject) => {
        rl.question('Do you want connect your a remote repository? [Y/n] ', (answer) => {
            resolve(answer)
        })
    })
}

const questionUrlRepo = () => {
    return new Promise((resolve, reject) => {
        rl.question('Remote Repository URL: ', (answer) => {
            resolve(answer)
        })
    })
}

async function renameApp() {
    process.stdout.write(`${colors.fg.Magenta}`)
    const name = await questionName()
    if(name === '') {
        process.stderr.write(`${colors.fg.Red}\nno valid Name!\n`)
    } else {
        execSync(`react-native-rename "${name}"`, {stdio: 'inherit'})
        process.stdout.write(`${colors.fg.Green}\nRenaming complete!\n`)
    }
}

async function setUpGit() {
    fs.readFile('.git/config', 'utf8', (err, data) => {
        const shell = require('shelljs')
        if (!err) {
            process.stdout.write(`${colors.fg.Cyan}\nClearing old git connection...\n`)
            shell.rm('-rf', '.git/')
            process.stdout.write(`${colors.fg.Green}\nSuccess!\n`)
        }
        addGitRepo()
    })
}

async function addGitRepo() {
    process.stdout.write(`${colors.fg.Magenta}`)
    const val = await questionRemoteRepo()
    if (val === 'y' || val === 'Y' || val === 'yes' || val === 'Yes' || val === '') {
        process.stdout.write(`${colors.fg.Cyan}Connect remote repository...`)
        process.stdout.write(`${colors.fg.Magenta}`)
        const repoUrl = await questionUrlRepo()
        if(repoUrl === '') {
            process.stderr.write(`${colors.fg.Red}\nno valid Url!\n`)
            process.exit(1)
        } else {
            await clearStructure()
            execSync(`git init && git add . && git commit -m "Initial commit" && git remote add origin ${repoUrl}`, {stdio: 'inherit'})
            process.stdout.write(`${colors.fg.Green}\nRepository connected!`)
            process.stdout.write(`${colors.fg.Green}\nYour done!\n`)
            process.exit(0)
        }
    } else {
        process.stdout.write(`${colors.fg.Green}\nReady to go!\n`)
        process.exit(0)
    }
}

async function clearStructure() {
    const shell = require('shelljs')
    shell.rm('-rf', 'scripts/')
    shell.rm('-rf', 'README.md')
    execSync("Happy programming!!! > README.md")
}
