export interface LocalStorage {
  cities?: string[];
}

export type LocalStorageKeys = keyof LocalStorage;

export function setStoredCities(cities: string[]): Promise<void> {
  const vals: LocalStorage = {
    cities,
  };
  return new Promise((resolved) => {
    chrome.storage.local.set(vals, () => {
      resolved();
    });
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ["cities"];
  return new Promise((resolved) => {
    chrome.storage.local.get(["cities"], (res: LocalStorage) => {
      resolved(res.cities ?? []);
    });
  });
}
