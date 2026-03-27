import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import ArtistCard from "../components/ArtistCard";
import "./Home.css";
import banner from "../assets/banner.png";

export default function Home() {
  const [artists, setArtists] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchArtists = () => {
      fetch("http://localhost:8080/usuarios")
        .then((res) => res.json())
        .then((data) => setArtists(data))
        .catch((err) => console.error(err));
    };

    fetchArtists(); 

    const interval = setInterval(fetchArtists, 5000); // 5 segundos

    return () => clearInterval(interval);
  }, []);

 const filteredArtists = artists.filter(
  (artist) =>
    artist.role.toUpperCase() === "ARTISTA" && 
    artist.nome &&
    artist.nome.toLowerCase().includes(search.toLowerCase())
);

  return (
    <>
      <Navbar />

      <main className="home">
        <div className="hero">
          <img src={banner} alt="Gallery" className="hero-img" />
        </div>

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <div className="cards">
          {filteredArtists.length === 0 ? (
            <p className="no-results">Nenhum artista encontrado</p>
          ) : (
            filteredArtists.map((artist) => (
              <ArtistCard
                key={artist.id}
                name={artist.nome}
                photo={artist.fotoUrl}
              />
            ))
          )}

        </div>
      </main>
    </>
  );
}
