import React, { useState, useEffect } from 'react';

function CatCard({ cat, onImageClick })  {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
       const storedFavorites = localStorage.getItem('favoriteCats');
       if(storedFavorites){
          const favIds = JSON.parse(storedFavorites).map(c => c.id);
          setIsFavorite(favIds.includes(cat.id))
       }
    }, [cat.id]);

    const toggleFavorite = (event) => {
      let currentFavorites = JSON.parse(localStorage.getItem('favoriteCats') || '[]');
      if (isFavorite) {
        currentFavorites = currentFavorites.filter(c => c.id !== cat.id)
      } else {
          currentFavorites.push(cat);
      }
      localStorage.setItem('favoriteCats', JSON.stringify(currentFavorites));
      event.stopPropagation();
      setIsFavorite(!isFavorite);
    }

    if (typeof onImageClick !== 'function') {
      console.error('onImageClick is not a function', onImageClick);
    } ///

  return (
    <div className="cat-card" onClick={() => onImageClick(cat.url)}>
      <img src={cat.url} alt="A cute cat"  />
      <button 
        onClick={toggleFavorite}
        className={isFavorite ? 'favorite' : 'not-favorite'} 
        title={isFavorite ? "Dislike 💩😿" : "Like! ❤😽"}  
      />
      
    </div>
  );
}

export default CatCard;