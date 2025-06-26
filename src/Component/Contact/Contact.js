import React from "react";
import { IoIosContact, IoIosMail } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import './Contact.css';

const Contact = () => {
  return (
    <div className="container mt-5 mb-5">
      <div className="row align-items-start">
        
        {/* Contact Info */}
        <div className="col-md-6 mb-4">
          <h3 className="mb-4 text-danger">Contact Information</h3>
          <div className="contact-item mb-3 d-flex align-items-center">
            <IoIosContact className="contact-icon" />
            <span className="ms-3">+91 89460 04709</span>
          </div>
          <div className="contact-item mb-3 d-flex align-items-center">
            <IoIosMail className="contact-icon" />
            <span className="ms-3">info@tutorhubzone.com</span>
          </div>
          <div className="contact-item mb-3 d-flex align-items-center">
            <IoLocation className="contact-icon" />
            <span className="ms-3"> No-218, Velachery Main Rd, Selvam Nagar, Pallikaranai, Chennai, Tamil Nadu 600100</span>
          </div>
        </div>

        {/* Google Map */}
        <div className="col-md-6">
          <h3 className="mb-4 text-danger">Our Location</h3>
          <div className="map-responsive">
            <iframe
              title="Trainer Location"
              width="100%"
              height="300"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://maps.google.com/maps?width=100%25&amp;height=300&amp;hl=en&amp;q=No-218,%20Velachery%20Main%20Rd,%20Selvam%20Nagar,%20Pallikaranai,%20Chennai,%20Tamil%20Nadu%20600100+(Trainer%20Contacts)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
