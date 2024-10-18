import { atom } from "recoil";

// Atom for tracking whether a category is selected (true/false)
export const isCategorySelectedAtom = atom({
  key: "isCategorySelected", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (initially no category is selected)
});

// Atom for storing the selected category value (e.g., "Laptops", "Smartphones")
export const selectedCategoryAtom = atom({
  key: "selectedCategory", // unique ID
  default: "", // default value (initially no category is selected)
});

// Atom for storing the selected category ID
export const selectedCategoryIdAtom = atom({
  key: "selectedCategoryId", // unique ID
  default: null, // default value (initially no category ID is selected)
});
export const filterAtom = atom({
  key: "filterAtom", // unique ID
  default: {}, // default value (initially no category ID is selected)
});
