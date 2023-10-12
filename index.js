// require your server and launch it
const server = require('./api/server');


const port = 9000;

server.listen(port, () => {
    console.log(`\n ***SERVER RUNNING AT http://localhost:${port}*** \n`);
})