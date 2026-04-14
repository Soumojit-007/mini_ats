import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const skillsPath = path.join(__dirname, "../../data/skills.json");
const skillsList = JSON.parse(fs.readFileSync(skillsPath, "utf-8"));

export const extractSkills = (text) => {
  const normalizedText = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")   // remove ALL symbols
    .replace(/\s+/g, " ");      // normalize spaces

  return skillsList.filter((skill) => {
    const skillNorm = skill.toLowerCase().replace(/[^\w\s]/g, "");
    return normalizedText.includes(skillNorm);
  });
};