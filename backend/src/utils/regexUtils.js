export const extractSalary = (text) => {
  const match = text.match(/(\$?\d+[,\d]*\s*(LPA|per annum|USD|INR)?)/i);
  return match ? match[0] : "";
};

export const extractExperience = (text) => {
  const match = text.match(/(\d+(\.\d+)?)\s*(years|yrs)/i);
  return match ? parseFloat(match[1]) : 0;
};