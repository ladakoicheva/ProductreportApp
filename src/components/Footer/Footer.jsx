import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brandBlock}>
          <img src='/logo.png' alt='Bauern logo' className={styles.logo} />
          <h3 className={styles.brand}>Bauern</h3>
        </div>

        <div className={styles.column}>
          <h4 className={styles.title}>Popular products</h4>
          <ul className={styles.productList}>
            <li className={styles.productItem}>Organic tomatoes</li>
            <li className={styles.productItem}>Fresh goat cheese</li>
            <li className={styles.productItem}>Farm eggs</li>
            <li className={styles.productItem}>Raw forest honey</li>
            <li className={styles.productItem}>Seasonal berries</li>
          </ul>
        </div>

        <div className={styles.column}>
          <p className={styles.text}>Adress: Linkmenu g. 28, Vilnius, 08217 Vilniaus m. sav., table 9</p>
          <p className={styles.text}>Phone: +380956470333</p>
          <p className={styles.text}>Social media:bauern.in</p>
        </div>

        <div className={styles.columnRight}>
          <p className={styles.rightText}>inst:@bauern.in</p>
          <p className={styles.rightText}>+380956470333</p>
        </div>
      </div>
    </footer>
  )
}
