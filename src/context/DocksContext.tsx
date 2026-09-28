import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Dock } from "../types/dock";
import { getDocks } from "../services/docks";

export type DocksState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; docks: Dock[] };

interface DocksContextValue {
  state: DocksState;
  retry: () => void;
}

const DocksContext = createContext<DocksContextValue | null>(null);

export function DocksProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DocksState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    setState({ status: "loading" });

    getDocks()
      .then((docks) => {
        setState({ status: "success", docks });
      })
      .catch((error) => {
        if (error instanceof Error) {
          setState({ status: "error", message: error.message });
        } else {
          setState({ status: "error", message: "Erreur inconnue" });
        }
      });
  }, [attempt]);

  function retry() {
    setAttempt(attempt + 1);
  }

  return (
    <DocksContext.Provider value={{ state, retry }}>
      {children}
    </DocksContext.Provider>
  );
}

export function useDocks() {
  const context = useContext(DocksContext);
  if (!context) {
    throw new Error("useDocks doit etre dans DocksProvider");
  }
  return context;
}