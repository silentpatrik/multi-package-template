const { execSync, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function checkGhInstalled() {
  try {
    execSync('gh --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function createRepoUsingGh(repoName) {
  execSync(`gh repo create ${repoName} --public --confirm`);
}

function createRepoUsingApi(repoName, token) {
  const https = require('https');
  const data = JSON.stringify({
    name: repoName,
    private: false
  });

  const options = {
    hostname: 'api.github.com',
    path: '/user/repos',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': 'Node.js',
      'Content-Type': 'application/json',
      'Content-Length': data.length
    }
  };

  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
}

function promptForToken() {
  rl.question('Enter your GitHub token: ', (token) => {
    rl.close();
    return token;
  });
}

async function createRepository(repoName) {
  if (checkGhInstalled()) {
    createRepoUsingGh(repoName);
  } else {
    console.log('GitHub CLI not installed, using GitHub API instead.');
    const token = await promptForToken();
    createRepoUsingApi(repoName, token);
  }
}

createRepository('new-repo-name');
function cloneAndSetup(repoName) {
  const cloneDir = path.join(__dirname, 'cloned_repos', repoName);
  fs.mkdirSync(cloneDir, { recursive: true });
  execSync(`git clone https://github.com/username/${repoName}.git ${cloneDir}`);

  // Assuming the path to the existing project and the rename script
  const existingProjectPath = '/path/to/your/project';
  const renameScriptPath = '/path/to/your/rename.js';

  fs.copySync(existingProjectPath, cloneDir);
  process.chdir(cloneDir);
  execSync(`node ${renameScriptPath} NewProjectName`);
  execSync('git add .');
  execSync('git commit -m "Renamed and set up project"');
  execSync('git push');
}

cloneAndSetup('new-repo-name');
