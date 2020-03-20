const log = (...args) => {
  console.log(`[${new Date().toUTCString()}]`, ...args);
};

export default { log };
