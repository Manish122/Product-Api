const app = require("./app");
const dotenv = require("dotenv");
// Config
const connectDatabase = require("./config/database");
require('dotenv').config();

//Handling Uncaught Exception
process.on("uncaughtException" , (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down due to unhandled Promise Rejection`);
    process.exit(1);
})
// console.log(manish);

//Connecting to database
connectDatabase();
const server = app.listen(process.env.port,() => {
    console.log(`port is running at ${process.env.port}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection" , (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down due to unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});
