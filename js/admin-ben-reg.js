
// LLENAR TABLA

let dataTable;
let TableisInitialized = false;

const tableConf = {
    pageLenght: 20

};

const inittable = async() => {
    if(TableisInitialized){
        dataTable.destroy(); 
    }
    await listar();

    dataTable = $('#tableAdminBenReg').DataTable(tableConf);
    TableisInitialized = true;
}

const listar = async () => {
    try{
        const response = await fetch("http://localhost:3000/admin/ben/reg.html",{
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
            <tr>
            `;
        });

        // recordar meter doc

        document.querySelector('#tableBodyReg').innerHTML = contenido;

    }catch(ex){
        alert(ex);
    }

}


window.addEventListener("load", async (event) => {
    
    await inittable();
    event.preventDefault();
});