// src/pages/ContactPage.jsx

import React, { useState } from 'react'; // Import the useState hook

function ContactPage() {
  // 1. Initialize State for Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // 2. Handle Input Changes (Updates state as the user types)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value // [name] references the input's 'name' attribute
    }));
  };

  // 3. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the browser from reloading (default HTML behavior)

    // Simple validation check (can be expanded later)
    if (formData.name.trim() === '' || formData.email.trim() === '' || formData.message.trim() === '') {
        alert("Please fill in all required fields.");
        return;
    }

    // Log the data and show success message
    console.log('Contact Form Submitted with data:', formData);
    alert("Your message has been sent successfully!");

    // Clear the form fields after submission
    setFormData({ name: '', email: '', message: '' });
  };


  return (
    // Converted <section id="contact"> to JSX
    <section id="contact">
      <h1>Contact Us</h1>
      
      {/* 4. Converted form and attached onSubmit handler */}
      <form id="contact-form" onSubmit={handleSubmit}>
        
        {/* Input for Name - Connected to State */}
        <input 
          type="text" 
          placeholder="Your Name" 
          name="name" // CRITICAL: Used by handleChange
          value={formData.name}
          onChange={handleChange}
          required 
        />
        
        {/* Input for Email - Connected to State */}
        <input 
          type="email" 
          placeholder="Your Email" 
          name="email" // CRITICAL: Used by handleChange
          value={formData.email}
          onChange={handleChange}
          required 
        />
        
        {/* Textarea - Converted and Connected to State */}
        {/* Note: In React, you use a self-closing <textarea> and control the content with 'value' */}
        <textarea 
          rows="4" 
          placeholder="Your Message" 
          name="message" // CRITICAL: Used by handleChange
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
        
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default ContactPage;