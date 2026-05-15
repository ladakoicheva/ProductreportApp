import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useProductStore } from '../../store/productStore'
import styles from './ReportPage.module.css'

export default function ReportPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products } = useProductStore()

  const product = products.find(p => p.productId === id)

  const getMicrobialActivity = (productionMethod) => {
    switch (productionMethod) {
      case 'Organic':
        return 'Very High'
      case 'Regeneratively Grown':
        return 'High'
      case '100%Grass-fed':
        return 'Medium'
      default:
        return 'Medium'
    }
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <h1>Product not found</h1>
        <button onClick={() => navigate('/products')} className={styles.backButton}>
          Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className={styles.report}>
      {/* Header with back button */}
      <button onClick={() => navigate('/products')} className={styles.backButton}>
        ← Back to Products
      </button>

      {/* Hero Section with Image */}
      <div className={styles.heroSection}>
        {product.imageUrl && <img src={product.imageUrl} alt={product.productName} className={styles.heroImage} />}
        <div className={styles.heroOverlay}>
          <h1 className={styles.productTitle}>{product.productName}</h1>
          <p className={styles.productSubtitle}>{product.productionMethod}</p>
          <p className={styles.producerEmail}>👤 By: {product.userEmail}</p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <h2>FARMERS CIRCLE | PASSPORT OF ORIGIN</h2>
          <div className={styles.separator}></div>
        </div>

        {/* Narrative Section */}
        <section className={styles.section}>
          <h3>OUR STORY (The Narrative)</h3>
          <div className={styles.sectionContent}>
            <p>
              We believe that healthy soil creates healthy food. At our farm in {product.category},
              we use regenerative farming methods to not just take from nature, but to give back to it.
            </p>
            <p>
              Our {product.productName} is produced using {product.productionMethod} practices,
              ensuring the highest quality while maintaining ecological balance.
            </p>
          </div>
        </section>

        {/* Statistics Grid */}
        <section className={styles.section}>
          <h3>ECOLOGICAL FOOTPRINT (Comparative Analysis)</h3>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statLabel}>Carbon Sequestration</div>
              <div className={styles.statValue}>{product.carbonSequestration || 'N/A'}</div>
              <div className={styles.statBar}>
                <div className={styles.statFill} style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statLabel}>Soil Quality</div>
              <div className={styles.statValue}>{product.quality}%</div>
              <div className={styles.statBar}>
                <div className={styles.statFill} style={{ width: `${product.quality}%` }}></div>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statLabel}>Category</div>
              <div className={styles.statValue}>{product.category}</div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statLabel}>Production Method</div>
              <div className={styles.statValue}>{product.productionMethod}</div>
            </div>
          </div>
        </section>

        {/* Carbon Footprint */}
        <section className={styles.section}>
          <h3>CARBON FOOTPRINT (Per 1 kg of product)</h3>
          <div className={styles.carbonChart}>
            <div className={styles.carbonBar}>
              <div className={styles.carbonFill} style={{ width: `${((product.carbonSequestration || 0.35) / 0.85) * 100}%` }}>
                <span>Our Product: {product.carbonSequestration || 0.35} kg CO₂</span>
              </div>
            </div>
            <div className={styles.carbonBar}>
              <div className={styles.carbonFillAverage} style={{ width: '85%' }}>
                <span>Industry Average: 0.85 kg CO₂</span>
              </div>
            </div>
          </div>
        </section>

        {/* Soil Health */}
        <section className={styles.section}>
          <h3>SOIL HEALTH (Organic Index)</h3>
          <div className={styles.healthIndicators}>
            <div className={styles.indicator}>
              <div className={styles.indicatorLabel}>Organic Matter</div>
              <div className={styles.indicatorValue}>8%</div>
            </div>
            <div className={styles.indicator}>
              <div className={styles.indicatorLabel}>Microbial Activity</div>
              <div className={styles.indicatorValue}>{getMicrobialActivity(product.productionMethod)}</div>
            </div>
            <div className={styles.indicator}>
              <div className={styles.indicatorLabel}>pH Level</div>
              <div className={styles.indicatorValue}>6.8</div>
            </div>
            <div className={styles.indicator}>
              <div className={styles.indicatorLabel}>Erosion Risk</div>
              <div className={styles.indicatorValue}>Low</div>
            </div>
          </div>
        </section>

        {/* Process Transparency */}
        <section className={styles.section}>
          <h3>PROCESS TRANSPARENCY: From Soil to Table</h3>
          <div className={styles.processTimeline}>
            <div className={styles.processStep}>
              <div className={styles.stepIcon}>📷</div>
              <div className={styles.stepContent}>
                <h4>Farm to Harvest</h4>
                <p>Our product begins its journey in the field, grown with care and sustainable practices to ensure quality from the very start.</p>
              </div>
            </div>

            {product.processing && (
              <div className={styles.processStep}>
                <div className={styles.stepIcon}>🔄</div>
                <div className={styles.stepContent}>
                  <h4>Processing</h4>
                  <p>{product.processing}</p>
                </div>
              </div>
            )}

            {product.qualityCheck && (
              <div className={styles.processStep}>
                <div className={styles.stepIcon}>✅</div>
                <div className={styles.stepContent}>
                  <h4>Quality Check</h4>
                  <p>{product.qualityCheck}</p>
                </div>
              </div>
            )}

            {product.packaging && (
              <div className={styles.processStep}>
                <div className={styles.stepIcon}>📦</div>
                <div className={styles.stepContent}>
                  <h4>Packaging</h4>
                  <p>{product.packaging}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Action Buttons */}
        <section className={styles.actions}>
          <button className={`${styles.actionButton} ${styles.downloadButton}`}>
            📄 Download as PDF (ESG Report)
          </button>
          <button className={`${styles.actionButton} ${styles.shareButton}`}>
            🔗 Share Link
          </button>
        </section>
      </div>
    </div>
  )
}
