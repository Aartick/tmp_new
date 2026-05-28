import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(process.cwd(), 'app'), function(filePath) {
  if (filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf-8');
    content = content.replace(/import\s+\{\s*,\s*/g, 'import { ');
    content = content.replace(/useAudit\(\);\s*\{/g, 'useAudit();');
    fs.writeFileSync(filePath, content);
  }
});

let nextConfig = fs.readFileSync('next.config.mjs', 'utf-8');
nextConfig = nextConfig.replace(/swcMinify:\s*true,?\n?/g, '');
fs.writeFileSync('next.config.mjs', nextConfig);

console.log("Fix applied.");
