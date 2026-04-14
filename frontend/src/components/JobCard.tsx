const JobCard = ({ job }: any) => {
  return (
    <div className="glass" style={{ marginTop: "16px" }}>
      <h3>{job.role}</h3>
      <p>{job.aboutRole}</p>

      <p style={{ marginTop: "8px" }}>Score: {job.matchingScore}%</p>

      {/* ✅ FIXED SKILLS SECTION */}
      <div
        style={{
          marginTop: "12px",
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
    </div>
  );
};

export default JobCard;