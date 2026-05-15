async function buscarGeral() {
    await fetch("http://localhost:5226/api/Clientes")
    .then(Response => Response.json())
    .then(clientes => {
        const listaGeral = document.getElementById("Cliente-Lista")

        clientes.forEach(c => {
            const li = document.createElement("li")
            li.innerHTML = `nome: ${c.nomeCliente} - email: ${c.emailCliente} 
            <button onclick="editar('${c.idCliente}', '${c.nomeCliente}', '${c.emailCliente}')">editar</button>
            <button onclick="deletar('${c.idCliente}')">deletar</button>
            `
            listaGeral.appendChild(li)
        });  
        })

}
buscarGeral()


async function cadastrarcliente() {

    const nome = document.getElementById("nomecliente").value
    const email = document.getElementById("emailcliente").value

    await fetch("http://localhost:5226/api/Clientes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeCliente: nome,
            emailCliente: email
        })
    })
    
        .then(response => response.json())
    .then(dados => {
        alert("Cliente cadastrado com sucesso")
        console.log(dados)
    })

      .catch((error) => {
            console.log("Algo deu errado", error)
        })

}

let clienteeditado = null;

async function editar(id, nome, emai) {
        document.getElementById('nomecliente').value = nome
        document.getElementById('emailcliente').value = emai
        
       clienteeditado = id  
}


async function atualizarcliente() {
    
    if(!clienteeditado){
        alert("clique no editar primeiro")
        return
    }

       
       const nome = document.getElementById('nomecliente').value 
       const emai = document.getElementById('emailcliente').value

          await fetch(`http://localhost:5226/api/Clientes/${clienteeditado}`, {
       method:'PUT',
       headers:{
        'Content-Type' : 'application/json'
       },
       body:JSON.stringify({
         idCliente: clienteeditado,
         nomeCliente: nome,
         emailCliente: emai,
         pedidos: []
       })

})

   .catch((error) => {
            console.log("Algo deu errado", error)
        })
    }
    async function deletar(id) {
        const confirmar = confirm("Tem certeza que deseja excluir esse cliente do sistema?")
    
        if (!confirmar) {
            return
        }
    
        await fetch(`http://localhost:5226/api/Clientes/${id}`, {
            method: 'DELETE'
        })
    
        alert("Cliente excluído com sucesso")
        window.location.reload();
    }