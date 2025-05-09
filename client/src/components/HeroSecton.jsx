import React, { useEffect } from 'react';
import './styles/HeroSection.css';

const HeroSection = () => {
  useEffect(() => {
    const modal = document.getElementById('myModal');
    if (modal) modal.style.display = 'block';
  }, []);

  return (
    <>
      <div className="carousal">
        <div className="carousel-wrapper">
          <div className="carouselBox">
            {['bg1', 'bg2', 'bg3', 'bg4', 'bg5', 'bg6', 'bg7'].map((img, idx) => (
              <img
                key={idx}
                className={`carousel__photo ${idx === 0 ? 'initial' : ''}`}
                src={`../images/${img}.jpeg`}
                alt={`carousel ${idx + 1}`}
              />
            ))}
            <div className="carousel__button--next"></div>
            <div className="carousel__button--prev"></div>
          </div>
        </div>

        <div className="extraInfo">
          {[
            { name: 'Ranvir Shanker', desg: 'Manager', img: 'p2.jpeg' },
            { name: 'Prof. Shail Pande', desg: 'Principal', img: 'p4.jpeg' },
          ].map((p, idx) => (
            <div className="profileCard" key={idx}>
              <div className="logo1" style={{ backgroundImage: `url(/assets/img/${p.img})` }}></div>
              <div className="info">
                <div className="name">{p.name}</div>
                <div className="desg">{p.desg}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-section">
        <div className="section-title">NEWS & EVENTS</div>
        <div className="container3">
          <NewsSection />
          <EventSection />
        </div>
      </div>

      <div className="services">
        <div className="about">
          <div className="tabs heading">
            <h2>About Us</h2>
          </div>
          <div className="body">
            D.A.V. Degree College established in 1970... (static text continues)
          </div>
        </div>
        <ServiceTabs />
      </div>

      <div className="bg-section">
        <div className="section-title">OUR COURSES</div>
        <CourseGrid />
      </div>

      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <img src="/assets/img/popup.jpeg" alt="popup" />
          </div>
        </div>
      </div>
    </>
  );
};

const NewsSection = () => (
  <div className="items">
    <div className="items-head"><p>Latest News</p><hr /></div>
    <div className="items-body">
      <marquee direction="up" scrollamount="2">[Dynamic News List]</marquee>
    </div>
    <a href="/viewallnews" className="read-more">Read more</a>
  </div>
);

const EventSection = () => (
  <div className="items">
    <div className="items-head"><p>Events/News Coverage</p><hr /></div>
    <div className="items-body">
      <marquee direction="up" scrollamount="2">[Dynamic Event List]</marquee>
    </div>
    <a href="/viewallevent" className="read-more">Read more</a>
  </div>
);

const ServiceTabs = () => (
  <div className="btns">
    <div className="tabs">
      <div className="activeTab tab">Students</div>
      <div className="tab">Admission</div>
    </div>
    <div className="btnsGrid">[Student Links]</div>
    <div className="btnsGrid hidden">[Admission Links]</div>
  </div>
);

const CourseGrid = () => (
  <div className="container">
    <div className="row course">
      <div className="col">[BA Info]</div>
      <div className="col">[MA Info]</div>
    </div>
    <div className="row course">
      <div className="col">[BSc Info]</div>
      <div className="col">[BCom Info]</div>
    </div>
    <div className="row course">
      <div className="col">[BCA Info]</div>
      <div className="col">[MSc Info]</div>
    </div>
  </div>
);

export default HeroSection;
