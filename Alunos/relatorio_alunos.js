//-------------------------------------------------------------------------------------------------------
// Preenche Tabela de Alunos
function preencheTabela(alunos) {

    let htmlTable = '';

    for (let i in alunos) {

        let aluno = alunos[i];
        htmlTable = htmlTable
            + '<tr>'
            + '<td>' + aluno.nome + '</td>'
            + '<td>' + aluno.id + '</td>'
            + '<td>' + aluno.cpf + '</td>'
            + '<td>' + new Date(aluno.dataNascimento).toLocaleDateString() + '</td>'
            + '<td>' + aluno.sexo + '</td>'
            + '<td>' + aluno.email + '</td>'
            + '<td>' + aluno.telefone + '</td>'
            + '<td>' + aluno.situacao + '</td>'
            + '<td>' +
/*  */'<i class="material-icons blue-text" onclick="editar(' + aluno.id + ')">create</i>' +
/*  */'&emsp;' +
/*  */'<i class="material-icons red-text" onclick="removerCadastro(' + aluno.id + ')">delete</i>'
            + '</td>'
            + '</tr>';

        document.getElementById('tabelaAlunos').innerHTML = htmlTable;
    }
}

function buscarAlunos() {

    fetch(api_url + '/aluno', {
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

        .then(data => preencheTabela(data.alunos))
        .catch(err => M.toast({ html: 'Problemas com a requisição: ' + err }))
}

function removerCadastro(idCadastro) {
    fetch(api_url + '/aluno', {
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
        .then(() => buscarAlunos())
        .catch(err => M.toast({ html: 'Problemas com a requisição: ' + err }))
}

function editar(idCadastro) {
    console.log(idCadastro)
    sessionStorage.setItem('idCadastro', idCadastro);
    window.location = 'cadastro_alunos.html'
}

buscarAlunos();