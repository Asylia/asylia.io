/**
 * Retrieves and parses a value from localStorage by key.
 *
 * @template T - The expected type of the parsed value.
 * @param key - The localStorage key to retrieve.
 * @returns The parsed value if present and valid, or null otherwise.
 */
export const getItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error parsing item from localStorage for key "${key}":`, error);
      return null;
    }
  }
  return null;
};

/**
 * Serializes and stores a value in localStorage under the specified key.
 *
 * @template T - The type of value to store (should be JSON-serializable).
 * @param key - The localStorage key to set.
 * @param value - The value to serialize and store.
 */
export const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item in localStorage for key "${key}":`, error);
  }
};

/**
 * Removes a value from localStorage by key.
 *
 * @param key - The localStorage key to remove.
 */
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage for key "${key}":`, error);
  }
};

/**
 * Checks if a key exists in localStorage.
 *
 * @param key - The localStorage key to check.
 * @returns True if the key exists, false otherwise.
 */
export const hasItem = (key: string): boolean => {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Error checking item in localStorage for key "${key}":`, error);
    return false;
  }
};

/**
 * Clears all entries from localStorage.
 */
export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
