import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDocks } from "../context/DocksContext";
import { useRequests } from "../context/RequestsContext";
import { statusLabel } from "../components/DockCard";
import DocksStatus from "../components/DocksStatus";

type FieldName = "reference" | "shipName" | "dockId" | "arrivalDate" | "massTons";
type FormErrors = Partial<Record<FieldName, string>>;

const FIELD_ORDER: FieldName[] = ["reference", "shipName", "dockId", "arrivalDate", "massTons"];

function todayString() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export default function NewRequestPage() {
  const { state } = useDocks();
  const { requests, dispatch } = useRequests();
  const navigate = useNavigate();

  const [reference, setReference] = useState("");
  const [shipName, setShipName] = useState("");
  const [dockId, setDockId] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [massTons, setMassTons] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const docks = state.status === "success" ? state.docks : [];
  const selectedDock = docks.find((d) => d.id === dockId);

  function validate(): FormErrors {
    const result: FormErrors = {};

    if (!/^AT-\d{4}$/.test(reference)) {
      result.reference = "La référence doit être au format AT- suivi de 4 chiffres (ex. AT-2401).";
    } else if (requests.some((r) => r.reference === reference)) {
      result.reference = "Cette référence existe déjà dans la session.";
    }

    if (shipName.trim() === "") {
      result.shipName = "Le nom du vaisseau est obligatoire.";
    }

    if (dockId === "" || !selectedDock) {
      result.dockId = "Choisissez un quai existant.";
    } else if (selectedDock.status !== "available") {
      result.dockId = "Ce quai est bloqué, choisissez un quai disponible.";
    }

    if (arrivalDate === "") {
      result.arrivalDate = "La date d'arrivée est obligatoire.";
    } else if (arrivalDate <= todayString()) {
      result.arrivalDate = "La date d'arrivée doit être dans le futur.";
    }

    const mass = Number(massTons.replace(",", "."));
    if (massTons.trim() === "" || Number.isNaN(mass) || mass <= 0) {
      result.massTons = "La masse doit être un nombre positif (en tonnes).";
    } else if (selectedDock && selectedDock.capacityTons !== null && mass > selectedDock.capacityTons) {
      result.massTons = `La masse dépasse la capacité du quai (${selectedDock.capacityTons} t).`;
    } else if (selectedDock && selectedDock.capacityTons === null) {
      result.massTons = "La capacité de ce quai est inconnue, impossible de valider.";
    }

    return result;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    const firstInvalid = FIELD_ORDER.find((name) => newErrors[name]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    dispatch({
      type: "request/created",
      request: {
        reference,
        shipName: shipName.trim(),
        dockId,
        arrivalDate,
        massTons: Number(massTons.replace(",", ".")),
        status: "requested",
      },
    });
    navigate("/requests");
  }

  return (
    <div>
      <Link to="/requests">Retour aux demandes</Link>
      <h1>Nouvelle demande d'amarrage</h1>
      <p>Remplissez tous les champs puis enregistrez la demande.</p>
      <DocksStatus />

      <div className="two-cols">
        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="reference">Référence</label>
            <input
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="AT-2401"
              aria-invalid={errors.reference ? true : undefined}
              aria-describedby={errors.reference ? "reference-error" : undefined}
            />
            {errors.reference && <p id="reference-error" className="error">{errors.reference}</p>}
          </div>

          <div className="field">
            <label htmlFor="shipName">Nom du vaisseau</label>
            <input
              id="shipName"
              value={shipName}
              onChange={(e) => setShipName(e.target.value)}
              aria-invalid={errors.shipName ? true : undefined}
              aria-describedby={errors.shipName ? "shipName-error" : undefined}
            />
            {errors.shipName && <p id="shipName-error" className="error">{errors.shipName}</p>}
          </div>

          <div className="field">
            <label htmlFor="dockId">Quai</label>
            <select
              id="dockId"
              value={dockId}
              onChange={(e) => setDockId(e.target.value)}
              aria-invalid={errors.dockId ? true : undefined}
              aria-describedby={errors.dockId ? "dockId-error" : undefined}
            >
              <option value="">-- Choisir un quai --</option>
              {docks.map((dock) => (
                <option key={dock.id} value={dock.id}>
                  {dock.name} ({dock.id}) - {statusLabel(dock.status)}
                </option>
              ))}
            </select>
            {errors.dockId && <p id="dockId-error" className="error">{errors.dockId}</p>}
          </div>

          <div className="field">
            <label htmlFor="arrivalDate">Date d'arrivée</label>
            <input
              id="arrivalDate"
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              aria-invalid={errors.arrivalDate ? true : undefined}
              aria-describedby={errors.arrivalDate ? "arrivalDate-error" : undefined}
            />
            {errors.arrivalDate && <p id="arrivalDate-error" className="error">{errors.arrivalDate}</p>}
          </div>

          <div className="field">
            <label htmlFor="massTons">Masse (tonnes)</label>
            <input
              id="massTons"
              value={massTons}
              onChange={(e) => setMassTons(e.target.value)}
              inputMode="decimal"
              aria-invalid={errors.massTons ? true : undefined}
              aria-describedby={errors.massTons ? "massTons-error" : undefined}
            />
            {errors.massTons && <p id="massTons-error" className="error">{errors.massTons}</p>}
          </div>

          <button type="submit">Enregistrer la demande</button>
        </form>

        <aside className="card">
          <h2>Aperçu</h2>
          <p>Référence : {reference || "—"}</p>
          <p>Vaisseau : {shipName || "—"}</p>
          <p>Quai : {selectedDock ? `${selectedDock.name} (${selectedDock.id})` : "—"}</p>
          <p>Arrivée : {arrivalDate || "—"}</p>
          <p>Masse : {massTons ? `${massTons} t` : "—"}</p>
        </aside>
      </div>
    </div>
  );
}
