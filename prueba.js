const oracledb = require('oracledb');

const getTableData = function(callback){
    oracledb.getConnection(
        {
            connectString : 'db.co9ipdlhfuju.us-east-1.rds.amazonaws.com:1521/ORCL',
            user : 'admin',
            password : 'DBportafolio123'
        },
        function (err, connection) {
            if (err) {
                console.error(err);
                console.log("errorrrrrrrrrrr : "+err);
                return;
            }
            connection.execute("select * from USUARIO where EMAIL_USUARIO = 'prueba@rent.cl' and PASSWORD_USUARIO = 'pass123'",
                function(err, result) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    else if(result) {
                        var res = result.rows[0][0];
                        console.log("result in else if: "+res);
                        callback(res);
                    }});
        });
};

getTableData(function (result) {
    console.log(result);
});