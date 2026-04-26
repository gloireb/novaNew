const fs = require('fs');
const path = require('path');

const replacements = [
  // Backgrounds (longest to shortest)
  [/bg-surface-container-highest/g, 'bg-gray-100'],
  [/bg-surface-container-high/g, 'bg-gray-100'],
  [/bg-surface-container-lowest/g, 'bg-white'],
  [/bg-surface-container-low/g, 'bg-gray-50'],
  [/bg-surface-container/g, 'bg-gray-50'],
  [/bg-surface-lowest/g, 'bg-white'],
  [/bg-surface/g, 'bg-white'],
  
  [/bg-on-surface\/5/g, 'bg-gray-100'],
  [/bg-on-surface/g, 'bg-gray-900'],

  // Text colors
  [/text-on-surface\/80/g, 'text-gray-600'],
  [/text-on-surface\/70/g, 'text-gray-600'],
  [/text-on-surface\/60/g, 'text-gray-600'],
  [/text-on-surface\/50/g, 'text-gray-500'],
  [/text-on-surface\/40/g, 'text-gray-500'],
  [/text-on-surface\/30/g, 'text-gray-400'],
  [/text-on-surface\/20/g, 'text-gray-400'],
  [/text-on-surface\/10/g, 'text-gray-300'],
  [/text-on-surface/g, 'text-gray-900'],
  [/text-surface/g, 'text-white'],

  // Borders
  [/border-on-surface\/\[0\.03\]/g, 'border-gray-200'],
  [/border-on-surface\/5/g, 'border-gray-200'],
  [/border-on-surface\/10/g, 'border-gray-200'],
  [/border-on-surface\/20/g, 'border-gray-300'],
  [/border-on-surface/g, 'border-gray-200'],

  // Primary Color
  [/text-primary\/(10|20|30|40|50|60|70|80|90|100)/g, 'text-blue-600/$1'],
  [/bg-primary\/(10|20|30|40|50|60|70|80|90|100)/g, 'bg-blue-600/$1'],
  [/border-primary\/(10|20|30|40|50|60|70|80|90|100)/g, 'border-blue-600/$1'],
  [/shadow-primary\/(10|20|30|40|50|60|70|80|90|100)/g, 'shadow-blue-600/$1'],
  
  [/text-primary/g, 'text-blue-600'],
  [/bg-primary/g, 'bg-blue-600'],
  [/border-primary/g, 'border-blue-600'],
  [/shadow-primary/g, 'shadow-blue-600'],
  [/from-primary/g, 'from-blue-600'],
  [/to-primary/g, 'to-blue-600'],
  [/ring-primary/g, 'ring-blue-600'],

  // Secondary Color
  [/text-secondary\/(10|20|30|40|50|60|70|80|90|100)/g, 'text-blue-500/$1'],
  [/bg-secondary\/(10|20|30|40|50|60|70|80|90|100)/g, 'bg-blue-500/$1'],
  [/from-secondary/g, 'from-blue-400'],
  [/to-secondary/g, 'to-blue-400'],
  [/text-secondary/g, 'text-blue-500'],
  [/bg-secondary/g, 'bg-blue-500'],
];

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      for (const [pattern, replacement] of replacements) {
        if (pattern.test(content)) {
          content = content.replace(pattern, replacement);
          modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, 'src'));
console.log('Replacement complete.');
