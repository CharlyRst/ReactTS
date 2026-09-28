import type { DockingRequest, RequestAction } from "../types/request";

export type RequestsState = DockingRequest[];

export function requestsReducer(
  state: RequestsState,
  action: RequestAction,
): RequestsState {
  if (action.type === "request/created") {
    const existe = state.find((r) => r.reference === action.request.reference);
    if (existe) {
      return state;
    }
    return [...state, { ...action.request, status: "requested" }];
  }

  return state;
}