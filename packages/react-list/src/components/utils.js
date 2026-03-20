export const deepEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;

  if (obj1 == null || obj2 == null) return obj1 === obj2;

  if (typeof obj1 !== "object" || typeof obj2 !== "object")
    return obj1 === obj2;

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) return false;
    }
    return true;
  }

  if (Array.isArray(obj1) || Array.isArray(obj2)) return false;

  const keys1 = Object.keys(obj1).filter((key) => obj1[key] !== undefined);
  const keys2 = Object.keys(obj2).filter((key) => obj2[key] !== undefined);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
};

export const hasActiveFilters = (currentFilters, initialFilters) => {
  if (!initialFilters || Object.keys(initialFilters).length === 0) {
    return currentFilters && Object.keys(currentFilters).length > 0;
  }

  if (!currentFilters || Object.keys(currentFilters).length === 0) {
    return false;
  }

  return !deepEqual(currentFilters, initialFilters);
};
