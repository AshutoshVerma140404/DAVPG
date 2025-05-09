import React, { useState, useEffect } from 'react';
import './styles/HeroSection.css';

// Import all images
import bg1 from '../images/bg1.webp';
import bg2 from '../images/bg2.webp';
import bg3 from '../images/bg3.webp';
import bg4 from '../images/bg4.webp';
import bg5 from '../images/bg5.webp';
import bg6 from '../images/bg6.webp';
import bg7 from '../images/bg7.webp';
import p2 from '../images/p2.webp';
import p4 from '../images/p4.webp';
import backImg from '../images/back.webp';
import newIcon from '../images/new.webp';
import regIcon from '../images/reg.webp';
import calIcon from '../images/cal.webp';
import feedIcon from '../images/feed.webp';
import grievIcon from '../images/griev.webp';
import creativeIcon from '../images/creative.webp';
import syllIcon from '../images/syll.webp';
import timetableIcon from '../images/timetable.webp';
import codeIcon from '../images/code.webp';
import pptIcon from '../images/ppt.webp';
import broucherIcon from '../images/broucher.webp';
import admissionIcon from '../images/admission.webp';
import baCourseImg from '../images/ba-course.webp';
import baImg from '../images/ba.webp';
import bscImg from '../images/bsc.webp';
import bcomImg from '../images/bcom.webp';
import bcaImg from '../images/bca.webp';
import mscImg from '../images/msc.webp';
import popupImg from '../images/popup.webp';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // News and events data simulation
  const newsAndEvents = {
    news: [
      { Type: "News", Title: "Admission Open for 2025-26 Academic Session", Link: "admission-notice.pdf" },
      { Type: "News", Title: "Scholarship Applications Now Being Accepted", Link: "scholarship.pdf" },
      { Type: "News", Title: "Annual Sports Day Scheduled for Next Month", Link: "sports-day.pdf" }
    ],
    events: [
      { Type: "Events", Title: "National Seminar on Modern Education", Link: "seminar.pdf" },
      { Type: "Events", Title: "Cultural Fest Celebrating College Anniversary", Link: "cultural-fest.pdf" },
      { Type: "Events", Title: "Workshop on Research Methodologies", Link: "workshop.pdf" }
    ]
  };

  useEffect(() => {
    // Show modal on page load
    setShowModal(true);
    
    // Set up carousel interval
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 7);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const switchService = (index) => {
    setActiveTab(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % 7);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + 7) % 7);
  };

  return (
    <div className="college-website">
      {/* Header would be imported here */}
      
      {/* Carousel */}
      <div className="carousal">
        <div className="carousel-wrapper">
          <div className="carouselBox">
            <img
              className={`carousel__photo ${currentSlide === 0 ? 'initial' : ''}`}
              src={bg1}
              alt="College"
            />
            <img
              className={`carousel__photo ${currentSlide === 1 ? 'active' : ''}`}
              src={bg2}
              alt="College"
            />
            <img
              className={`carousel__photo ${currentSlide === 2 ? 'active' : ''}`}
              src={bg3}
              alt="College"
            />
            <img
              className={`carousel__photo ${currentSlide === 3 ? 'active' : ''}`}
              src={bg4}
              alt="College"
            />
            <img
              className={`carousel__photo ${currentSlide === 4 ? 'active' : ''}`}
              src={bg5}
              alt="College"
            />
            <img
              className={`carousel__photo ${currentSlide === 5 ? 'active' : ''}`}
              src={bg6}
              alt="College"
            />
            <img
              className={`carousel__photo ${currentSlide === 6 ? 'active' : ''}`}
              src={bg7}
              alt="College"
            />
            <div className="carousel__button--next" onClick={nextSlide}></div>
            <div className="carousel__button--prev" onClick={prevSlide}></div>
          </div>
        </div>
        <div className="extraInfo">
          <div className="profileCard">
            <div className="logo1" style={{ backgroundImage: `url(${p2})` }}></div>
            <div className="info">
              <div className="name">Ranvir Shanker</div>
              <div className="desg">Manager</div>
            </div>
          </div>
          <div className="profileCard">
            <div className="logo1" style={{ backgroundImage: `url(${p4})` }}></div>
            <div className="info">
              <div className="name">Prof. Shail Pande</div>
              <div className="desg">Principal</div>
            </div>
          </div>
        </div>
      </div>

      {/* News & Events */}
      <div className="news-events-section" style={{ backgroundImage: `url(${backImg})` }}>
        <div className="section-title"><h1>NEWS & EVENTS</h1></div>
        <div className="container3">
          <div className="items">
            <div className="items-head">
              <p>Latest News</p>
              <hr />
            </div>
            
            <div className="items-body">
              <div className="marquee-container">
                {newsAndEvents.news.map((item, index) => (
                  <a key={index} href={item.Link ? `/docs/${item.Link}` : "#"} target="_blank" rel="noopener noreferrer">
                    <div className="items-body-content">
                      <span><img src={newIcon} alt="new" /> {item.Title}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <a href="/viewallnews" className="read-more">Read more</a>
          </div>
          <div className="items">
            <div className="items-head">
              <p>Events/News Coverage</p>
              <hr />
            </div>
            <div className="items-body">
              <div className="marquee-container">
                {newsAndEvents.events.map((item, index) => (
                  <a key={index} href={item.Link ? `/docs/${item.Link}` : "#"} target="_blank" rel="noopener noreferrer">
                    <div className="items-body-content">
                      <span><img src="../images/new.webp" alt="new" /> {item.Title}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <a href="/viewallevent" className="read-more">Read more</a>
          </div>
        </div>
      </div>

      {/* About Us & Services */}
      <div className="services">
        <div className="about">
          <div className="tabs heading">
            <h2>About Us</h2>
          </div>
          <div className="aboutbody">
            D.A.V. Degree College established in year of 1970, in efficient operation of Aryan Educational trust, dedicated to spread education in purvanchal. In the beginning, the college got accreditation for conducting graduate arts faculty classes, but only after one year college got acceptance for classes of Mathematics and Biology classes. In the year 2006, under the self funded scheme of government, got acceptance for M.A. classes for subjects of Political Science and History (Medieval and Modern).
          </div>
        </div>
        <div className="btns">
          <div className="tabs" id="tabs">
            <div
              onClick={() => switchService(0)}
              className={`tab ${activeTab === 0 ? 'activeTab' : ''}`}
            >
              Students
            </div>
            <div 
              onClick={() => switchService(1)} 
              className={`tab ${activeTab === 1 ? 'activeTab' : ''}`}
            >
              Admission
            </div>
          </div>

          <div className={`btnsGrid ${activeTab === 0 ? '' : 'hidden'}`} id="studentServices">
            <span><a href="/registration" target="_blank" rel="noopener noreferrer"><img src={regIcon} alt="Registration" /><p>Registration</p></a></span>
            <span><a href="http://ddugu.ac.in/academic_calendar.aspx" target="_blank" rel="noopener noreferrer"><img src={calIcon} alt="Calendar" /><p>University Calender</p></a></span>
            <span><a href="/Feedback" target="_blank" rel="noopener noreferrer"><img src={feedIcon} alt="Feedback" /><p>Feedback Form</p></a></span>
            <span><a href="https://docs.google.com/forms/d/e/1FAIpQLSc47HWKe9dJx8C6XJsTDibN6zXNr9972P88WqVKuiaZryTAvw/viewform" target="_blank" rel="noopener noreferrer"><img src={grievIcon} alt="Grievance" /><p>Grivance Redressal</p></a></span>
            <span><a href="/c_corner" target="_blank" rel="noopener noreferrer"><img src={creativeIcon} alt="Creative" /><p>Creative Corner</p></a></span>
            <span><a href="/syllabus" target="_blank" rel="noopener noreferrer"><img src={syllIcon} alt="Syllabus" /><p>Syllabus</p></a></span>
            <span><a href="/timetable" target="_blank" rel="noopener noreferrer"><img src={timetableIcon} alt="Timetable" /><p>Time Table</p></a></span>
            <span><a href="/assets/docs/COURSE_CODE_BA.pdf" target="_blank" rel="noopener noreferrer"><img src={codeIcon} alt="Code" /><p>BA Couse Code</p></a></span>
            <span><a href="/assets/docs/ORIENTATION.pdf" target="_blank" rel="noopener noreferrer"><img src={pptIcon} alt="PPT" /><p>Orientation PPT</p></a></span>
          </div>
          <div className={`btnsGrid ${activeTab === 1 ? '' : 'hidden'}`} id="teacherServices">
            <span><a href="/admission" target="_blank" rel="noopener noreferrer"><img src={broucherIcon} alt="Brochure" /><p>Admission Procedure</p></a></span>
            <span><a href="/assets/docs/prospectus.pdf" target="_blank" rel="noopener noreferrer"><img src={admissionIcon} alt="Admission" /><p>Prospectus</p></a></span>
          </div>
        </div>
      </div>

      {/* Our Courses */}

<div className="courses-section" style={{ backgroundImage: `url(${backImg})` }}>
  <div className="section-title">
    <h1>OUR COURSES</h1>
  </div>
  <div className="container">
    <div className="row">
      {/* BA Card */}
      <div className="col-md-4 mb-4">
        <div className="course-card">
          <div className="course-image">
            <img src={baCourseImg} alt="BA" className="img-fluid" />
          </div>
          <div className="course-content">
            <h3>BACHELOR OF ARTS</h3>
            <p>
              The Bachelor of Arts faculty in the college has a total of 10 topics including Hindi, English, Sanskrit, History…
            </p>
            <div className="course-buttons">
              <a href="/ba" className="btn btn-primary">View Details</a>
              <button type="button" className="btn btn-outline-primary">Send Enquiry</button>
            </div>
          </div>
        </div>
      </div>

      {/* MA Card */}
      <div className="col-md-4 mb-4">
        <div className="course-card">
          <div className="course-image">
            <img src={baImg} alt="MA" className="img-fluid" />
          </div>
          <div className="course-content">
            <h3>MASTER OF ARTS</h3>
            <p>
              Permanent recognition in political science and history (medieval and modern) under at the postgraduate level in college is approved by the government.
            </p>
            <div className="course-buttons">
              <a href="/ma" className="btn btn-primary">View Details</a>
              <button type="button" className="btn btn-outline-primary">Send Enquiry</button>
            </div>
          </div>
        </div>
      </div>

      {/* BSc Card */}
      <div className="col-md-4 mb-4">
        <div className="course-card">
          <div className="course-image">
            <img src={bscImg} alt="BSc" className="img-fluid" />
          </div>
          <div className="course-content">
            <h3>BACHELOR OF SCIENCE</h3>
            <p>
              We have two subject group for B.Sc. students to choose 1. Mathematics, Chemistry, Physics, Mathematics 2. Biology, Chemistry, Zoology, Botany
            </p>
            <div className="course-buttons">
              <a href="/bsc" className="btn btn-primary">View Details</a>
              <button type="button" className="btn btn-outline-primary">Send Enquiry</button>
            </div>
          </div>
        </div>
      </div>

      {/* BCom Card */}
      <div className="col-md-4 mb-4">
        <div className="course-card">
          <div className="course-image">
            <img src={bcomImg} alt="BCom" className="img-fluid" />
          </div>
          <div className="course-content">
            <h3>BACHELOR OF COMMERCE</h3>
            <p>
              Commerce department was established in 2019 and is thus it is the newest department in the college.
            </p>
            <div className="course-buttons">
              <a href="/bcom" className="btn btn-primary">View Details</a>
              <button type="button" className="btn btn-outline-primary">Send Enquiry</button>
            </div>
          </div>
        </div>
      </div>

      {/* BCA Card */}
      <div className="col-md-4 mb-4">
        <div className="course-card">
          <div className="course-image">
            <img src={bcaImg} alt="BCA" className="img-fluid" />
          </div>
          <div className="course-content">
            <h3>BACHELOR OF COMPUTER APPLICATION</h3>
            <p>
              Bachelor of Computer Application is started from session 2024-2025 with intake of 60.
            </p>
            <div className="course-buttons">
              <a href="/bca" className="btn btn-primary">View Details</a>
              <button type="button" className="btn btn-outline-primary">Send Enquiry</button>
            </div>
          </div>
        </div>
      </div>

      {/* MSc Card */}
      <div className="col-md-4 mb-4">
        <div className="course-card">
          <div className="course-image">
            <img src={mscImg} alt="MSc" className="img-fluid" />
          </div>
          <div className="course-content">
            <h3>MASTER OF SCIENCE</h3>
            <p>
              We are running M.Sc. Botany from academic session 2024-2025.
            </p>
            <div className="course-buttons">
              <a href="/msc" className="btn btn-primary">View Details</a>
              <button type="button" className="btn btn-outline-primary">Send Enquiry</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Modal */}
      {showModal && (
        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div>
                <img src={popupImg} alt="Popup" />
                <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer would be imported here */}
    </div>
  );
};

export default HeroSection;