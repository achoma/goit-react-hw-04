import { BiSolidErrorAlt } from "react-icons/bi";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ errorDetails }) => {
  return (
    <div className={styles.errorContainer}>
      <BiSolidErrorAlt className={styles.errorIcon} />
      <p className={styles.errorText}>
        {errorDetails || "Something went wrong, please reload your page!"}{" "}
        {/* Sszczegóły błędu, jeśli są dostępne */}
      </p>
    </div>
  );
};

export default ErrorMessage;
