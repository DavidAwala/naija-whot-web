import React, { useState } from 'react';

const ContactModal = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    subject: '',
    message: '',
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  const emailParams = {
    email: formData.email,
    username: formData.username,
    subject: formData.subject,
    message: formData.message,
  };

  emailjs
    .send("service_8rzq37k", "template_prvzawf", emailParams, "X1TPelY59PbnjmXJ7")
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
      setSubmitted(true);
        setSent(true);
      setFormData({ email: "", username: "", subject: "", message: "" });
      setLoading(false); // Hide loader
    })
    .catch((error) => {
      console.error("FAILED...", error);
      setLoading(false); // Hide loader even if it fails
    });
};


  return (
    <div className="modal-overlay">
      <div className="modal-content contact-modal">
        <button className="close-btn" onClick={onClose} style={{ position: 'relative', top: '-20px', left: '180px', fontSize: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#444', fontWeight: 'bold', transition: 'transform 0.2s ease' }}>✖</button>
        <h2>💬 Contact the Developer</h2>
        <a target='_blank' href="https://mywebsiteagd.42web.io/?i=3">my portfolio</a>
        <p>Got a bug, feedback, or an idea? I'm all ears!</p>
        
        {sent ? (
          <div className="thank-you">
            <p>🎉 Thank you! Your message has been sent.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} id="contactForm">
            <input type="text" name="username" placeholder="Your Name" value={formData.username} onChange={handleChange} />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
            <textarea name="message" placeholder="Write your message here..." value={formData.message} onChange={handleChange} />
           <button type="submit" className="modal-play-btn" disabled={loading}>
  {loading ? (
    <span className="loader"></span>
  ) : (
    "Send Message"
  )}
</button>

          </form>
        )}
      </div>
        <style>
          {`
           .contact-modal {
  max-width: 450px;
  padding: 30px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.contact-modal h2 {
  margin-bottom: 10px;
}

.contact-modal p {
  margin-bottom: 20px;
  font-size: 14px;
  color: #555;
}

.contact-modal form input,
.contact-modal form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.contact-modal form textarea {
  resize: vertical;
  min-height: 100px;
}

.modal-play-btn {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.modal-play-btn:hover {
  background-color: #1976d2;
}
  .close-btn{
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: red;
    font-weight: bold;
    transition: transform 0.2s ease;
  }

.thank-you {
  color: green;
  font-weight: bold;
  font-size: 16px;
}
  .loader {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 3px solid #fff;
  border-top: 3px solid #4caf50;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  vertical-align: middle;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}


          `}
        </style>
    </div>
  );
};

export default ContactModal;
