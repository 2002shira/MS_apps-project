import React from 'react';
import styles from './image.module.css';

const ImageCard = (props) => {
  const { image, onClick } = props
  return (
    <div className={styles.imageCard} onClick={() => onClick(image)}>
      <img src={image.webformatURL} alt={image.tags} />
    </div>
  );
}

export default ImageCard;
