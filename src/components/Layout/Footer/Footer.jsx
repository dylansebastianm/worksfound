import React from "react";
import styles from "./footer.module.css";
import logo from "./../../../../public/assets/wf blanco.png";
import Image from "next/image";
import { BiLogoInstagram } from "react-icons/bi";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        <div className={styles.fila1}>
          <div
            className={styles.containerImage}
            style={{ marginBottom: "50px" }}
          >
            <Image src={logo} width={100} alt="WorksFound Logo" />
            <div className={styles.contenido}>
              Mejora tu salario y calidad de vida con oportunidades
              internacionales
            </div>
          </div>
          <div className={styles.contacto}>
            <div className={styles.rrss}>
              <Link
                href="https://www.instagram.com/worksfound/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.a}
              >
                <div>
                  <BiLogoInstagram className={styles.icon} />
                </div>
              </Link>
              <Link
                href="https://www.youtube.com/@WorksFound"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.a}
              >
                <div>
                  <FaYoutube className={styles.icon} />
                </div>
              </Link>
              <Link
                href="https://www.linkedin.com/company/worksfound/posts/?feedView=all&viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.a}
              >
                <div>
                  <FaLinkedin className={styles.icon} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className={styles.contacto}>
          <div className={styles.titleSecciones}>Secciones</div>
          <div className={styles.hr2}/>
          <Link href="#empresas" passHref className={styles.a}>
            <div className={styles.item}>Empresas</div>
          </Link>
          <Link href="#beneficios" passHref className={styles.a}>
            <div className={styles.item}>Beneficios</div>
          </Link>
          <Link href="#portales" passHref className={styles.a}>
            <div className={styles.item}>Portales</div>
          </Link>
          <Link href="#testimonios" passHref className={styles.a}>
            <div className={styles.item}>Testimonios</div>
          </Link>
          <Link href="/comparacion" passHref className={styles.a}>
            <div className={styles.item}>Compara nuestros servicios</div>
          </Link>
          <Link href="/terminos-y-condiciones" passHref className={styles.a}>
            <div className={styles.item}>Términos y Condiciones</div>
          </Link>
        </div>

        <div className={styles.contacto}>
        <div className={styles.titleSecciones}>Contacto</div>
        <div className={styles.hr2}/>
          <div className={styles.datos}>
            <FaMapMarkerAlt />
            <span className={styles.a}>
              1908 Thomes Ave STE 12653<br />
              Cheyenne, WY 82001
            </span>
          </div>
          <div className={styles.datos}>
            <FaWhatsapp />
            <Link
              className={styles.a}
              href="https://wa.me/5491170650453"
              target="_blank"
              rel="noopener noreferrer"
            >
              +54 9 11 7065-0453
            </Link>
          </div>
          <div className={styles.datos}>
            <FaEnvelope />
            <Link href="mailto:admin@worksfound.com" className={styles.a}>
              admin@worksfound.com
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.hr} />
      <div className={styles.copy}>
        © Copyright 2025 WorksFound LLC. Todos los derechos reservados
      </div>
    </div>
  );
}
