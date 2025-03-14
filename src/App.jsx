import React, { useState, useRef, useEffect } from 'react';
import AllCats from './components/AllCats';
import FavoriteCats from './components/FavoriteCats';
import './App.css';
import musicFile from './music/meow-meow.mp3';
import Modal from './components/Modal';

function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [hasMusic, setHasMusic] = useState(false);
  const [theme, setTheme] = useState('Light');
  const [modalImage, setModalImage] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => { // Воспроизведение аудио
    if(hasMusic) {
      if(!audioRef.current)
      {
        audioRef.current = new Audio(musicFile);
        audioRef.current.loop = true;
      }
      audioRef.current.play();
    }
    else {
      if(audioRef.current){
        audioRef.current.pause();
      }
    }
    return () => {
      if(audioRef.current) {
        audioRef.current.pause();
      }  
    };
  }, [hasMusic]);

  const handleThemeToggle = () => { // Смена темы
    setTheme(theme === 'Light' ? 'Dark' : 'Light');
  };
  const toggleMusic = () => {
    setHasMusic(!hasMusic);
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
};
  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className={`app ${theme === 'Dark' ? 'Dark' : ''}`}>
      <header className={`${theme}`} >
        <div className="header-container">
          <div className="navigation">
            <nav>
              <button
                className={`${activeTab === 'all' ? 'active' : ''} ${theme}`}
                onClick={() => setActiveTab('all')}
              >
                All Cats
              </button>

              <button
                className={`${activeTab === 'favorites' ? 'active' : ''} ${theme}`}
                onClick={() => setActiveTab('favorites')}
              >
                Favorite Cats
              </button>
            </nav>
          </div>

          <div className="settings">
              <div className="music">
                <button
                  onClick={toggleMusic}
                  className={hasMusic ? 'play' : 'pause'}
              />
            </div>
              <div className="toggle-container">
                  <div className="change-text"> {theme} mode </div>
                  <div>
                      <label className="switch">
                          <input type="checkbox" checked={theme === 'Dark'} onChange={handleThemeToggle} />
                          <span className="slider round"></span>
                      </label>
                  </div>
              </div>
          </div>
        </div>
      </header>
      <main>
        {activeTab === 'all' ? (
          <AllCats onImageClick={handleImageClick} />
        ) : (
          <FavoriteCats onImageClick={handleImageClick} />
        )}
      </main>

      {modalImage && <Modal imageUrl={modalImage} onClose={closeModal} />}
    </div>
  );
}

export default App;