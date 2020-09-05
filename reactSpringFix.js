const replace = require('replace-in-file');

(async () => {
  try {
    await replace({
      files: "node_modules/@react-spring/*/package.json",
      from: `"sideEffects": false`,
      to: `"sideEffects": true`
    });
  } catch (e) {
    console.log('error while trying to remove string "sideEffects:false" from react-spring packages', e);
  }
})();