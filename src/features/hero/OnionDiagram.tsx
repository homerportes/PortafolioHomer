import styles from './OnionDiagram.module.css';

/**
 * The architecture Homer reaches for across Finevo, RealEstate and Artemis,
 * drawn from the inside out. It is the literal picture of the thesis: the
 * dependency arrow only ever points inward, toward the domain.
 */
export function OnionDiagram() {
  return (
    <figure className={styles.figure}>
      <div className={styles.rings} aria-hidden="true">
        <div className={`${styles.ring} ${styles.r4}`}>
          <span className={`meta ${styles.ringLabel}`}>API · JWT / OAuth</span>
        </div>
        <div className={`${styles.ring} ${styles.r3}`}>
          <span className={`meta ${styles.ringLabel}`}>Infrastructure · EF Core</span>
        </div>
        <div className={`${styles.ring} ${styles.r2}`}>
          <span className={`meta ${styles.ringLabel}`}>Application · CQRS</span>
        </div>
        <div className={`${styles.ring} ${styles.r1}`}>
          <span className={styles.core}>Domain</span>
        </div>
        <span className={styles.arrow} />
      </div>
      <figcaption className={styles.caption}>
        <span className="label">Onion architecture</span>
        <span className={styles.captionText}>
          Dependencies point inward. The domain knows nothing about the database or the wire.
        </span>
      </figcaption>
    </figure>
  );
}
