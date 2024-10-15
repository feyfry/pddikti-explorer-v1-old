import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/SearchForm.css';

function SearchForm({ onSearch }) {
    const [searchType, setSearchType] = useState('semua');
    const [keyword, setKeyword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchType, keyword);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="search-select"
            >
                <option value="semua">Semua</option>
                <option value="mahasiswa">Mahasiswa</option>
            </select>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Masukkan kata kunci pencarian"
                required
                className="search-input"
            />
            <button type="submit" className="search-button">Cari</button>
        </form>
    );
}

SearchForm.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchForm;