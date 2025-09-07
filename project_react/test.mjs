import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// מקבל את כל הקבצים והתיקיות ש־Git עוקב אחריהם
function getGitTrackedNames(dir) {
  const output = execSync(`git ls-files`, { cwd: dir }).toString();
  return output.split('\n').filter(Boolean);
}

// סינכרון שמות הקבצים לפי Git
function syncCase(dir, gitNames) {
  const items = fs.readdirSync(dir);

  for (let item of items) {
    const fullPath = path.join(dir, item);

    // דילוג על node_modules
    if (item === 'node_modules') continue;

    const stats = fs.statSync(fullPath);

    console.log("Processing:", fullPath);

    const gitMatch = gitNames.find(
      g => g.toLowerCase() === path.relative('.', fullPath).replace(/\\/g, '/').toLowerCase()
    );

    if (gitMatch && gitMatch !== path.relative('.', fullPath).replace(/\\/g, '/')) {
      const tempName = fullPath + '.tmp_sync';
      fs.renameSync(fullPath, tempName);
      fs.renameSync(tempName, path.join(dir, path.basename(gitMatch)));
      console.log(`Renamed: ${fullPath} → ${gitMatch}`);
    }

    if (stats.isDirectory()) {
      syncCase(fullPath, gitNames);
    }
  }
}


// קבלת שמות הקבצים והתיקיות מ־Git
const gitNames = getGitTrackedNames('.');

// התחלת הסנכרון מהתיקיה הנוכחית
syncCase('.', gitNames);

console.log("Sync completed!");




