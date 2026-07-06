const kill = require("kill-port");

const port = 3000;

kill(port)
  .then(() => {
    console.log(`Port ${port} is free.`);
  })
  .catch(() => {
    console.log(`Port ${port} was not in use.`);
  });
