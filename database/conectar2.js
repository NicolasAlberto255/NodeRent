const oracledb = require('oracledb');

const con = oracledb.getConnection({
    connectString : 'db.co9ipdlhfuju.us-east-1.rds.amazonaws.com:1521/ORCL',
    user : 'admin',
    password : 'DBportafolio123'
})

con.startup

module.exports = con