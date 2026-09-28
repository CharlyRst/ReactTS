import { Link, useParams } from "react-router-dom";
import { useDocks } from "../context/DocksContext";
import DocksStatus from "../components/DocksStatus";
import { kindLabel, statusLabel } from "../components/DockCard";
import type { Dock } from "../types/dock";

function specificInfo(dock: Dock) {
  switch (dock.kind) {
    case "crew":
      return dock.maxPeople === null
        ? "Nombre de personnes maximum : donnée absente ou invalide"
        : `Nombre de personnes maximum : ${dock.maxPeople}`;
    case "cargo":
      return dock.craneCount === null
        ? "Nombre de grues : donnée absente ou invalide"
        : `Nombre de grues : ${dock.craneCount}`;
    case "service":
      return dock.toolStation === null
        ? "Poste d'outillage : donnée absente ou invalide"
        : `Poste d'outillage : ${dock.toolStation}`;
  }
}

export default function DockDetailPage() {
  const { dockId } = useParams<{ dockId: string }>();
  const { state } = useDocks();

  if (state.status !== "success") {
    return (
      <div>
        <h1>Fiche du quai</h1>
        <DocksStatus />
      </div>
    );
  }

  const dock = state.docks.find((d) => d.id === dockId);

  if (!dock) {
    return (
      <div>
        <h1>Quai introuvable</h1>
        <p>Aucun quai ne porte l'identifiant « {dockId} ».</p>
        <Link to="/docks">Retour aux quais</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/docks">Retour aux quais</Link>
      <h1>{dock.name}</h1>
      <p className={"badge " + dock.status}>{statusLabel(dock.status)}</p>

      <div className="two-cols">
        <section className="card">
          <h2>Identité</h2>
          <p>Identifiant : {dock.id}</p>
          <p>Type : {kindLabel(dock.kind)}</p>
          <p>Statut : {statusLabel(dock.status)}</p>
        </section>
        <section className="card">
          <h2>Contraintes</h2>
          <p>
            Capacité :{" "}
            {dock.capacityTons === null
              ? "donnée absente ou invalide"
              : `${dock.capacityTons} tonnes`}
          </p>
          <p>{specificInfo(dock)}</p>
        </section>
      </div>
    </div>
  );
}
