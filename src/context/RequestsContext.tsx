import { createContext, useContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";
import { requestsReducer } from "../state/requestsReducer";
import type { RequestsState } from "../state/requestsReducer";
import type { RequestAction } from "../types/request";

interface RequestsContextValue {
  requests: RequestsState;
  dispatch: Dispatch<RequestAction>;
}

const RequestsContext = createContext<RequestsContextValue | null>(null);

export function RequestsProvider({ children }: { children: ReactNode }) {
  const [requests, dispatch] = useReducer(requestsReducer, []);

  return (
    <RequestsContext.Provider value={{ requests, dispatch }}>
      {children}
    </RequestsContext.Provider>
  );
}

export function useRequests() {
  const context = useContext(RequestsContext);
  if (!context) {
    throw new Error("useRequests doit etre dans RequestsProvider");
  }
  return context;
}