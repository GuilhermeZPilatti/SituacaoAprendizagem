//-------------------------------------------------------------------------------------------------------
// Preenche Tabela de Alunos
function preencheTabela(professores) {

    let htmlTable = '';

    for (let i in professores) {

        let professor = professores[i];
        htmlTable = htmlTable
            + '<tr>'
            + '<td>' + professor.nome + '</td>'
            + '<td>' + professor.id + '</td>'
            + '<td>' + professor.cpf + '</td>'
            + '<td>' + new Date(professor.dataNascimento).toLocaleDateString() + '</td>'
            + '<td>' + professor.sexo + '</td>'
            + '<td>' + professor.email + '</td>'
            + '<td>' + professor.telefone + '</td>'
            + '<td>' + professor.situacao + '</td>'
            + '<td>' +
/*  */'<i class="material-icons blue-text" onclick="editar(' + professor.id + ')">create</i>' +
/*  */'&emsp;' +
/*  */'<i class="material-icons red-text" onclick="removerCadastro(' + professor.id + ')">delete</i>'
            + '</td>'
            + '</tr>';

        document.getElementById('tabelaProfessores').innerHTML = htmlTable;
    }
}

function buscarProfessores() {

    fetch(api_url + '/professor', {
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

        .then(data => preencheTabela(data.professores))
        .catch(err => M.toast({ html: 'Problemas com a requisição: ' + err }))
}

function removerCadastro(idCadastro) {
    fetch(api_url + '/professor', {
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
        .then(() => buscarProfessores())
        .catch(err => M.toast({ html: 'Problemas com a requisição: ' + err }))
}

function editar(idCadastro) {
    console.log(idCadastro)
    sessionStorage.setItem('idCadastro', idCadastro);
    window.location = 'cadastro_professores.html'
}

buscarProfessores();