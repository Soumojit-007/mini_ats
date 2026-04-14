import { extractSkills } from "./skillExtractor.js";

export const parseResume = (text) => {
  const cleanText = text
    .replace(/\r\n/g, "\n")
    .replace(/[^\x00-\x7F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
    // console.log("CLEAR TEXT" , cleanText)
  // ✅ NAME FIX
  const nameMatch = cleanText.match(/^([A-Za-z]+\s[A-Za-z]+)/);
  const name = nameMatch ? nameMatch[1] : "";

  let experience = 0;

  const expMatch = cleanText.match(/(\d+(\.\d+)?)\s*(years|yrs)/i);
  if (expMatch) {
    experience = parseFloat(expMatch[1]);
  } else {
    const yearMatches = cleanText.match(/\b(20\d{2})\b/g);

    if (yearMatches && yearMatches.length >= 2) {
      const years = yearMatches.map(Number);
      const diff = Math.max(...years) - Math.min(...years);

      if (diff <= 1) experience = diff;
      else experience = 2;
    }
  }

  const skills = extractSkills(cleanText);

  return {
    name,
    experience,
    skills,
  };
};