import fs from 'fs';
import path from 'path';

const files = [
  'src/components/Navbar.jsx',
  'src/components/StickyCTABar.jsx'
];

files.forEach(f => {
  const filePath = path.join(process.cwd(), f);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Replace whole word `loc` with `pathname` except in object keys
    content = content.replace(/\bloc\b/g, 'pathname');
    fs.writeFileSync(filePath, content);
  }
});

console.log("loc replaced with pathname");
