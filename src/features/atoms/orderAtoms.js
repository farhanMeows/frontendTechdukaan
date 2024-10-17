import { atom } from "recoil";

export const orderState = atom({
  key: "orderState", // Unique ID for this atom
  default: null, // Default state can be null or an empty object
});
