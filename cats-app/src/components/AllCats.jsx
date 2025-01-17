import React, { useState, useEffect, useRef, useCallback } from 'react';
import CatCard from './CatCard';
import {Loader} from './Loader';

function AllCats({onImageClick}) {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Текущая страница
  const loadingRef = useRef(null); // Ref для элемента-индикатора загрузки

  const fetchCats = useCallback(async () => {
    try {
        setLoading(true); // Установить loading true перед запросом
        const response = await fetch(
            `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}`, {
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCats(prevCats => [...prevCats, ...data]); // Добавить новых котиков к старым
    } catch (error) {
        console.error('Error fetching cats:', error);
        setError(error);
    } finally {
        setLoading(false); // Установить loading false после завершения запроса
    }
}, [page]);

useEffect(() => {
    fetchCats();
}, [fetchCats]);

const handleObserver = useCallback((entries) => {
  const target = entries[0];
  if (target.isIntersecting && !loading) {
      setPage(prevPage => prevPage + 1);
  }
},[loading])

useEffect(() => {
  const observer = new IntersectionObserver(handleObserver);
  const currentLoadingRef = loadingRef.current; // Копируем значение ref

  if (currentLoadingRef)
    observer.observe(currentLoadingRef);

  return () => {
    if(currentLoadingRef) // Используем копию ref в cleanup
        observer.unobserve(currentLoadingRef)
  };
}, [handleObserver]);

  if (loading) {
    return (
    <div className='loading'>
      <Loader />
      <p>Loading images...</p>
    </div>
  )}
  if (error) {
    return <div className="loading">Error: {error.message}</div>;
  }

  return (
    <div className="cat-list">
      {cats.map((cat) => (
        <CatCard key={cat.id} cat={cat} onImageClick={onImageClick} />
      ))}
      <div ref={loadingRef}>
        {loading && <p className="loading">Loading...</p>}
      </div>
    </div>
  );
}

export default AllCats;
