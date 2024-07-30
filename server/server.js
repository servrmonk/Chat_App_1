require("dotenv").config();

const app = require("./app");
const db = require("./src/config/db");
const port = process.env.PORT_NO;

db.sync()
  .then(() => {
    console.log("All the table synced successfully");
    app.listen(port, () => {
      console.log("App started on port ", port);
    });
  })
  .catch((err) => console.log("Error in syncing the tables "));
