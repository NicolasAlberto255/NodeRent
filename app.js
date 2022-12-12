
var port = process.env.PORT || 6000;

const express = require("express"); // Asignamos el modulo express a una constante con el mismo nombre
//import indexRoutes from './routes/routes.js';
const {dirname, join} = require ('path')
const { fileURLToPath } = require ("url");
const dotenv = require ('dotenv');
const session = require ('express-session');
const bcryptjs = require  ('bcryptjs');
const app = express();
const oracledb = require('oracledb');

//const __dirname = dirname(fileURLToPath(import.meta.url))

//para capturar datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//invocamos a dotenv
dotenv.config({path:'./env/.env'});

//directorio public

app.set('views', join(__dirname, 'views'))


app.get('/login', (req, res)=>{
    res.render('login')
})

app.set('view engine', 'ejs')
//app.use(indexRoutes)
app.use(express.static(join(__dirname, 'public')))




//invocar bcryptjs
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true 
}))

//invocar modulo de conexion

const conectar = require('./database/conectar2')
app.post('/auth', async(req,res)=>{
    const mail = req.body.txt_mail;
    const pass = req.body.txt_pass;
    const query = "select * from USUARIO where EMAIL_USUARIO = '"+mail+"' and PASSWORD_USUARIO = '"+pass+"'"
    let passwordHash = await bcryptjs.hash(pass, 8);
    if(mail && pass){
        //const results = (await conectar).execute('select * from USUARIO where EMAIL_USUARIO = ', [mail],'and PASSWORD_USUARIO = ',[pass], async (err, result)=>{
        //    if (err) {
        //        console.error(err);
        //        return;
        //    }
        //    else if(result) {
        //        var res = result.rows[0][0];
        //        console.log("result in else if: "+res);
        //        callback(res);
        //    }
        //})
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
                    connection.execute(query,
                        function(err, result) {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            else if(result) {
                                var res = result.rows;
                                //console.log(res[0][0]);
                                callback(res);
                            }});
                });
        };
        getTableData(function (result) {
            //json = JSON.parse(result);
            if(result == 0){
                res.render('login',{
                    alert:true,
                    alertTitle: "ERROR",
                    alertMessage: "Credenciales Incorrectas",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer:false,
                    ruta: "login"
                })
            }else{
                req.session.loggedin = true;
                req.session.name = result[0][6]
                req.session.userid = result[0][0]
                console.log(result[0][0])
                res.render('login',{
                    alert:true,
                    alertTitle: "Bienvenido!",
                    alertMessage: "Redireccionando...",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer:2500,
                    ruta: ""
                })
            }
        });
        
    }
}) 

app.get('/', (req, res)=>{
    if(req.session.loggedin){
        res.render('index',{
            login: true,
            name: req.session.name,
            userid: req.session.userid
        })
    }else{
        res.render('index',{
            login: false,
            name: 'debe iniciar sesion'
        })
    }
})

app.get('/logout',(req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})



app.listen(port, (req, res)=>{
    console.log('Server conected');
})