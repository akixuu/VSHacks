const express = require("express");

const server = express();
server.all("/", (req, res) => {
    console.log("Express server running...")
    res.setHeader('Content-Type', 'text/html');
    res.sendFile("index.html");
})

function keepAlive() {
    server.listen(3000, () => {
        console.log("Server is ready.");
    })
}

module.exports = keepAlive;