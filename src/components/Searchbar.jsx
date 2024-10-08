const Searchbar = ({ setQuery, setCategoria, setActivateSearch }) => {
  const categorias = [
    'Retro',
    'Clasico',
    'Reggae',
    'Softwares',
    'Cinema',
    '+18',
  ];
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="pesquisar fotos..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => setActivateSearch(true)}> Pesquisar</button>
      <select
        onChange={(e) => {
          setCategoria(e.target.value);
          setActivateSearch(true);
        }}
      >
        {categorias.map((categoria) => (
          <option key={categoria} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Searchbar;
