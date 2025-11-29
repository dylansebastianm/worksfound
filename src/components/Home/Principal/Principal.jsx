import React from 'react'
import styles from './principal.module.css'
import img1 from './../../../../public/assets/img2.png'
import Image from 'next/image'
import Button from '../Button/Button'

export default function Principal() {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.containerTitle}>
      <div className={styles.title}>
      Consigue tu proximo trabajo  en menos de 60 días <span className={styles.spam}>sin invertir tu tiempo</span>.
      </div>
      <div className={styles.subtitle}>No esperes a tener tiempo libre para buscar empleo</div>
      {/* <div><Button title={'Comenzar'}/></div> */}
      </div>
      <div className={styles.imagen}>
         <Image src={img1} className={styles.img} alt="Persona trabajando en tecnología" />
      </div>
    </div>
    </>
  )
}
