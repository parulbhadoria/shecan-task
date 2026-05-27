import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaPaperPlane
} from "react-icons/fa";

function ContactForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if(e.target.name === "email"){
    setEmailError("");
  }
  }

  function validateEmail(email) { 
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(email);
}

  async function handleSubmit(e) {

    e.preventDefault();

    if(!validateEmail(formData.email)){
       setEmailError("Please enter a valid email");

  return;
}

setEmailError("");

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();

      if(!data.success){

        toast.error(data.message);

        setLoading(false);

        return;
      }

      if(data.success){

        toast.success("Email Sent Successfully!");

        setFormData({
          name: "",
          email: "",
          message: ""
        });

        setLoading(false);
      }

    } catch(error){

      console.log(error);

      toast.error("Failed to send email");
      setLoading(false);
    }
  }

  return (
      <motion.div
        className="form-container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
>

      <form onSubmit={handleSubmit}>

        <h2>
          <FaPaperPlane />
          Contact Us
        </h2>

        <div className="input-box">
          

          <FaUser className="input-icon" />

          <input
  
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

        </div>

        <div className="input-box">

          <FaEnvelope className="input-icon" />

          <input
          className={emailError ? "error-input" : ""}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {
            emailError &&
            <p className="error-text">
            {emailError}
            </p>
          }

        </div>

        <div className="input-box textarea-box">

          <FaCommentDots className="input-icon" />

          <textarea
            name="message"
            maxLength={200}
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <p className="char-count">
              {formData.message.length}/200
          </p>

        </div>

        <button type="submit" disabled={loading}>

          <FaPaperPlane />

          {
            loading ? "Sending..." : "Submit"
          }

        </button>

      </form>

    </motion.div>
  );
}

export default ContactForm;