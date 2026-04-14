import { extractSkills } from "./skillExtractor.js";

export const parseJD = (jdText, index) => {
  // Salary
  const salaryMatch = jdText.match(/(\$?\d+[,\d]*\s*(LPA|per annum|USD|INR)?)/i);
  const salary = salaryMatch ? salaryMatch[0] : "";

  // Experience
  const expMatch = jdText.match(/(\d+)\+?\s*(years|yrs)/i);
  const experience = expMatch ? parseInt(expMatch[1]) : 0;

  // Clean lines
  const lines = jdText
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const role = lines[0] || "";
  const aboutRole = lines.slice(1).join(" ") || "";

  // Normalize + extract skills
  const normalizedJD = jdText.replace(/\s+/g, " ");
  const skills = extractSkills(normalizedJD);

  return {
    jobId: "JD" + String(index + 1).padStart(3, "0"),
    role,
    aboutRole,
    salary,
    experience,
    skills,
  };
};