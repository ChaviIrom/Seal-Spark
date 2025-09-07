import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const projectDir = './src'; // תיקיית הפרויקט שלך

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk(projectDir);

files.forEach((file) => {
  const gitFile = file.replace(/\\/g, '/'); // Windows support
  try {
    execSync(`git mv -f ${gitFile} ${gitFile}`);
    console.log(`Synced: ${gitFile}`);
  } catch (err) {
    console.error(`Error syncing ${gitFile}: ${err.message}`);
  }
});

console.log('Git case sync finished!');
