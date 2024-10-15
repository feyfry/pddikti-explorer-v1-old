import PropTypes from 'prop-types';
import '../styles/ResultsTable.css';

function ResultsTable({ results }) {
    if (!results || typeof results !== 'object' || Object.keys(results).length === 0) {
        return <p className="no-results">Tidak ada hasil ditemukan.</p>;
    }

    const category = Object.keys(results)[0];
    const items = results[category];

    if (!items || items.length === 0) {
        return <p className="no-results">Tidak ada hasil ditemukan untuk kategori {category}.</p>;
    }

    return (
        <div className="results-container">
            <h2>Hasil Pencarian {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className="results-grid">
                {items.map((item, index) => (
                    <div key={index} className="result-card">
                        <h3>{item.text.split(',')[0]}</h3>
                        {item.text.split(',').slice(1).map((info, i) => (
                            <p key={i}>{info.trim()}</p>
                        ))}
                        {item['website-link'] && (
                            <a href={`https://pddikti.kemdikbud.go.id${item['website-link']}`} target="_blank" rel="noopener noreferrer">
                                Lihat Detail
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

ResultsTable.propTypes = {
    results: PropTypes.object
};

export default ResultsTable;