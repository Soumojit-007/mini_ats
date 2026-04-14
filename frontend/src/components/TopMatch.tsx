import { motion } from "framer-motion";

const getColor = (score: number) => {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#facc15";
  return "#ef4444";
};

const TopMatch = ({ job }: any) => {
  return (
    <motion.div
      className="glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ marginTop: "20px" }}
    >
      <h2>🔥 Top Match</h2>
      <h3>{job.role}</h3>

      <h1 style={{ color: getColor(job.matchingScore) }}>
        {job.matchingScore}%
      </h1>

      <p>{job.aboutRole}</p>

      {/* Progress Bar */}
      <div className="progress" style={{ marginTop: "10px" }}>
        <div
          className="progress-bar"
          style={{
            width: `${job.matchingScore}%`,
            background: getColor(job.matchingScore),
          }}
        />
      </div>

      {/* ✅ FIXED SKILLS SECTION */}
      <div
        style={{
          marginTop: "14px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        {job.skillsAnalysis.map((s: any, i: number) => (
          <span
            key={i}
            className="badge"
            style={{
              background: s.presentInResume ? "#064e3b" : "#3f1d1d",
              color: s.presentInResume ? "#22c55e" : "#ef4444",
            }}
          >
            {s.skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default TopMatch;