const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4001;
const HTML_FILE = 'q3.html';

http.createServer((req, res) => {
    const filePath = path.join(__dirname, HTML_FILE);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading ' + HTML_FILE);
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
