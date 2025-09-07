import fs from "fs";
import path from "path";
import { execSync } from "child_process";

function syncCase(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      syncCase(fullPath); // רקורסיה על תיקיות
    } else {
      const correctCase = file; // השם כפי שהוא צריך להיות
      const actualCase = fs.readdirSync(path.dirname(fullPath)).find(f => f.toLowerCase() === file.toLowerCase());

      if (actualCase && actualCase !== correctCase) {
        const tempName = path.join(path.dirname(fullPath), `tmp_${Date.now()}_${file}`);
        const targetName = path.join(path.dirname(fullPath), correctCase);

        try {
          execSync(`git mv -f "${fullPath}" "${tempName}"`);
          execSync(`git mv -f "${tempName}" "${targetName}"`);
          console.log(`Synced: ${file}`);
        } catch (err) {
          console.error(`Error syncing ${file}:`, err.message);
        }
      }
    }
  });
}

// התחלת סינכרון מהתיקיה הראשית של src
syncCase(path.join(process.cwd(), "src"));
console.log("Git case sync finished!");

