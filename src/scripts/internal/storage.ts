export function saveKeyValuePair(key: string, value: any): void {
  chrome.storage.sync.set({ [key]: value });
}

export function retrieveValueByKey(key: string): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[key]);
      }
    });
  });
}
