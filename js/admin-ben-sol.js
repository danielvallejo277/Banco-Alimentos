
// LLENAR TABLA

let dataTable;
let TableisInitialized = false;

const tableConf = {
    pageLenght: 20

};

const inittable = async() => {
    if(TableisInitialized){
        // dataTable.destroy(); 
    }
    await listar();

    dataTable = $('#tableSol');
    TableisInitialized = true;
}

const listar = async () => {
    try{
        const response = await fetch("http://localhost:3000/admin/ben/sol.html",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const solicitudes = await response.json();

        console.log(solicitudes);

        

        let contenido = ``;   

        solicitudes.forEach((solicitud, index) => {
            contenido += `
            <tr>
                <td>${solicitud.id_solicitud}</td>
                <td>${solicitud.solicitante_nom}</td>
                <td>${solicitud.solicitante_id}</td>
                <td>${solicitud.solicitante_correo}</td>
                <td>${solicitud.solicitante_celular}</td>
                <td>${solicitud.solicitante_direccion}</td>
                <td>${solicitud.estado}</td>
                <td>
                    <div class="d-flex flex-row">
                        <button class="btn btn-warning" onclick="cambiarEstado(${solicitud.id_solicitud})">Aprobar</button>
                    </div>
                </td>
            <tr>
            `;
        });

        // recordar meter doc

        document.querySelector('#tableBodySol').innerHTML = contenido;

    }catch(ex){
        alert(ex);
    }

}

//CAMBIAR ESTADO

async function cambiarEstado(id_solicitud){

    const id = id_solicitud;
    console.log(id);

    const response = await fetch("http://localhost:3000/cambiar/ben/sol" , {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "id_solicitud": id,
        },
    }); 


    console.log(response.status);


    if(response.status =  200){
        alert("Se aprobo solicitud");
        await inittable();
        
    }else{
        alert("No se puedo aprobar solicitud")
    };
}



window.addEventListener("load", async (event) => {
    
    await inittable();
    event.preventDefault();
})
