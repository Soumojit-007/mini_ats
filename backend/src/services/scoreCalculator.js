export const calculateScore = (skillsAnalysis) => {
  if (skillsAnalysis.length === 0) return 0;

  const matched = skillsAnalysis.filter(
    (s) => s.presentInResume
  ).length;

  const total = skillsAnalysis.length;

  let score = (matched / total) * 100;

  // ✅ Penalize small JDs (very important)
  if (total <= 4) {
    score *= 0.75;
  }

  // ✅ Cap max score (avoid unrealistic 100s)
  if (score > 90) {
    score = 90;
  }

  return Math.round(score);
};