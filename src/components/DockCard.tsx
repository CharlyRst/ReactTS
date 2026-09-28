import { Link } from "react-router-dom";
import type { Dock } from "../types/dock";

export function statusLabel(status: Dock["status"]) {
  return status === "available" ? "Disponible" : "Bloqué";
}

export function kindLabel(kind: Dock["kind"]) {
  switch (kind) {
    case "crew":
      return "Équipage";
    case "cargo":
      return "Cargo";
    case "service":
      return "Service";
  }
}

export default function DockCard({ dock }: { dock: Dock }) {
  return (
    <article className="card">
      <h2>
        <Link to={`/docks/${dock.id}`}>{dock.name}</Link>
      </h2>
      <p>Identifiant : {dock.id}</p>
      <p>Type : {kindLabel(dock.kind)}</p>
      <p>
        Statut : <strong className={"badge " + dock.status}>{statusLabel(dock.status)}</strong>
      </p>
      <p>
        Capacité :{" "}
        {dock.capacityTons === null ? "non renseignée" : `${dock.capacityTons} tonnes`}
      </p>
    </article>
  );
}
