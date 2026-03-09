import '../components/ArtistCard.css'

export default function ArtistCard({ name, photo }) {
  return (
    <div className="artist-card">
      <img src={`/${photo}`} alt={name} className="artist-photo" />

      <div className="artist-name-box">
        <span>{name}</span>
      </div>
    </div>
  );
}
