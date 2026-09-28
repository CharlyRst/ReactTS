import { useDocks } from "../context/DocksContext";

export default function DocksStatus() {
  const { state, retry } = useDocks();

  if (state.status === "loading") {
    return <p role="status">Chargement des quais…</p>;
  }
  if (state.status === "error") {
    return (
      <div role="alert" className="error-box">
        <p>Impossible de charger les quais : {state.message}</p>
        <button onClick={retry}>Réessayer</button>
      </div>
    );
  }
  return null;
}
