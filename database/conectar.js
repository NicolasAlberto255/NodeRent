const oracledb = require('oracledb');


async function run() {
  try {
    connection = await oracledb.startup({
        user: process.env.user,
        password: process.env.password,
        connectionString: process.env.connectString
    });

    result = await connection.execute(`SELECT last_name FROM employees`);
    console.log("Result is:", result);

  } catch (err) {
    console.error(err.message);
  } finally {
    if (connection) {
      try {
        await connection.close();   // Always close connections
      } catch (err) {
        console.error(err.message);
      }
    }
  }
}

run();