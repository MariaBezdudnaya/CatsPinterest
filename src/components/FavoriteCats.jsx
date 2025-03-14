import { useState, useEffect } from 'react';
import CatCard from './CatCard';

function FavoriteCats({onImageClick}) {
  const [favoriteCats, setFavoriteCats] = useState([]);

  useEffect(() => {
      const storedFavorites = localStorage.getItem('favoriteCats');
      if(storedFavorites)
        setFavoriteCats(JSON.parse(storedFavorites));
  }, []);

  return (
    <div id='favorite' className="cat-list">
      {favoriteCats.length > 0 ? (
        favoriteCats.map((cat) => (
          <CatCard key={cat.id} cat={cat} onImageClick={onImageClick} />
         ))
      ) : (
         <p>No favorite cats yet...</p>
      )}
    </div>
  );
};

export default FavoriteCats;