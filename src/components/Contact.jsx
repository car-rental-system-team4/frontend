import { useState } from 'react';
import { submitContactForm } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error("Failed to submit contact form", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-5 bg-light text-dark">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h5 className="mb-3">Get in Touch</h5>
            {submitted ? (
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Message Sent!</h4>
                <p>Thank you for contacting us. We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
          <div className="col-lg-6">
            <div className="ps-lg-5">
              <h5 className="mb-3">Business Hours</h5>
              <p className="text-muted mb-1">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-muted mb-1">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-muted mb-4">Sunday: Closed</p>

              <h5 className="mb-3">Contact Info</h5>
              <p className="text-muted mb-1">Email: support@rentyourcar.com</p>
              <p className="text-muted mb-4">Phone: +91 123 456 7890</p>

              <h5 className="mb-3">Follow Us</h5>
              <div className="d-flex gap-2">
                <a href="#" className="btn btn-outline-primary btn-sm">Facebook</a>
                <a href="#" className="btn btn-outline-danger btn-sm">Instagram</a>
                <a href="#" className="btn btn-outline-info btn-sm">Twitter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
