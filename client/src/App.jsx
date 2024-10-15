import { useState } from 'react';
import SearchForm from './components/SearchForm';
import ResultsTable from './components/ResultsTable';
import './styles/App.css';

function App() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (searchType, keyword) => {
    setIsLoading(true);
    setError(null);
    try {
      const apiUrl = `/api/search?searchType=${encodeURIComponent(searchType)}&keyword=${encodeURIComponent(keyword)}`;
      console.log('Fetching from:', apiUrl);

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Data received:', data);

      // Handle different response structures
      let formattedResults = {};
      if (data.mahasiswa && data.mahasiswa.length > 0) {
        formattedResults.mahasiswa = data.mahasiswa;
      }
      if (data.dosen && data.dosen.length > 0) {
        formattedResults.dosen = data.dosen;
      }
      if (data.prodi && data.prodi.length > 0) {
        formattedResults.prodi = data.prodi;
      }
      if (data.pt && data.pt.length > 0) {
        formattedResults.perguruanTinggi = data.pt;
      }

      if (Object.keys(formattedResults).length === 0) {
        setError("Tidak ada hasil ditemukan.");
        setResults(null);
      } else {
        setResults(formattedResults);
      }
    } catch (err) {
      console.error('Error detail:', err);
      setError(`Error: ${err.message}`);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>PDDIKTI Data Explorer V1</h1>
        <p>oleh
          <a href="https://www.facebook.com/feyfry35" target='_blank' rel="noopener noreferrer"> feyDev</a>
        </p>
      </header>
      <main className="app-main">
        <SearchForm onSearch={handleSearch} />
        {isLoading && <div className="loader">Memuat data...</div>}
        {error && <p className="error">{error}</p>}
        {results && Object.entries(results).map(([category, items]) => (
          <ResultsTable key={category} results={{ [category]: items }} />
        ))}
      </main>
      <footer className="app-footer">
        <p>© 2024 PDDIKTI Data Explorer. Dibuat untuk tujuan pendidikan.</p>
      </footer>
    </div>
  );
}

export default App;