import React from 'react'
import { Link } from 'react-router'
import styles from './HomePage.module.css'

export default function HomePage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you soon');
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>From Fields to Your Table</h1>
          <Link to="/products" className={styles.heroCTA}>See Products</Link>
        </div>
      </section>

      {/* Approach Section */}
      <section className={styles.approach}>
        <div className={styles.approachContent}>
          <p className={styles.approachText}>
            Welcome to Bauern! We believe people deserve to know where their food comes from. Our platform connects customers directly with farms through transparent product journeys, realtime sustainability data, and verified environmental impact. From farm to table — we make sustainable food simple, trustworthy, and easy to explore.
          </p>
        </div>
        <div className={styles.vector}></div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.contactSection}>
        <div className={styles.contactVector}></div>
        <div className={styles.contactOverlay}></div>
        <div className={styles.contactContent}>
          <h2 className={styles.contactTitle}>Order Our Services</h2>
          <p className={styles.contactSubtitle}>Fill out the form and we will contact you as soon as possible</p>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
            />
            <select
              name="service"
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
  ); 
}; 