'use client'

import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import styles from './propuesta.module.css'
import Card from './Card'
import icon1 from './../../../../public/assets/icon1.png'
import icon2 from './../../../../public/assets/icon2.png'
import icon3 from './../../../../public/assets/icon3.png'
import icon4 from './../../../../public/assets/icon4.png'
import icon5 from './../../../../public/assets/icon5.png'
import icon6 from './../../../../public/assets/icon6.png'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function NextArrow({ onClick }) {
  return (
    <div className={`${styles.arrow} ${styles.nextArrow}`} onClick={onClick}>
      <FaChevronRight />
    </div>
  )
}

function PrevArrow({ onClick }) {
  return (
    <div className={`${styles.arrow} ${styles.prevArrow}`} onClick={onClick}>
      <FaChevronLeft />
    </div>
  )
}

export default function Propuesta() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 800)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const data = [
    {icon:<Image src={icon1} width={50}/>, contenido:"En un mercado tan competitivo, pon las estadísticas a tu favor"},
    {icon:<Image src={icon2} width={50}/>, contenido:"Mejora tu calidad de vida encontrando el empleo que estás buscando"},
    {icon:<Image src={icon3} width={50}/>, contenido:"Cambia tu modalidad de presencial o híbrido a 100% remoto o viceversa"},
    {icon:<Image src={icon4} width={50}/>, contenido:"Sal de un ambiente laboral poco reconfortante"},
    {icon:<Image src={icon5} width={50}/>, contenido:"Consigue salarios mejor remunerados"},
    {icon:<Image src={icon6} width={50}/>, contenido:"Da un siguiente paso en tu carrera"}
  ]

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: false,
    pauseOnHover: true,
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>Beneficios de trabajar con nosotros</div>
      {isMobile ? (
        <div className={styles.sliderContainer}>
          <Slider {...sliderSettings}>
            {data.map((item, index) => (
              <div key={index} className={styles.slide}>
                <Card icon={item.icon} contenido={item.contenido} />
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <div className={styles.containerCards}>
          {data.map((item, index) => (
            <Card key={index} icon={item.icon} contenido={item.contenido} />
          ))}
        </div>
      )}
    </div>
  )
}
