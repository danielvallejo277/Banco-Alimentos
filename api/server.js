
const express = require('express');
const app = express();
const cors = require('cors');
const { Client, Query } = require('pg');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post(("/beneficiarios-ser.html"), async (req ,  res) => {

    const client = new Client({
       user: "ukbtvqxhxjviabumjjwk",
       host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
       database: "brgkngfewsigrt9tshum",
       password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
       port: "5432"
   });
   await client.connect();
   const dat = new Date();
   const sb_id = ""+dat.getMonth()+dat.getDate()+dat.getHours()+dat.getMinutes()+dat.getSeconds();

  
   const {nombre, id,correo,telefono, direccion,archivo} = req.body;
   const response = await client.query("insert into solicitudes_beneficiarios(id_solicitud, solicitante_nom, solicitante_id, solicitante_correo, solicitante_celular, solicitante_direccion, docs) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                                       [sb_id,nombre, id, correo, telefono, direccion,archivo]);
   console.log(req.body);
   console.log(response);
   res.send("Solicitud de beneficiario registrada");

});

app.post(("/inicio.html"), async (req ,  res) => {

    const client = new Client({
       user: "ukbtvqxhxjviabumjjwk",
       host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
       database: "brgkngfewsigrt9tshum",
       password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
       port: "5432"
   });
   await client.connect();

  
   const {nombre, apellidos, identidad, celular,correo, justificacion} = req.body;
   const response = await client.query("insert into voluntarios(nombres, apellidos, numidentificacion, celular, correo, descripcion) VALUES ($1, $2, $3, $4, $5, $6)",
                                       [nombre, apellidos, identidad, celular, correo, justificacion]);
   console.log(req.body);
   console.log(response);
   res.send("Voluntario registrado");

});

app.post(("/registrarse.html"), async (req ,  res) => {

     const client = new Client({
        user: "ukbtvqxhxjviabumjjwk",
        host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
        database: "brgkngfewsigrt9tshum",
        password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
        port: "5432"
    });
    await client.connect();

    // const datos = {"username":username,"cc":cc,"correo":correo,"password":password,"codigo":codigo}
   
    const {username, cc, correo, password, codigo} = req.body;
    const response = await client.query("insert into administradores(nombreadmin, ceduladmin, correoadmin,psadmin, codadmin) VALUES ($1, $2, $3, $4, $5)",
                                        [username,cc, correo, password,codigo]);
    console.log(req.body);
    console.log(response);
    res.send("Administrador registrado");
});

app.post(("/donar.html"), async (req ,  res) => {

    const client = new Client({
       user: "ukbtvqxhxjviabumjjwk",
       host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
       database: "brgkngfewsigrt9tshum",
       password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
       port: "5432"
   });
   await client.connect();

   const dat = new Date();
   const do_id = ""+dat.getMonth()+dat.getDate()+dat.getHours()+dat.getMinutes()+dat.getSeconds();

   
   const {id, nombre, correo, tel, tipo, peso, transporte, direccion, descripcion } = req.body;
   const response = await client.query("insert into do_ofrecidas(donacion_id, donador_id, donador_nom,donador_cor, donacion_tipo,donacion_peso, donacion_tran, donador_dir, donacion_des, donador_tel) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
                                       [do_id,id, nombre, correo, tipo, peso, transporte, direccion, descripcion, tel]);
   console.log(req.body);
   console.log(response);
   res.send("Donacion guardada");

});

app.get('/registrarse.html', async (req, res) => {


    const client = new Client({
        user: "ukbtvqxhxjviabumjjwk",
        host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
        database: "brgkngfewsigrt9tshum",
        password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
        port: "5432"
    });
    await client.connect();

    const {codigo} = req.headers;
    
    const query = await client.query("SELECT * FROM codigos where codigo = $1",[codigo]);
    const queryJSON = JSON.stringify(query);
    // res.json(query.rows.length);

    const resultado = { "resultado": "" };

    if(query.rows.length > 0) {
        resultado.resultado = "V";
    }else {
        resultado.resultado = "F";
    }

    const reslJ = JSON.stringify(resultado);
    console.log(reslJ);
    res.send(reslJ);
    client.end();
    // return JSON.stringify(query);
})

// Admin dona
app.get('/admin/dona/reg.html', async (req, res) => {

    
    const client = new Client({
        user: "ukbtvqxhxjviabumjjwk",
        host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
        database: "brgkngfewsigrt9tshum",
        password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
        port: "5432"
    });
    await client.connect();

    
    const query = await client.query("SELECT * FROM do_ofrecidas where donacion_estado like 'Recibida'");

    res.json(query.rows);
    client.end();
})

app.get('/admin/dona/sol.html', async (req, res) => {
    const client = new Client({
        user: "ukbtvqxhxjviabumjjwk",
        host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
        database: "brgkngfewsigrt9tshum",
        password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
        port: "5432"
    });
    await client.connect();

    
    const query = await client.query("SELECT * FROM do_ofrecidas where donacion_estado like 'En proceso'");

    res.json(query.rows);
    client.end();
})

// fin admin dona


//Inicio admin ben
app.get('/admin/ben/sol.html', async (req, res) => {

    
    const client = new Client({
        user: "ukbtvqxhxjviabumjjwk",
        host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
        database: "brgkngfewsigrt9tshum",
        password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
        port: "5432"
    });
    await client.connect();

    
    const query = await client.query("SELECT * FROM solicitudes_beneficiarios where estado like 'En proceso'");

    res.json(query.rows);
    client.end();
});

app.get('/admin/ben/reg.html', async (req, res) => {

    
    const client = new Client({
        user: "ukbtvqxhxjviabumjjwk",
        host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
        database: "brgkngfewsigrt9tshum",
        password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
        port: "5432"
    });
    await client.connect();

    
    const query = await client.query("SELECT * FROM solicitudes_beneficiarios where estado like 'Recibida'");

    res.json(query.rows);
    client.end();
});

// fin admin ben

// Inicio voluntarios

app.get('/admin/vol/sol.html', async (req, res) => {

    
    const client = new Client({
        user: "ukbtvqxhxjviabumjjwk",
        host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
        database: "brgkngfewsigrt9tshum",
        password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
        port: "5432"
    });
    await client.connect();


    
    const query = await client.query("SELECT * FROM voluntarios");

    res.json(query.rows);
    client.end();
});

app.post(("/ini/vol.html"), async (req ,  res) => {

    const client = new Client({
       user: "ukbtvqxhxjviabumjjwk",
       host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
       database: "brgkngfewsigrt9tshum",
       password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
       port: "5432"
   });
   await client.connect();

  
   const {nomVol,apellVol,idVol, telVol,corVol,desc} = req.body;
   const response = await client.query("insert into voluntarios(nombres, apellidos, numidentificacion, celular, correo, descripcion) VALUES ($1, $2, $3, $4, $5, $6)",
                                       [nomVol, apellVol, idVol, telVol, corVol, desc]);
   console.log(req.body);
   console.log(response);
   res.send("Solicitud de beneficiario registrada");

});

// fin voluntarios


app.get('/login.html', async (req, res) => {


    const client = new Client({
        user: "ukbtvqxhxjviabumjjwk",
        host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
        database: "brgkngfewsigrt9tshum",
        password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
        port: "5432"
    });
    await client.connect();

    const {admin} = req.headers;
    const {pas} = req.headers;
  
    const query = await client.query(
        "SELECT * FROM administradores where correoadmin = $1 and psadmin = $2",[admin, pas]);
    const queryJSON = JSON.stringify(query);
    // res.json(query.rows.length);

    const esadmin = {"esadmin": ""};

    if(query.rows.length > 0){
        esadmin.esadmin = "V";
    }else{
        esadmin.esadmin = "F";
    };

    res.json(esadmin);
    // console.log(JSON.stringify(query.rows));
    client.end();
    // return JSON.stringify(query);
})


app.put('/cambiar/ben/sol', async (req, res) => {

    const client = new Client({
        user: "ukbtvqxhxjviabumjjwk",
        host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
        database: "brgkngfewsigrt9tshum",
        password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
        port: "5432"
    });
    await client.connect();

    const {id_solicitud} = req.headers;
    console.log(id_solicitud);
    
  
    const query = await client.query("UPDATE solicitudes_beneficiarios SET estado = 'Recibida' WHERE id_solicitud = $1",[id_solicitud]);
   
    // res.json(query);
    res.json(query);
    client.end();
    // return JSON.stringify(query);
});


app.put('/cambiar/dona/sol', async (req, res) => {


    const client = new Client({
        user: "ukbtvqxhxjviabumjjwk",
        host: "brgkngfewsigrt9tshum-postgresql.services.clever-cloud.com",
        database: "brgkngfewsigrt9tshum",
        password: "X3dvuEfnUGktOG6YWi8wsoeA9UATof",
        port: "5432"
    });
    await client.connect();

    const {donacion_id} = req.headers;
    console.log(donacion_id);
    
  
    const query = await client.query("UPDATE do_ofrecidas SET donacion_estado = 'Recibida' WHERE donacion_id = $1",[donacion_id]);
   
    // res.json(query);
    res.json(query);
    client.end();
    // return JSON.stringify(query);
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})