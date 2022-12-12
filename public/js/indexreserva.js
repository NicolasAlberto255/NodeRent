Listardeptos()
        fillServicios()
        fillRegiones()
        fillUsuarios()

        function Listardeptos() {

            const url = 'http://apirent-env.eba-n7bvnjak.us-east-1.elasticbeanstalk.com/departamentos/departamentos';
            
            fetch(url, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "https://localhost",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            })
            .then(res => res.json())
            .then(response => {
                
               
                var d1 = document.getElementById('info');
                for (let x of response){
                    //console.log(x)
                    d1.insertAdjacentHTML('afterbegin','<div class="col"><div class="card" style="width: 30rem;"><img src="https://images.estilosdeco.com/2019/02/depto-pequeno-dormitorio-altillo-8-750x500.jpg" class="card-img-top"><div class="card-body"><h5 class="card-title">'+x.nombreDepartamento+'</h5><p class="card-title">'+x.nombreRegionDepto+'</p><p class="card-text"><i class="fa-solid fa-bath"></i> '+x.nBanos+' <i class="fa-solid fa-bed"></i> '+x.nHabitacion+'</p><hr><% if(login){ %><button value="'+x.idDepartamentos+'" onclick="addBooking(this.value)" class="btn btn-outline-success float-end" style="border-radius:50px; ">Reservar</button><%} else {%><a href="login" class="btn btn-outline-success float-end" style="border-radius:50px;" >Inicia Sesion</a><%}%><h6>Valor por noche: $'+x.vNoche+'</h6></div></div><br></div>');
                }
            })
            .catch(function(error) {
                console.error("¡Error!", error);
            })

            
        }
        function fillServicios(){
            const select = document.getElementById("select_region");
            const url = 'http://apirent-env.eba-n7bvnjak.us-east-1.elasticbeanstalk.com/servicio/servicios';
            
            fetch(url, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "https://localhost",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            })
            .then(res => res.json())
            .then(response => {
                let d1 = document.getElementById('servicios');
                
                for (let element of response) {

                    d1.insertAdjacentHTML('afterbegin','<div class="form-check"><input class="form-check-input" type="checkbox" value="'+element.idServicios+'" id="'+element.idServicios+'"><label class="form-check-label" for="'+element.id+'">'+element.nombreServicios+'</label></div>');
                    
                }
            })
            .catch(function(error) {
                console.error("¡Error!", error);
            })
        }

        function fillRegiones(){
            const url = 'http://apirent-env.eba-n7bvnjak.us-east-1.elasticbeanstalk.com/region/regiones';
            
            fetch(url, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "https://localhost",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            })
            .then(res => res.json())
            .then(response => {
                // console.log("Las categorías son:", lista_de_categorias);
                // alert('HAY ' + lista_de_categorias.length) Puedes poner este alert para ver si la llamada POST te devuelve algo
                
                const select = document.getElementById("select_region");
                for (let element of response) {
                    let nuevaOpcion = document.createElement("option");
                    nuevaOpcion.value = element.idRegion;
                    nuevaOpcion.text = element.nombreRegion;
                    //select.add(nuevaOpcion);
                    select.appendChild(nuevaOpcion); 
                }
            })
            .catch(function(error) {
                console.error("¡Error!", error);
            })
        }

        function fillComunas(regionID){
            const url = 'http://apirent-env.eba-n7bvnjak.us-east-1.elasticbeanstalk.com/comuna/comunasByRegionId?id='+regionID;
            document.getElementById("select_comuna").innerHTML = "";
            fetch(url, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "https://localhost",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            })
            .then(res => res.json())
            .then(response => {
                // console.log("Las categorías son:", lista_de_categorias);
                // alert('HAY ' + lista_de_categorias.length) Puedes poner este alert para ver si la llamada POST te devuelve algo
                
                const select = document.getElementById("select_comuna");
                for (let element of response) {
                    let nuevaOpcion = document.createElement("option");
                    nuevaOpcion.value = element.idComuna;
                    nuevaOpcion.text = element.nombreComuna;
                    //select.add(nuevaOpcion);
                    select.appendChild(nuevaOpcion); 
                }
            })
            .catch(function(error) {
                console.error("¡Error!", error);
            })
        }


        function fillUsuarios(){
            const url = 'http://apirent-env.eba-n7bvnjak.us-east-1.elasticbeanstalk.com/usuario/usuarios';
            //console.log(url)
            fetch(url, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "https://localhost",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            })
            .then(res => res.json())
            .then(response => {
                // console.log("Las categorías son:", lista_de_categorias);
                // alert('HAY ' + lista_de_categorias.length) Puedes poner este alert para ver si la llamada POST te devuelve algo
                
                const select = document.getElementById("select_usuarios");
                for (let element of response) {
                    let nuevaOpcion = document.createElement("option");
                    nuevaOpcion.value = element.idUsuario;
                    nuevaOpcion.text = element.nombreUsuario;
                    //select.add(nuevaOpcion);
                    select.appendChild(nuevaOpcion); 
                }
            })
            .catch(function(error) {
                console.error("¡Error!", error);
            })
        }

        

        function addBooking(id){
            document.getElementById('id_depto').value = id
            //console.log(id)
            let myModal = new bootstrap.Modal(document.getElementById('m_booking'))
            myModal.show()

            const url = 'http://apirent-env.eba-n7bvnjak.us-east-1.elasticbeanstalk.com/departamentos/departamentosGet/'+id;

            fetch(url, {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "https://localhost",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            })
            .then(res => res.json())
            .then(response => {
               document.getElementById('m_bookingLabel').innerText = "Reserva para " + response.nombreDepartamento
            })
            .catch(function(error) {
                console.error("¡Error!", error);
            })
            
        }

        function makeBooking(){

            
            let booking_ = []
            let date = new Date()

            let day = date.getDate()
            if(day <10){
                day = "0" + day
            }
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            let fecha_ = ''
            if(month < 10){
                fecha_ = `${year}-0${month}-${day}`
            }else{
                fecha_ = `${year}-${month}-${day}`
            }

        

            //console.log(fecha_)
            booking_.push(
                {
                    idReserva:0,
                    fechaInicio:document.getElementById('f_llegada').value + "T00:00:00",
                    fechaFin:document.getElementById('f_salida').value + "T00:00:00",
                    fechaCreacion:fecha_+"T00:00:00",
                    precioAbono:parseInt(document.getElementById('p_abono').value),
                    usuarios:[
                        {
                            idUsuario:parseInt(document.getElementById('select_usuarios').value)
                        }
                    ],
                    departamentos:[{
                        idDepartamentos:parseInt(document.getElementById('id_depto').value)
                    }],
                    servicios:[]
                }
                );
            let count_servicios = document.getElementsByClassName('form-check-input').length 
            for (let i = 1; i <= count_servicios; i++) {
                if(document.getElementById(i).checked == true){
                    booking_[0].servicios.push(
                        {
                            idServicios:parseInt(document.getElementById(i).value)
                        }
                    )
                }   
            }
            //console.log(JSON.stringify(booking_[0]))

            fetch('http://apirent-env.eba-n7bvnjak.us-east-1.elasticbeanstalk.com/reserva/reservaAdd', {
                method: 'POST',
                body: JSON.stringify(booking_[0]),
                headers: {
                    'Content-Type': 'application/json'
                    //"Access-Control-Allow-Origin": "https://localhost",
                    //"Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
            })
            .then(function(response) {
                return response;
            })
            .then(data => {
                console.log(data);
                if(data.ok == true)
                {
                    let modal_add = new bootstrap.Modal(document.getElementById('m_booking'))
                    modal_add.hide()
                    let modal_ok = new bootstrap.Modal(document.getElementById('modal_ok'))
                    modal_ok.show()

                }
            })
        }

        async function postData(url, data_){
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(data_),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function(response) {
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
        }


        function listar_info(){

            let d1 = document.getElementById('info');
            for (i in datos_) {
                d1.insertAdjacentHTML('afterbegin','<li class="list-group-item">'+datos[i].nDepto+'</li>');
            }
        }

