setTimeout(() => {
  setImmediate(() => {
    console.log(`setImmediate 1`);
    const f2 = new Promise((resolve) => {
      resolve();
    });
    f2.then(() => {
      console.log(`promise 2`);
    });
  });
  setTimeout(() => {
    console.log(`setTimeout 1`);
    const f3 = new Promise((resolve) => {
      resolve();
    });
    f3.then(() => {
      console.log(`promise 3`);
    });
  });
  const f1 = new Promise((resolve) => {
    resolve();
  });
  f1.then(() => {
    console.log(`promise 1`);
  });
});
