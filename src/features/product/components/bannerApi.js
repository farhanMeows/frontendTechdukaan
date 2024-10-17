// src/api/bannerApi.js

export function fetchBanner() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/banners");
      if (!response.ok) {
        throw new Error("Failed to fetch banner");
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export function updateBanner(bannerData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/banners", {
        method: "POST",
        body: JSON.stringify(bannerData),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to update banner");
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}
