// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/file-structure', (req, res) => {
    const directoryPath = path.join(__dirname, 'public');
    const fileStructure = getFileStructure(directoryPath);
    res.json(fileStructure);
});

function getFileStructure(dir, relativePath = '') {
    const files = fs.readdirSync(dir);
    return files.map(file => {
        const filePath = path.join(dir, file);
        const fileRelativePath = path.join(relativePath, file);
        if (fs.statSync(filePath).isDirectory()) {
            return {
                name: file,
                type: 'directory',
                children: getFileStructure(filePath, fileRelativePath)
            };
        } else {
            return {
                name: file,
                type: 'file',
                path: fileRelativePath
            };
        }
    });
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});