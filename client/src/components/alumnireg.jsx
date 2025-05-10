import React, { useState } from 'react';
import './AlumniReg.css';

const AlumniReg = () => {
  const [formData, setFormData] = useState({
    name: '',
    father: '',
    mother: '',
    email: '',
    MoNo: '',
    dob: '',
    Address: '',
    photo: null,
    gender: 'Male',
    degree: 'B.A.',
    year: '',
    designation: '',
    workingplace: '',
    specialization: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }
    // Use fetch/axios to POST data to /reg_sub
    alert('Data Submitted Successfully');
  };

  return (
    <div className="alumni-container">
      <div className="head_title">ALUMNI CELL</div>
      <div className="page_content">
        <div>
          <p>
           We invite and solicit the presence of all former students of our college who had got admission in the college and completed at least one year/semester in a degree program (UG/PG). Our college takes great pride in the achievements and accomplishments of our alumni. We wish to bring valuable pieces of advice, experiences and any other contribution from our alumni that are needed to help improve and serve our college and the society at large. Therefore, college has constituted an alumni cell to provide a platform for our alumni to increase their involvement with their alma mater and foster interaction between them. It is an effort to stay connected with one another and the college, and to share knowledge and skills. Through this forum we wish to remain updated with the latest achievements of our alumni and not be deprived of the joy of accomplishment. We are one big family and share and rejoice in the success of one another. This alumni cell will help in renewing the bonds and associations of old which are a treasure in these days of weakening family and social bonds. For us alumni are not our past or former students - they are our future who may make strong contributions to the welfare of their alma mater.
          </p>
        </div>

        <div>
          <h4>Alumni Registration Form</h4>
          <div className="container4">
            <div className="content">
              <form onSubmit={handleSubmit}>
                <div className="user-details">
                  <div className="input-box">
                    <span className="details">Name</span>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                  </div>
                  <div className="input-box">
                    <span className="details">Father Name</span>
                    <input type="text" name="father" value={formData.father} onChange={handleChange} placeholder="Enter your Father Name" required />
                  </div>
                  <div className="input-box">
                    <span className="details">Mother Name</span>
                    <input type="text" name="mother" value={formData.mother} onChange={handleChange} placeholder="Enter your Mother Name" required />
                  </div>
                  <div className="input-box">
                    <span className="details">Email</span>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your Email" required />
                  </div>
                  <div className="input-box">
                    <span className="details">Mobile No (WhatsApp No.)</span>
                    <input type="text" name="MoNo" value={formData.MoNo} onChange={handleChange} placeholder="Enter your Mobile Number" required />
                  </div>
                  <div className="input-box">
                    <span className="details">Date of Birth</span>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                  </div>
                  <div className="input-box">
                    <span className="details">Address</span>
                    <input type="text" name="Address" value={formData.Address} onChange={handleChange} placeholder="Address" required />
                  </div>
                  <div className="input-box">
                    <span className="details">Profile Picture</span>
                    <input type="file" name="photo" onChange={handleChange} required />
                  </div>
                </div>

                <div className="input-box">
                  <span className="details">Gender</span>
                  <select name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="input-box">
                  <span className="details"><b>Highest Degree Obtained from D.A.V. P.G. College Gorakhpur:</b></span>
                  <div className="user-details">
                    <div className="input-box">
                      <span className="details">Name of Degree</span>
                      <select name="degree" value={formData.degree} onChange={handleChange}>
                        <option value="B.A.">B.A.</option>
                        <option value="B.Sc.">B.Sc.</option>
                        <option value="B.Com.">B.Com.</option>
                        <option value="M.A.(History)">M.A.(History)</option>
                        <option value="M.A.(Political Science)">M.A.(Political Science)</option>
                      </select>
                    </div>
                    <div className="input-box">
                      <span className="details">Year of Obtaining Degree</span>
                      <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="Year" required />
                    </div>
                    <div className="input-box">
                      <span className="details">Present Status/Designation</span>
                      <input type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="Present Status/Designation" required />
                    </div>
                    <div className="input-box">
                      <span className="details">Address of Working Place</span>
                      <input type="text" name="workingplace" value={formData.workingplace} onChange={handleChange} placeholder="Address of Working Place" required />
                    </div>
                    <div className="input-box">
                      <span className="details">Any specialization</span>
                      <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Any specialization" />
                    </div>
                  </div>
                </div>

                <div className="button">
                  <input type="submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniReg;
