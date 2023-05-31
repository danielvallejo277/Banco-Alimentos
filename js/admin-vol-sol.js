// LLENAR TABLA --pendiente

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
    await listar();

    dataTable =  document.querySelector('#tableAdminVolsol');
    TableisInitialized = true;
}

const listar = async () => {
    try{
        const response = await fetch("http://localhost:3000/admin/vol/sol.html",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const voluntarios = await response.json();

        console.log(voluntarios);

        

        let contenido = ``;   

        voluntarios.forEach((voluntario, index) => {
            contenido += `
            <tr>
                <td>${voluntario.numidentificacion}</td>
                <td>${voluntario.nombres}</td>
                <td>${voluntario.apellidos}</td>
                <td>${voluntario.celular}</td>
                <td>${voluntario.correo}</td>
                <td>${voluntario.descripcion}</td>
            <tr>
            `;
        });

        // recordar meter doc

        document.querySelector('#bodyAdminVolSol').innerHTML = contenido;

    }catch(ex){
        alert(ex);
    }

}


window.addEventListener("load", async () => {
    await inittable();
})
