setTimeout(() => {
  setImmediate(() => {
    console.log(`setImmediate 1`);
  });
  setTimeout(() => {
    console.log(`setTimeout 1`);
  });
});
