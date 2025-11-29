import React from "react";
import styles from "./portales.module.css";
import Image from "next/image";
import gif from "./../../../../public/assets/portales.gif";
import Button from "../Button/Button";

export default function Portales() {
  return (
    <div className={styles.container}>
      <div className={styles.contenedorIconos}>
        <Image src={gif} className={styles.image} width={550} alt="Plataformas de empleo disponibles" />
      </div>
      <div className={styles.contenedorTextos}>
        <div className={styles.title}>
          Contamos con una plataforma impulsada con IA
        </div>
        <div className={styles.subtitle}>
          Con WorksFound, postula automáticamente a todos los puestos de trabajo
          en plataformas de empleo reconocidas como{" "}
          <span className={styles.spam}>
            LinkedIn, Bumeran, Indeed, Glassdoor y más
          </span>
        </div>
        {/* <div><Button title={'Solicitar una demo'}/></div> */}
      </div>
      
    </div>
  );
}
