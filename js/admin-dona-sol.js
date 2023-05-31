// const table = document.getElementById("table");
// const modal = document.getElementById("modal");
// const inputs = document.querySelectorAll("input")

// let count = 0;

// window.addEventListener('click', (e) => {
//     if(e.target.matches(".btn-warning")) {
//         e.stopPropagation();
//         let data = e.target.parentElement.parentElement.parentElement.children;
//         fillData(data);
//         modal.classList.toggle("translate");
//     }
//     if(e.target.matches(".btn-danger")) {
//         modal.classList.toggle("translate");
//         count = 0;
//     }
// })

// const fillData = (data) => {
//     for (let index of inputs) {
//         index.value = data[count].textContent;
//         count++;
//     }
// }




// LLENAR TABLA

let dataTable;
let TableisInitialized = false;

const tableConf = {
       pageLenght: 20,
       destroy: true  

};

const inittable = async() => {
    if(TableisInitialized){
        // dataTable.destroy(); 
    }
    await listarRegSol();

    dataTable =  $('#tableSol');
    TableisInitialized = true;
}

const listarRegSol = async () => {
    try{
        const response = await fetch("http://localhost:3000/admin/dona/sol.html",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const donaciones = await response.json();

        console.log(donaciones);

        

        let contenido = ``;   

        donaciones.forEach((donacion, index) => {
            contenido += `
            <tr>
                <td>${donacion.donacion_id}</td>
                <td>${donacion.donador_id}</td>
                <td>${donacion.donador_nom}</td>
                <td>${donacion.donador_tel}</td>
                <td>${donacion.donador_cor}</td>
                <td>${donacion.donacion_tipo}</td>
                <td>${donacion.donacion_peso}</td>
                <td>${donacion.donacion_tran}</td>
                <td>${donacion.donador_dir}</td>
                <td>${donacion.donacion_des}</td>
                <td>${donacion.donacion_estado}</td>
                <td>${donacion.fecha}</td>
                <td>
                <div class="d-flex flex-row">
                    <button class="btn btn-warning" onclick="cambiarEstado(${donacion.donacion_id})">Aprobar</button>
                </div>
            </td>
            <tr>
            `;
        });

        document.querySelector('#tableBodySol').innerHTML = contenido;

    }catch(ex){
        alert(ex);
    }

}




//CAMBIAR ESTADO SOLICITUD

async function cambiarEstado(donacion_id){

    const id = donacion_id;
    console.log(id);

    const response = await fetch("http://localhost:3000/cambiar/dona/sol" , {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "donacion_id": id,
        },
    }); 

    console.log(response.status);


    if(response.status =  200){
        alert("Se aprobo donacion");
        await inittable();
        
    }else{
        alert("No se puedo aprobar solicitud")
    };
}

window.addEventListener("load", async () => {
    await inittable();
});

