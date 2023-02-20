setTimeout(() => {
  throw new Error("oops");
}, 300);

process.on("uncaughtException", () => {
  // handle error - synchronous
});

process.on("unhandledRejection", () => {
  // handle error - asynchronous
});
