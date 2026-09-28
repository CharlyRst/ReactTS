import type { Dock } from "../types/dock";
import { adaptDocks } from "./adaptDock";

export async function getDocks(signal?: AbortSignal): Promise<Dock[]> {
  const response = await fetch("/api/docks.json", { signal });
  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }
  const data: unknown = await response.json();
  return adaptDocks(data);
}
