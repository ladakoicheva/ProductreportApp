import { useRef } from 'react'
import { useFormik } from 'formik'
import styles from './Form.module.css'
import { sendData } from '../../firebase/db/products/products'
import { saveImageForProduct } from '../../firebase/db/images/imageStorage'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { APP_STORAGE } from '../../firebase'

export default function Form() {
  const fileRef = useRef(null)

  const formik = useFormik({
    initialValues: {
      img: '',
      productName: '',
      category: 'Meat & Poultry',
      productionMethod: '100%Grass-fed',
      quality: 50,
      carbonSequestration: '',
    },
    onSubmit: async (values) => {
      try {
        const productId = Date.now().toString()

        if (fileRef.current) {
          try {
            const storageRef = ref(APP_STORAGE, `product_images/${productId}-${fileRef.current.name}`)
            await uploadBytes(storageRef, fileRef.current)
            const downloadURL = await getDownloadURL(storageRef)
            saveImageForProduct(productId, downloadURL)
            console.log(`Image uploaded for product ${productId}`)
          } catch (error) {
            console.error('Error uploading image:', error)
          }
        }

        const dataToSave = {
          ...values,
          productId: productId,
          img: ''
        }

        await sendData(dataToSave)
        fileRef.current = null
        formik.resetForm()
        alert('Product added successfully!')
      } catch (error) {
        console.error('Error sending data:', error)
        alert('Error adding product')
      }
    },
  })

  const handleImagesChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    fileRef.current = file
    formik.setFieldValue('img', file.name)
  }


  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="images" className={styles.fileInputLabel}>📁 Upload Image:</label>
        <input type="file" id="images" name="images" onChange={handleImagesChange} className={styles.fileInput} accept="image/*" />
        {formik.values.img && <p className={styles.info}>✓ Image uploaded</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="productName" className={styles.label}>Product Name:</label>
        <input id='productName' name='productName' type="text" value={formik.values.productName} onChange={formik.handleChange} className={styles.input} placeholder="Enter product name" />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="category" className={styles.label}>Category:</label>
        <select id="category" name="category" value={formik.values.category} onChange={formik.handleChange} className={styles.select}>
          <option value="Meat & Poultry">Meat & Poultry</option>
          <option value="">Vegetables & Greens</option>
          <option value="Dairy & Eggs">Dairy & Eggs</option>
          <option value="Bakery & Grains">Bakery & Grains</option>
          <option value="Beverages">Beverages</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="productionMethod" className={styles.label}>Production Method:</label>
        <select id="productionMethod" name="productionMethod" value={formik.values.productionMethod} onChange={formik.handleChange} className={styles.select}>
          <option value="100%Grass-fed">100% Grass-fed</option>
          <option value="Organic">Organic</option>
          <option value="Regeneratively Grown">Regeneratively Grown</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="quality" className={styles.label}>Soil Quality: {formik.values.quality}%</label>
        <input id="quality" type="range" min='0' max='100' value={formik.values.quality} onChange={formik.handleChange} className={styles.rangeInput} />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="carbonSequestration" className={styles.label}>Carbon Sequestration:</label>
        <input id="carbonSequestration" type="number" value={formik.values.carbonSequestration} onChange={formik.handleChange} className={styles.input} placeholder="Enter value" />
      </div>

      <button type="submit" className={styles.button}>Submit</button>
    </form>
  )
}