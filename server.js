const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Default port (can be overridden with environment variable)
const PORT = process.env.PORT || 3000;

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.csv': 'text/csv'
};

// Create HTTP server
const server = http.createServer((req, res) => {
  // Parse URL
  const parsedUrl = url.parse(req.url);
  
  // Get path from URL (remove query string if present)
  let pathname = parsedUrl.pathname;
  
  // Normalize path (convert to absolute path and resolve . and ..)
  let filePath = path.normalize(path.join(process.cwd(), pathname));
  
  // Default to index.html if the path is a directory
  if (pathname === '/' || pathname === '') {
    filePath = path.join(process.cwd(), 'index.html');
  }

  // Get file extension
  const extname = path.extname(filePath).toLowerCase();
  
  // Get content type based on file extension
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File not found
        console.error(`File not found: ${filePath}`);
        res.writeHead(404);
        res.end('404 File Not Found');
      } else {
        // Server error
        console.error(`Server error: ${err.code}`);
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success - send file content
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Press Ctrl+C to stop the server`);
});
