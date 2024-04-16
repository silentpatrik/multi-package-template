const fs = require('fs');
const path = require('path');

/**
* This script will extract and display the `# About` section from the `README.md`:
*/
function displayHelp(options={startAnchor:"# Installation",endAnchor:"#",fromMarkdownFile:"README.md"}) {
  const readmePath = path.join(__dirname, options.fromMarkdownFile);
  if (fs.existsSync(readmePath)) {
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    const aboutIndex = readmeContent.indexOf(options.startAnchor);
    const aboutIndexEnd = readmeContent.indexOf(options.endAnchor);
    if (aboutIndex !== -1) {
      console.log(readmeContent.substring(aboutIndex,aboutIndexEnd-aboutIndex));
    } else {
      console.log('No about section found in README.md.');
    }
  } else {
    console.error(`${options.fromMarkdownFile} file not found.`);
  }
}

displayHelp({fromMarkdownFile:"INSTALL.md",startAnchor:"# How to",endAnchor:"Copyright"});
