const listeners = new Set();

export const tokenEvents = {
  subscribe(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
  },

  notify() {
    listeners.forEach(callback => callback());
  }
};