import type { Dock, DockDTO } from "../types/dock";

function isDockDTO(value: any): value is DockDTO {
  if (typeof value !== "object" || value === null) return false;

  return (
    typeof value.dock_id === "string" &&
    typeof value.label === "string" &&
    (value.kind === "crew" || value.kind === "cargo" || value.kind === "service") &&
    (value.state === "OPEN" || value.state === "BLOCKED")
  );
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && value >= 0) {
    return value;
  }
  return null;
}

function toCapacity(value: unknown): number | null {
  const n = toNumber(value);
  if (n === 0) {
    return null;
  }
  return n;
}

function toText(value: unknown): string | null {
  if (typeof value === "string" && value.trim() !== "") {
    return value;
  }
  return null;
}

export function adaptDock(dto: DockDTO): Dock {
  let status: "available" | "blocked" = "blocked";
  if (dto.state === "OPEN") {
    status = "available";
  }

  const base = {
    id: dto.dock_id,
    name: dto.label,
    status: status,
    capacityTons: toCapacity(dto.limit_tons),
  };

  switch (dto.kind) {
    case "crew":
      return { ...base, kind: "crew", maxPeople: toNumber(dto.max_people) };
    case "cargo":
      return { ...base, kind: "cargo", craneCount: toNumber(dto.crane_count) };
    case "service":
      return { ...base, kind: "service", toolStation: toText(dto.tool_station) };
  }
}

export function adaptDocks(data: unknown): Dock[] {
  if (!Array.isArray(data)) {
    throw new Error("Le manifeste n'est pas un tableau");
  }

  return data.map((item) => {
    if (!isDockDTO(item)) {
      throw new Error("Un quai du manifeste est inexploitable");
    }
    return adaptDock(item);
  });
}