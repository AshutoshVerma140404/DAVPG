import React from 'react';
import './Syllabus.css';

const Syllabus = () => {
  return (
    <div className="syllabus-container">
      <div className="head_title">SYLLABUS</div>
      <div className="page_content">
        <ul>
          <li>
            <a href="/assets/docs/BA_Syllabus.pdf" target="_blank" rel="noopener noreferrer">
              BA Syllabus All Subjects
            </a>
          </li>
          <li>
            <a href="/assets/docs/Bsc_Math_Syllabus.pdf" target="_blank" rel="noopener noreferrer">
              B.Sc. (Maths) Syllabus
            </a>
          </li>
          <li>
            <a href="/assets/docs/Bsc_Bio_Syllabus.pdf" target="_blank" rel="noopener noreferrer">
              B.Sc. (Bio) Syllabus
            </a>
          </li>
          <li>
            <a href="/assets/docs/MA_Political_Science.pdf" target="_blank" rel="noopener noreferrer">
              MA Political Science Syllabus
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Syllabus;
