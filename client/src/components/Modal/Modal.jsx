import React, { useState, useEffect } from 'react';
import styles from './modal.module.css';

const Modal = (props) => {
  const { image, onClose } = props;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
  }, [image]);

  if (!image) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.content}>
        {!isImageLoaded && <p className={styles.loading}>Loading image details...</p>}
        <img
          src={image.largeImageURL}
          alt={image.tags}
          className={isImageLoaded ? styles.image : styles.hiddenImage}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
        />
        {isImageLoaded && (
          <div className={styles.details}>
             <p><b>ID:</b> {image.id}</p>
            <p><b>Views:</b> {image.views}</p>
            <p><b>Downloads:</b> {image.downloads}</p>
            <p><b>Collections:</b> {image.collections}</p>
            <p><b>Tags:</b> {image.tags}</p>
          </div>
        )}
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
}

export default Modal;
