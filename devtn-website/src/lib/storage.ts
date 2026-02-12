import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");

export async function readJsonFile<T>(fileName: string, fallback: T): Promise<T> {
  try {
    const fullPath = path.join(dataDir, fileName);
    const raw = await readFile(fullPath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeJsonFile<T>(fileName: string, data: T): Promise<void> {
  await mkdir(dataDir, { recursive: true });
  const fullPath = path.join(dataDir, fileName);
  await writeFile(fullPath, JSON.stringify(data, null, 2), "utf-8");
}
