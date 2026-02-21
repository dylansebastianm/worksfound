import React from 'react'
import styles from './nav.module.css'
import logo from './../../../../public/assets/wf nav.png'
import Image from 'next/image'
import Button from './Button'
import Link from 'next/link'

export default function Nav() {
  return (
    <div className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <Image src={logo} className={styles.image} width={60} alt="WorksFound Logo" />
        </Link>
        <div className={styles.items}>
        <Link href="/#empresas" passHref className={styles.a}>
        <div className={styles.item}>Empresas</div>
        </Link>
        <Link href="/#beneficios" passHref className={styles.a}>
        <div className={styles.item}>Beneficios</div>
        </Link>
        <Link href="/#portales" passHref className={styles.a}>
        <div className={styles.item}>Portales</div>
        </Link>
        <Link href="/#testimonios" passHref className={styles.a}>
        <div className={styles.item}>Testimonios</div>
        </Link>
        </div>
        <div className={styles.button}>
        <Button title={'Comenzar ahora'} />
        </div>
    </div>
  )
}
