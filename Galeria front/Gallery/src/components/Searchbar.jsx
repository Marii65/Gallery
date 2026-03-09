import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Serchbar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-wrapper">
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar artistas"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input"
        />

        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="search-icon"
        />
      </div>
    </div>
  );
}
