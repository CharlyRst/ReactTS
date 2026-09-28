export type RequestStatus = "requested" | "authorized" | "docked";

export interface DockingRequest {
  readonly reference: string;
  shipName: string;
  dockId: string;
  arrivalDate: string;
  massTons: number;
  status: RequestStatus;
}

export type RequestAction = { type: "request/created"; request: DockingRequest }
