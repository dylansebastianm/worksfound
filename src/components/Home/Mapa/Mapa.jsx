import React from 'react'
import styles from './mapa.module.css'
import Image from 'next/image'
import mapa from './../../../../public/assets/mapa.gif'

export default function Mapa() {
  return (
    <div className={styles.container}>
        <div className={styles.containerImage}>
        <Image src={mapa} className={styles.image}/>
        </div>
        <div className={styles.containerTitle}>
      <div className={styles.title}>
      Alcance Global
      </div>
      <div className={styles.subtitle}>
      Empresas en países como  <spam className={styles.spam}>España, Colombia, Chile, México, Estados Unidos, Canadá</spam> y otros han contratado talentos que utilizaron nuestros servicios
      </div>
      </div>
    </div>
  )
}
