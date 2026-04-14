import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { parsePDF } from "../parsers/pdfParser.js";
import { parseResume } from "../services/resumeParser.js";
import { parseJD } from "../services/jdParser.js";
import { matchSkills } from "../services/matcher.js";
import { calculateScore } from "../services/scoreCalculator.js";
import Match from "../models/Match.js";
// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read JSON file manually
const jdPath = path.join(__dirname, "../../data/sampleJDs.json");
const sampleJDs = JSON.parse(fs.readFileSync(jdPath, "utf-8"));

export const matchResume = async (req, res) => {
  try {
    // ✅ File validation
    if (!req.file) {
      return res.status(400).json({ error: "No resume uploaded" });
    }

    // 1. Parse PDF
    const text = await parsePDF(req.file.path);

    // 2. Parse Resume
    const resumeData = parseResume(text);

    let extractedSalary = "";

    // 3. Process all JDs
    let matchingJobs = sampleJDs.map((jd, index) => {
      const jdData = parseJD(jd, index);

      if (!extractedSalary && jdData.salary) {
        extractedSalary = jdData.salary;
      }

      const skillsAnalysis = matchSkills(resumeData.skills, jdData.skills);

      const matchingScore = calculateScore(skillsAnalysis);

      return {
        jobId: jdData.jobId,
        role: jdData.role,
        // aboutRole: jdData.aboutRole,
        aboutRole:jdData.aboutRole.replace(/Salary:.*$/i, "").trim(),
        skillsAnalysis,
        matchingScore,
      };
    });

    // ✅ Sort by best match
    matchingJobs.sort((a, b) => b.matchingScore - a.matchingScore);

    // ✅ Take top 5
    const topJobs = matchingJobs.slice(0, 5);
    try{
      await Match.create({
      name: resumeData.name,
      experience: resumeData.experience,
      skills: resumeData.skills,
      matchingJobs: topJobs,
      topMatch: topJobs[0] || null,
    });
    }catch(dbError){
      console.error("DB save failed: ", dbError.message);
    }
    // 4. Final response
    return res.json({
      name: resumeData.name,
      salary: extractedSalary,
      yearOfExperience: resumeData.experience,
      resumeSkills: resumeData.skills,
      matchingJobs: topJobs,
      topMatch: topJobs[0] || null, // ⭐ bonus
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
