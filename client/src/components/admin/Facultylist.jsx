import React, { useEffect, useState } from "react";
import { X, Search } from "lucide-react";
import "./styles/FacultyCardList.css";

const BASE_URL = encodeURI("http://localhost:8000");

const FacultyCardList = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/facultylist`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);

      const data = await response.json();
      const facultyList = data.send || [];
      setFaculty(facultyList);

      const uniqueDepartments = [
        ...new Set(facultyList.map(item => item.Department).filter(Boolean))
      ].sort();
      setDepartments(uniqueDepartments);
    } catch (error) {
      console.error("Error fetching faculty data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (faculty) => {
    setSelectedFaculty(faculty);
  };

  const closeDetails = () => {
    setSelectedFaculty(null);
  };

  const filteredFaculty = faculty.filter(item => {
    const matchesSearch = item.Name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || item.Department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading faculty data...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-800">Faculty Directory</h2>

      <div className="search-filter-container mb-6 flex flex-col sm:flex-row gap-4">
        <div className="search-box relative flex-grow">
          <Search className="search-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input pl-10 pr-4 py-2 w-full"
          />
        </div>

        <div className="department-filter sm:w-64">
          <select
            value={selectedDepartment}
            onChange={e => setSelectedDepartment(e.target.value)}
            className="department-select w-full p-2"
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredFaculty.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-lg text-gray-600">
            No faculty records found. {searchTerm || selectedDepartment ? "Try changing your search criteria." : ""}
          </p>
        </div>
      ) : (
        <div className={`faculty-container ${selectedFaculty ? "detail-view" : ""}`}>
          <div className={`faculty-cards-grid ${selectedFaculty ? "shifted" : ""}`}>
            {filteredFaculty.map(item => (
                              <div 
                key={item.Id || item.email} 
                className={`
                  faculty-card
                  ${selectedFaculty && (selectedFaculty.Id === item.Id || selectedFaculty.email === item.email) ? "selected" : ""}
                `}
                onClick={() => handleCardClick(item)}
              >
                <div className="p-4 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-2 border-indigo-100">
                    <img
                      src={item.Photo || `${BASE_URL}/faculty_photos/${item.photo}`}
                      alt={item.Name || item.name}
                      className="w-full h-full object-cover"
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = `https://picsum.photos/seed/${encodeURIComponent(item.Id || item.email)}/200/200`;
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-800">{item.Name || item.name}</h3>
                  <p className="text-sm text-gray-600 text-center">{item.Department || item.department}</p>
                </div>
              </div>
            ))}
          </div>
          
          {selectedFaculty && (
            <div className="faculty-detail-panel">
              <button 
                onClick={closeDetails} 
                className="close-button"
              >
                <X size={24} className="text-gray-600" />
              </button>
              
              <div className="faculty-profile-header">
                <div className="faculty-profile-image">
                  <img
                    src={selectedFaculty.Photo || selectedFaculty.photo}
                    alt={selectedFaculty.Name || selectedFaculty.name}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = `https://picsum.photos/seed/${encodeURIComponent(selectedFaculty.Id || selectedFaculty.email)}/200/200`;
                    }}
                  />
                </div>
                
                <div className="faculty-profile-info">
                  <h2>{selectedFaculty.Name || selectedFaculty.name}</h2>
                  <p className="designation">{selectedFaculty.Designation || selectedFaculty.designation}</p>
                  <p className="department">{selectedFaculty.Department || selectedFaculty.department}</p>
                </div>
              </div>

              <div className="faculty-details-content">
                <div className="faculty-details-grid">
                  <div className="faculty-detail-item">
                    <h3>Qualification</h3>
                    <p>{selectedFaculty.Qualification || selectedFaculty.highest_qualification}</p>
                  </div>
                  
                  <div className="faculty-detail-item">
                    <h3>Experience</h3>
                    <p>{selectedFaculty.Experience || selectedFaculty.teaching_experience}</p>
                  </div>
                  
                  <div className="faculty-detail-item">
                    <h3>Email</h3>
                    <p className="break-words">{selectedFaculty.Email || selectedFaculty.email}</p>
                  </div>
                  
                  <div className="faculty-detail-item">
                    <h3>Phone</h3>
                    <p>{selectedFaculty.Mobile || selectedFaculty.phone}</p>
                  </div>
                </div>

                {(selectedFaculty.area_of_interest || selectedFaculty.Area_of_Interest) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Areas of Interest</h3>
                    <p>{selectedFaculty.area_of_interest || selectedFaculty.Area_of_Interest}</p>
                  </div>
                )}

                {(selectedFaculty.publications_books_patents || selectedFaculty.Publications) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Publications/Books/Patents</h3>
                    <p>{selectedFaculty.publications_books_patents || selectedFaculty.Publications}</p>
                  </div>
                )}

                {(selectedFaculty.seminar_conference_workshop_organized || selectedFaculty.Seminars_Organized) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Seminars/Conferences Organized</h3>
                    <p>{selectedFaculty.seminar_conference_workshop_organized || selectedFaculty.Seminars_Organized}</p>
                  </div>
                )}

                {(selectedFaculty.seminar_conference_workshop_attended || selectedFaculty.Seminars_Attended) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Seminars/Conferences Attended</h3>
                    <p>{selectedFaculty.seminar_conference_workshop_attended || selectedFaculty.Seminars_Attended}</p>
                  </div>
                )}

                {(selectedFaculty.fellowship_awards || selectedFaculty.Awards) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Fellowships/Awards</h3>
                    <p>{selectedFaculty.fellowship_awards || selectedFaculty.Awards}</p>
                  </div>
                )}

                {(selectedFaculty.masters_supervised || selectedFaculty.Masters_Supervised) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Masters Students Supervised</h3>
                    <p>{selectedFaculty.masters_supervised || selectedFaculty.Masters_Supervised}</p>
                  </div>
                )}

                {(selectedFaculty.phd_supervised || selectedFaculty.PhD_Supervised) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">PhD Students Supervised</h3>
                    <p>{selectedFaculty.phd_supervised || selectedFaculty.PhD_Supervised}</p>
                  </div>
                )}

                {(selectedFaculty.other_info || selectedFaculty.Other_Info) && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500">Additional Information</h3>
                    <p className="text-sm">{selectedFaculty.other_info || selectedFaculty.Other_Info}</p>
                  </div>
                )}

                {(selectedFaculty.resume || selectedFaculty.Resume) && (
                  <div className="mt-4">
                    <a 
                      href={selectedFaculty.resume || selectedFaculty.Resume} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    >
                      View Resume
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FacultyCardList;