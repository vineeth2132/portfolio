import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import "../styles/ContactPage.css";

export default function ContactPage() {
  const formRef = useRef();
  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_wvmg5gl",       // Replace with your EmailJS service ID
      "template_ffspj6m",      // Replace with your EmailJS template ID
      formRef.current,
      "FO7JriFFcRiU-Bc5z"           // Replace with your EmailJS public key
    )
    .then(() => {
      alert("Message sent!");
      formRef.current.reset();
    })
    .catch((err) => alert("Failed to send message, try again."));
  };

  return (
    <div className="contact-container">
      <div className="contact-left">
        <h2>Contact Information</h2>
        <p>Say something to start a chat!</p>
        <ul>
          <li>📍 Location: India</li>
          <li>📞 Phone: +91-7997616471</li>
          <li>📧 Email: vineethjoseph12@gmail.com</li>
          <li>🔗 LinkedIn: linkedin.com/in/vineth-joseph-4a36931a6</li>
        </ul>
      </div>

      <div className="contact-right">
        <form ref={formRef} onSubmit={sendEmail}>
          <div className="row">
            <input name="firstName" placeholder="First Name" required />
            <input name="lastName" placeholder="Last Name" required />
          </div>
          <div className="row">
            <input name="email" placeholder="Email" type="email" required />
            <input name="phone" placeholder="Phone Number" />
          </div>
          <textarea name="message" placeholder="Write your message..." rows={5} required />
          <div className="buttons">
            <button type="button" onClick={() => navigate("/home")}>Back to Home</button>
            <button type="submit" className="send">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
}
