const oracledb = require("oracledb");
const express = require("express");

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const app = express();

async function fun() {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: "sys",
      password: "9083",
      connectString: "localhost/XE",
      // privilege: oracledb.SYSDBA
    });
    console.log("Connection success");

    // Your database operations go here
    



  } catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      try {
        // Release the connection
        // await connection.close();
        // console.log("Connection closed");
      } catch (error) {
        console.error("Error closing the connection:", error);
      }
    }
  }
}
fun();

app.get("/", async (req, res) => {
  try {
    res.send("Hello World");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
