import Searchbar from './components/Searchbar';
import FotoList from './components/FotoList';
import FotoAmpliada from './components/FotoAmpliada';

import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fotos, setFotos] = useState([]);
  const [fotoAmpliada, setFotoAmpliada] = useState(null);
  const [activateSearch, setActivateSearch] = useState(false);

  const fetchData = async ({ query, categoria }) => {
    try {
      const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;

      if (query || categoria) {
        let searchQuery = query;

        if (query && categoria) {
          searchQuery = `${query} ${categoria}`;
        } else if (categoria) {
          searchQuery = categoria;
        }

        const response = await axios.get(
          'https://api.unsplash.com/search/photos',
          {
            params: {
              client_id: apiKey,
              query: searchQuery,
            },
          }
        );

        setFotos(response.data.results);
        return;
      }

      // Se não houver query ou categoria, busca 10 fotos aleatórias
      const response = await axios.get(
        'https://api.unsplash.com/photos/random',
        {
          params: {
            client_id: apiKey,
            count: 10,
          },
        }
      );

      setFotos(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados: ', error);
    }
  };
  useEffect(() => {
    fetchData(query, categoria);
  }, []);

  useEffect(() => {
    if (activateSearch) {
      fetchData({ query, categoria });
      setActivateSearch(false);
    }
  }, [activateSearch]);

  return (
    <div className="container">
      <Searchbar
        setQuery={setQuery}
        setCategoria={setCategoria}
        setActivateSearch={setActivateSearch}
      />
      <FotoList fotos={fotos} setFotoAmpliada={setFotoAmpliada} />
      {fotoAmpliada && (
        <FotoAmpliada foto={fotoAmpliada} setFotoAmpliada={setFotoAmpliada} />
      )}
    </div>
  );
}

export default App;
