const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
require('dotenv').config()

//middlewares
app.use(express.json())

//Socket Handler
const SocketHandler = require('./socket/events')
SocketHandler(httpServer)

//importing database instance
require('./database')


httpServer.listen(process.env.PORT || 5000, () => {
    console.log("connected To server on port 5000")
})