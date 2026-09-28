import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page introuvable</h1>
      <p>Cette page n'existe pas sur la station Atlas.</p>
      <Link to="/docks">Aller aux quais</Link>
    </div>
  );
}
