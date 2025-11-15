// src/pages/ContactPage.jsx

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }

    alert("Your message has been sent!");
    console.log("Form Submitted:", formData);

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact-glass">
      <h1>Contact Us</h1>

      <form id="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          placeholder="Your Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          placeholder="Your Message"
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}
