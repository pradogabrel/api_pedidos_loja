async function buscarGeralP() {
    const respostaPedidos = await fetch("http://localhost:5226/api/Pedido")
    const pedidos = await respostaPedidos.json()

    const respostaClientes = await fetch("http://localhost:5226/api/Clientes")
    const clientes = await respostaClientes.json()

    const listaGeral = document.getElementById("Pedidos-Lista")

    pedidos.forEach(p => {
        const cliente = clientes.find(c => c.idCliente === p.idCliente)
        const nomeCliente = cliente ? cliente.nomeCliente : "Cliente não encontrado"

        const li = document.createElement("li")
        li.innerHTML = `quem pediu: ${nomeCliente} - pediu por um(a): ${p.descricao} - pelo valor de: ${p.valor}
        <button onclick="editar('${p.idPedido}', '${p.descricao}', '${p.valor}', '${p.idCliente}')">editar</button>
        <button onclick="deletar('${p.idPedido}')">deletar</button>
        `
        listaGeral.appendChild(li)
    });
}
buscarGeralP()

async function carregarClientes() {

    let resposta = await fetch("http://localhost:5226/api/Clientes");
    let dados = await resposta.json();

    let select = document.getElementById("clientepedido");

    select.innerHTML = `<option value="">Selecione um cliente</option>`;

    dados.forEach(cliente => {
        let option = document.createElement("option");
        option.value = cliente.idCliente;
        option.text = cliente.nomeCliente;
        select.appendChild(option);
    });
}
carregarClientes()


async function cadastrarpedido() {

    const descricao = document.getElementById("descricaopedido").value;
    const valor = Number(document.getElementById("valorpedido").value);

    const select = document.getElementById("clientepedido");
    const idCliente = Number(select.value);

    try {
        const response = await fetch("http://localhost:5226/api/Pedido", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                descricao: descricao,
                valor: valor,
                idCliente: idCliente
            })
        });

        const dados = await response.json();
        alert("Pedido cadastrado com sucesso");
        console.log(dados);
        window.location.reload();

    } catch (error) {
        console.log("Erro ao cadastrar pedido:", error);
    }
}

let pedidoeditado = null;

async function editar(id, descricao, valor, idCliente) {
    document.getElementById('descricaopedido').value = descricao;
    document.getElementById('valorpedido').value = valor;

    const select = document.getElementById("clientepedido");
    select.value = idCliente;

    pedidoeditado = id;
}

async function atualizarpedido() {

    if (!pedidoeditado) {
        alert("clique no editar primeiro");
        return;
    }

    const descricao = document.getElementById('descricaopedido').value;
    const valor = Number(document.getElementById('valorpedido').value);
    const idCliente = Number(document.getElementById('clientepedido').value);

    try {
        await fetch(`http://localhost:5226/api/Pedido/${pedidoeditado}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idPedido: pedidoeditado,
                descricao: descricao,
                valor: valor,
                idCliente: idCliente
            })
        });

        alert("Pedido atualizado com sucesso");
        window.location.reload();

    } catch (error) {
        console.log("Algo deu errado", error);
    }
}

async function deletar(id) {
    const confirmar = confirm("Tem certeza que deseja excluir esse pedido do sistema?")

    if (!confirmar) {
        return
    }

    await fetch(`http://localhost:5226/api/Pedido/${id}`, {
        method: 'DELETE'
    })

    alert("Pedido excluido com sucesso")
    window.location.reload();
}