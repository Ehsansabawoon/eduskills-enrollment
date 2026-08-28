import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [records, setRecords] = useState([]);
  const [district, setDistrict] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      setError("");

      let url = "http://localhost:3000/api/enrollment";

      if (district) {
        url += `?district=${encodeURIComponent(district)}`;
      }

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Unable to load enrollment records.");
        }

        const data = await response.json();
        setRecords(data);
      } catch (error) {
        console.error("Error fetching enrollment data:", error);
        setRecords([]);
        setError("Unable to load enrollment records. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [district]);

  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <div>
            <p className="eyebrow">EduSkills</p>
            <h1>Student Enrollment Records</h1>
            <p className="subtitle">
              View and filter student enrollment information by district.
            </p>
          </div>
        </header>

        <div className="controls">
          <div className="filter-group">
            <label htmlFor="district">Filter by District</label>

            <select
              id="district"
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
            >
              <option value="">All Districts</option>
              <option value="Norman Public Schools">
                Norman Public Schools
              </option>
              <option value="Oklahoma City Public Schools">
                Oklahoma City Public Schools
              </option>
              <option value="Edmond Public Schools">
                Edmond Public Schools
              </option>
              <option value="Moore Public Schools">
                Moore Public Schools
              </option>
            </select>
          </div>

          {!loading && !error && (
            <div className="record-count">
              {records.length} {records.length === 1 ? "record" : "records"}
            </div>
          )}
        </div>

        {loading && (
          <div className="status-message">
            <div className="spinner"></div>
            <p>Loading enrollment records...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <strong>Unable to load data</strong>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Grade</th>
                  <th>Enroll Date</th>
                  <th>EL Level</th>
                  <th>District</th>
                </tr>
              </thead>

              <tbody>
                {records.map((record) => (
                  <tr key={record.studentId}>
                    <td className="student-id">{record.studentId}</td>
                    <td>{record.firstName}</td>
                    <td>{record.lastName}</td>
                    <td>{record.gradeLevel}</td>

                    <td>
                      {record.enrollDate || (
                        <span className="missing">N/A</span>
                      )}
                    </td>

                    <td>
                      {record.elLevel || (
                        <span className="missing">N/A</span>
                      )}
                    </td>

                    <td>{record.district.trim()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;