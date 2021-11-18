//-------------------------------------------------------------------------------------------------------
// Preenche Tabela de Salas
function preencheTabela(salas) {

    let htmlTable = '';

    for (let i in salas) {

        let sala = salas[i];
        htmlTable = htmlTable
            + '<tr>'
            + '<td>' + sala.numero + '</td>'
            + '<td>' + sala.id + '</td>'
            + '<td>' + sala.bloco + '</td>'
            + '<td>' + sala.apelido + '</td>'
            + '<td>' + sala.descricaoTipo + '</td>'
            + '<td>' + sala.capacidade + '</td>'
            + '<td>' + sala.situacao + '</td>'
            + '<td>' +
/*  */'<i class="material-icons blue-text" onclick="editar(' + sala.id + ')">create</i>' +
/*  */'&emsp;' +
/*  */'<i class="material-icons red-text" onclick="removerCadastro(' + sala.id + ')">delete</i>'
            + '</td>'
            + '</tr>';

        document.getElementById('tabelaSalas').innerHTML = htmlTable;
    }
}

function buscarSalas() {

    fetch(api_url + '/sala', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': api_token,
        },
        mode: 'cors',
    })
        .then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        })

        .then(data => preencheTabela(data.salas))
        .catch(err => M.toast({ html: 'Problemas com a requisição: ' + err }))
}

function removerCadastro(idCadastro) {
    fetch(api_url + '/salas', {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': api_token,
        },
        mode: 'cors',
        body: JSON.stringify({
            id: idCadastro
        })
    })
        .then(res => { if (!res.ok) throw new Error(res.status) })
        .then(() => buscarSalas())
        .catch(err => M.toast({ html: 'Problemas com a requisição: ' + err }))
}

function editar(idCadastro) {
    console.log(idCadastro)
    sessionStorage.setItem('idCadastro', idCadastro);
    window.location = 'cadastro_salas.html'
}

buscarSalas();