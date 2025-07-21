import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../config/axios';

import {
  nextPage,
  prevPage,
  fetchImagesStart,
  fetchImagesSuccess,
  fetchImagesFailure,
  setSort
} from '../../redux/imageSlice';

import ImageCard from '../../components/Card/ImageCard';
import Modal from '../../components/Modal/Modal';

import styles from './image.module.css';

const Images = () => {
  const dispatch = useDispatch();
  const { items, category, page, status, error, sort } = useSelector(state => state.images);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchImagesStart());
      try {
        const res = await api.get('/images', {
          params: { category, page, sort, order: 'desc' }
        });
        const data = res.data.hits;
        dispatch(fetchImagesSuccess(data));
      } catch (err) {
        dispatch(fetchImagesFailure(err.message));
      }
    };

    if (category && page) {
      fetchData();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [category, page, sort, dispatch]);

  const handleSortChange = (e) => {
    dispatch(setSort({ sort: e.target.value, order: 'desc' }));
  };

  return (
    <>
      <div className={styles.sortBar}>
        <label htmlFor="sort-select" className={styles.sortLabel}>מיין לפי:</label>
        <select
          id="sort-select"
          value={sort}
          onChange={handleSortChange}
          className={styles.sortSelect}
        >
          <option value="views">views</option>
          <option value="id">id</option>
          <option value="downloads">downloads</option>
        </select>
      </div>

      {status === 'loading' && <div className={styles.loading}>טוען...</div>}
      {error && <div className={styles.error}>שגיאה: {error}</div>}

      <div className={styles['gallery-grid']}>
        {items.map(img => (
          <ImageCard key={img.id || img.previewURL} image={img} onClick={setSelectedImage} />
        ))}
      </div>

      {items.length > 0 && (
  <div className={styles.controls}>
    <button className={styles.btn} onClick={() => dispatch(prevPage())} disabled={page === 1}>
      הקודם
    </button>
    <span className={styles['page-indicator']}>עמוד: {page}</span>
    <button className={styles.btn} onClick={() => dispatch(nextPage())}>
      הבא
    </button>
  </div>
)}

      <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
};

export default Images;
