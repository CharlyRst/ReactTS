import { useState } from "react";
import { useDocks } from "../context/DocksContext";
import DockCard from "../components/DockCard";
import DocksStatus from "../components/DocksStatus";

type StatusFilter = "all" | "available" | "blocked";

export default function DocksPage() {
  const { state } = useDocks();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<StatusFilter>("all");

  function reset() {
    setSearch("");
    setFilter("all");
  }

  const docks = state.status === "success" ? state.docks : [];

  const visibleDocks = docks.filter((dock) => {
    const matchName = dock.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchStatus = filter === "all" || dock.status === filter;
    return matchName && matchStatus;
  });

  return (
    <div>
      <h1>Quais d'amarrage</h1>
      <p>Consultez la disponibilité des quais de la station.</p>
      {state.status === "success" && (
        <p aria-live="polite">{visibleDocks.length} résultat(s)</p>
      )}

      <div className="controls">
        <label>
          Recherche
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Nom du quai"
          />
        </label>
        <label>
          Statut
          <select value={filter} onChange={(e) => setFilter(e.target.value as StatusFilter)}>
            <option value="all">Tous</option>
            <option value="available">Disponible</option>
            <option value="blocked">Bloqué</option>
          </select>
        </label>
        <button type="button" onClick={reset}>
          Réinitialiser
        </button>
      </div>

      <DocksStatus />

      {state.status === "success" && docks.length === 0 && (
        <p>Aucun quai disponible dans le manifeste</p>
      )}

      {state.status === "success" && docks.length > 0 && visibleDocks.length === 0 && (
        <div>
          <p>Aucun quai ne correspond à votre recherche</p>
          <button type="button" onClick={reset}>
            Réinitialiser
          </button>
        </div>
      )}

      <div className="grid">
        {visibleDocks.map((dock) => (
          <DockCard key={dock.id} dock={dock} />
        ))}
      </div>
    </div>
  );
}
