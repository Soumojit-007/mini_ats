import { useState, useRef } from "react";
import Upload from "../components/Upload";
import UserInfo from "../components/UserInfo";
import TopMatch from "../components/TopMatch";
import JobCard from "../components/JobCard";
import { uploadResume } from "../services/api";

const Home = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);
      const res = await uploadResume(file);
      setData(res);

      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);

    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Landing */}
      <h1>AI Resume Matcher</h1>
      <p>Match your resume with the best job opportunities</p>

      <Upload onUpload={handleUpload} loading={loading} />

      {/* Results */}
      {data && (
        <div ref={resultRef}>
          <UserInfo data={data} />
          <TopMatch job={data.topMatch} />

          <h2>Other Matches</h2>
          {data.matchingJobs.slice(0, 5).map((job: any, i: number) => (
            <JobCard key={i} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;