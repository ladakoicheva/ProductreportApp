import React, { useState } from 'react'
import { Link } from 'react-router'
import styles from './HomePage.module.css'

export default function HomePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you! We will contact you soon')
    setFormData({ name: '', email: '', service: '' })
  }

  const testimonials = [
    { name: 'Andrii Bezdolnyi', role: 'Top Manager', text: 'The best quality and service! I recommend it to all my friends and colleagues.' },
    { name: 'Petro Kormylenko', role: 'Director', text: 'A reliable company with excellent customer service. Thank you for your professionalism!' },
    { name: 'Yana Kmelnitska', role: 'Photographer', text: 'Fast delivery and responsible approach to every order. Highly appreciated!' }
  ]

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Bauern</h1>
          <p className={styles.heroSubtitle}>We make creative fuel for your firm</p>
          <Link to="/products" className={styles.heroCTA}>See Products</Link>
        </div>
      </section>

      {/* Approach Section */}
      <section className={styles.approach}>
        <div className={styles.approachContent}>
          <h2 className={styles.approachTitle}>Our Approach</h2>
          <p className={styles.approachText}>
            We believe people deserve to know where their food comes from. Our platform connects customers directly with farms through transparent product journeys, realtime sustainability data, and verified environmental impact.

            From farm to table — we make sustainable food simple, trustworthy, and easy to explore
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <h2 className={styles.servicesTitle}>Our Services</h2>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>📦</div>
            <h3>Delivery</h3>
            <p>Fast and secure delivery of goods directly to your home with tracking</p>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>✅</div>
            <h3>Quality</h3>
            <p>Quality guarantee for all products. Verified suppliers and materials</p>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>💬</div>
            <h3>Support</h3>
            <p>24/7 technical support and consultations for our valued customers</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <div className={styles.aboutContent}>
          <h2>About Us</h2>
          <p>
            Welcome to Bauern!

            We believe people deserve to know where their food comes from. Our platform connects customers directly with farms through transparent product journeys, realtime sustainability data, and verified environmental impact.

            From farm to table — we make sustainable food simple, trustworthy, and easy to explore
          </p>
          <p>
            Our insta:     <a href="https://www.instagram.com/bauern.in?igsh=MXdsMHNmZzl3YXEzdw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">@bauern.farm</a>
          </p>
         
        </div>
        <div className={styles.aboutImage}>🏢</div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <h2 className={styles.testimonialsTitle}>Testimonials</h2>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className={styles.testimonialCard}>
              <div className={styles.testimonialAvatar}>👤</div>
              <p className={styles.testimonialText}>"{testimonial.text}"</p>
              <p className={styles.testimonialAuthor}>{testimonial.name}</p>
              <p className={styles.testimonialRole}>{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.contactSection}>
        <div className={styles.contactOverlay}></div>
        <div className={styles.contactContent}>
          <h2 className={styles.contactTitle}>Order Our Services</h2>
          <p className={styles.contactSubtitle}>Fill out the form and we will contact you as soon as possible</p>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a Service</option>
              <option value="delivery">Delivery</option>
              <option value="quality">Quality</option>
              <option value="support">Support</option>
            </select>
            <button type="submit" className={styles.submitButton}>Submit Request</button>
          </form>
        </div>
      </section>
    </div>
  )
}
