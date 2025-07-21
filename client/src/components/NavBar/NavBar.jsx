import React, { useState, useRef } from 'react';
import styles from './NavBar.module.css';

const categoriesByGroup = {
  Nature: ['forest', 'mountains', 'trees', 'rainforest', 'volcano', 'desert'],
  Water: ['river', 'waterfalls', 'lakes', 'beach', 'ocean'],
  Sky: ['sunset', 'sunrise', 'stars', 'sky', 'northern lights'],
  Cities: ['burano', 'murano', 'venice', 'cliffs', 'ice cave'],
  Special: ['wildlife', 'flowers', 'glacier', 'canyon', 'nature']
};

const Navbar = ({ onSelectCategory }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const handleBlur = (e) => {
    if (!menuRef.current.contains(e.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div
          className={styles.menuIcon}
          onClick={() => setOpen(!open)}
          tabIndex={0}
          onBlur={handleBlur}
        >
          <div className={styles.bar} />
          <div className={styles.bar} />
          <div className={styles.bar} />
        </div>
        <h1 className={styles.logo}>Pix Gallery</h1>
      </nav>

      {open && (
        <div
          ref={menuRef}
          className={styles.menuDropdown}
          tabIndex={-1}
          onBlur={handleBlur}
        >
          {Object.entries(categoriesByGroup).map(([group, cats]) => (
            <div key={group} className={styles.categoryColumn}>
              <h3 className={styles.categoryTitle}>{group}</h3>
              {cats.map((cat) => (
                <button
                  key={cat}
                  className={styles.menuItem}
                  onClick={() => {
                    onSelectCategory(cat);
                    setOpen(false);
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
