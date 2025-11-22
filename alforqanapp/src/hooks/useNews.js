import { useEffect, useState } from 'react';
import { getNewsList } from '../services/newsService';

export function useNews() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    setNews(getNewsList());
  }, []);

  return news;
}

export default useNews;
