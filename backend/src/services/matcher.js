export const matchSkills = (resumeSkills, jdSkills) => {
  const resumeSet = new Set(
    resumeSkills.map((s) => s.toLowerCase())
  );

  return jdSkills.map((skill) => ({
    skill,
    presentInResume: resumeSet.has(skill.toLowerCase()),
  }));
};