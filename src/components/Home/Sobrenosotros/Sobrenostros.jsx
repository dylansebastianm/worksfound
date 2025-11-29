import React from "react";
import styles from "./sobrenosotros.module.css";
import dylan from "./../../../../public/assets/dy.png";
import bruno from "./../../../../public/assets/bruno.png";
import Image from "next/image";

export default function Sobrenostros() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Sobre Nosotros</div>
      <div className={styles.container1}>
        <div className={styles.foto}>
        <Image src={dylan} width={200} />
        <div>Dylan Sebastián CoFounder</div>
        </div>
        <div className={styles.datos}>
          <div>
            En los últimos siete años, he tenido al menos diez empleos,
          enfrentando desafíos en cada transición debido a la falta de
          experiencia y la alta competencia. A pesar de enviar numerosos CVs a
          diario, los resultados fueron limitados. Buscaba mejorar mínimamente
          mi situación con cada cambio. Comencé en McDonald's, luego pasé a un
          call center de ventas, y finalmente me moví a roles de atención al
          cliente por chat en fintechs. Todos estos trabajos compartían un
          enfoque en productividad que no me satisfacía. 
          </div>
          <div>
            Inspirado por mi novia, analista de datos, decidí estudiar para ser
          Full Stack Developer en un Bootcamp, buscando un trabajo remoto y
          mejor remunerado. En menos de 30 días, pasé de analista de Customer
          Care a Full Stack Developer Jr, duplicando mi salario y trabajando de
          manera remota.
          </div>
          <div>
          Mientras tanto, emprendí en marketing de afiliados, abrí una
          agencia B2B (Grovat) y cofundé WorksFound con mi socio Bruno. Nuestra
          misión en WorksFound es ayudar a mejorar la calidad de vida de las
          personas, facilitándoles el camino hacia nuevos empleos y
          asegurándoles el éxito.
          </div>
        </div>
      </div>
      <div className={styles.container2}>
      <div className={styles.foto}>
        <Image src={bruno} width={200} />
        <div>Bruno Hugenet CoFounder</div>
        </div>
        <div className={styles.datos}>
          <div>
          Inicié mi carrera a los 16 años, impulsado por el deseo de mejorar la
          situación económica de mi familia en Argentina. Estudié programación
          de forma autodidacta durante dos años, realizando múltiples cursos y
          acumulando diplomas sin un enfoque claro. A pesar de mis esfuerzos,
          enfrenté dificultades para encontrar orientación y apoyo en la
          industria.
          </div>
          <div> Descubrí el potencial de LinkedIn como herramienta de
          conexión y acceso a recursos que en ese momento no tenía. A pesar de
          trabajar en McDonald's y enfrentar numerosas desiluciones en mi
          carrera, persistí en mi búsqueda de oportunidades.  </div>
          <div> Más tarde, trabajé
          como SDR y fundé Stoic para ayudar a desarrolladores freelance a
          mejorar su situación económica. Esta experiencia me reveló que muchos
          buscaban estabilidad y un buen empleo, el sueño que se promete a los
          desarrolladores pero que pocos logran alcanzar.</div>
          <div>Junto a mi socio
          Dylan, decidimos crear WorksFound para combinar nuestros conocimientos
          y ofrecer una solución efectiva a la búsqueda de empleo. Nuestro
          objetivo es transformar la manera en que los profesionales encuentran
          estabilidad laboral y mejorar sus vidas, enfrentando la desesperación
          que a menudo acompaña la carrera profesional.
          </div>
        </div>
      </div>
    </div>
  );
}
