import { Link } from "react-router-dom";
import { useRequests } from "../context/RequestsContext";
import { useDocks } from "../context/DocksContext";

export default function RequestsPage() {
  const { requests } = useRequests();
  const { state } = useDocks();

  function dockName(dockId: string) {
    if (state.status === "success") {
      const dock = state.docks.find((d) => d.id === dockId);
      if (dock) return dock.name + " (" + dock.id + ")";
    }
    return dockId;
  }

  return (
    <div>
      <h1>Demandes d'amarrage</h1>
      <p>{requests.length} demande(s)</p>
      <Link to="/requests/new" className="button-link">
        Nouvelle demande
      </Link>

      {requests.length === 0 ? (
        <p>
          Aucune demande pour le moment. <Link to="/requests/new">Créer une demande</Link>
        </p>
      ) : (
        <div className="grid">
          {requests.map((r) => (
            <article className="card" key={r.reference}>
              <h2>{r.reference}</h2>
              <p>Vaisseau : {r.shipName}</p>
              <p>Quai : {dockName(r.dockId)}</p>
              <p>Arrivée : {r.arrivalDate}</p>
              <p>Masse : {r.massTons} tonnes</p>
              <p>Statut : <strong>{r.status}</strong></p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}