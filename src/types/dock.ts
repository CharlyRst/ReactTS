export type DockKind = "crew" | "cargo" | "service";
export type DockStatus = "available" | "blocked";

export interface DockDTO {
  dock_id: string;
  label: string;
  kind: DockKind;
  state: "OPEN" | "BLOCKED";
  limit_tons?: unknown;
  max_people?: unknown;
  crane_count?: unknown;
  tool_station?: unknown;
}

interface DockBase {
  readonly id: string;
  name: string;
  status: DockStatus;
  capacityTons: number | null;
}

export type Dock =
  | (DockBase & { kind: "crew"; maxPeople: number | null })
  | (DockBase & { kind: "cargo"; craneCount: number | null })
  | (DockBase & { kind: "service"; toolStation: string | null });
