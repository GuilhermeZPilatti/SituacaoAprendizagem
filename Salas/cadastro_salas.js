//-------------------------------------------------------------------------------------------------------
//Elementos da interface.
const _id = document.getElementById('id')
const _numero = document.getElementById('numero')
const _bloco = document.getElementById('bloco')
const _tipo = document.getElementById('tipo')
const _apelido = document.getElementById('apelido')
const _situacao = document.getElementById('situcao')

//-------------------------------------------------------------------------------------------------------
//Função para enviar o cadastro de professor para a API REST.
function enviarCadastro() {

    let cadastro = {
        id: Number(_id.value),
        numero: new String(_numero.value),
        bloco: new String(_bloco.value),
        tipo: new String(_tipo.value),
        apelido: new String(_apelido.value),
        situacao: new String(_situacao.value)
    };

    //Validação de dados:

    //Operador ternario.
    // (teste lógico) ? (retorno se verdadeiro) : (retorno se falso)

    fetch(api_url + '/sala', {
        method: (cadastro.id > 0) ? 'put' : 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': api_token,
        },
        mode: 'cors',
        body: JSON.stringify(cadastro)
    })
        .then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        })
        .then(() => window.location = 'relatorio_salas.html')
        .catch(err => M.toast({ html: 'Problemas com a autenticação: ' + err }))
}

//-------------------------------------------------------------------------------------------------------
//Função para preencher o formulário com os dados de um objeto
function preencheForm(professor) {
    _id.value = professor.id;
    _nome.value = professor.nome;
    _cpf.value = professor.cpf;
    _dataNascimento.value = professor.dataNascimento;
    _sexo.value = professor.sexo;
    _email.value = professor.email;
    _telefone.value = professor.telefone;

    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});
}

//-------------------------------------------------------------------------------------------------------
//Função para receber um cadastro em edição
function recebeCadastroEdicao() {
    if (sessionStorage.getItem('idCadastro')) {

        let id = sessionStorage.getItem('idCadastro');
        sessionStorage.removeItem('idCadastro');

        fetch(api_url + '/sala/' + id, {
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
            .then(data => preencheForm(data))
            .catch(err => M.toast({ html: 'Problemas com a requisição: ' + err }))
    }
}

//-------------------------------------------------------------------------------------------------------
//Invocação da função
recebeCadastroEdicao();