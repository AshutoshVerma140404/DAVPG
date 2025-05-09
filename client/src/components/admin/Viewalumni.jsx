// src/components/ViewAlumni.jsx
import React, { useEffect, useState } from "react";
import "./styles/ViewAlumni.css";

const BASE_URL = encodeURI("http://localhost:8000");

const ViewAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const res = await fetch(`${BASE_URL}/viewalumni`, {
          method: "GET",
          credentials: "include"
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        setAlumni(data.send || []);
      } catch (err) {
        console.error("Error fetching alumni:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, []);

  if (loading) return <p className="loading">Loading alumni...</p>;

  return (
    <div className="view-alumni-container">
      <h2 className="page-title">Alumni List</h2>
      <div className="content-row">
      

        <div className="main-content">
          {alumni.length > 0 ? (
            <table className="alumni-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Working Place</th>
                  <th>Mobile Number</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {alumni.map(row => (
                  <tr key={row.Id}>
                    <td>
                      <img
                        src={`${BASE_URL}/docs/${row.Photo}`}
                        alt={row.Name}
                        className="alumni-photo"
                      />
                    </td>
                    <td>{row.Name}</td>
                    <td>{row.Designation}</td>
                    <td>{row.WorkingAddress}</td>
                    <td>{row.Mobile}</td>
                    <td>{row.Email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-records">No Record Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAlumni;