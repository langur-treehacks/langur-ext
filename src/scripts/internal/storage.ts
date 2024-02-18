export function saveKeyValuePair(key: string, value: any): void {
  chrome.storage.sync.set({ [key]: value });
}

export async function retrieveValueByKey(key: string): Promise<any> {
  try {
    const result = await chrome.storage.sync.get([key]);
    if (chrome.runtime.lastError) {
      throw chrome.runtime.lastError;
    }
    return result[key];
  } catch (err) {
    console.error(err);
    return null;
  }
}
