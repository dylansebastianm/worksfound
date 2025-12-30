import { IoAlertCircleOutline } from "react-icons/io5"
import styles from "./AlternativePayments.module.css"

type AlternativePaymentAlertProps = {
  onAlternativePaymentClick?: () => void
}

export function AlternativePaymentAlert({
  onAlternativePaymentClick,
}: AlternativePaymentAlertProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <IoAlertCircleOutline className={styles.icon} />
        <p className={styles.text}>¿Tu país no está en la lista?</p>
      </div>
      <button
        type="button"
        className={styles.link}
        onClick={onAlternativePaymentClick}
      >
        Haz clic aquí para ver opciones de pago alternativas
      </button>
    </div>
  )
}

export default AlternativePaymentAlert
