//-------------------------------------------------------------------------------------------------------
//Elementos da interface.
const _id = document.getElementById('id')
const _numero = document.getElementById('numero')
const _bloco = document.getElementById('bloco')
const _tipo = document.getElementById('tipo')
const _apelido = document.getElementById('apelido')

//-------------------------------------------------------------------------------------------------------
//Função para enviar o cadastro de professor para a API REST.
function enviarCadastro() {

    let cadastro = {
        id: Number(_id.value),
        numero: Number(_numero.value),
        bloco: Number(_bloco.value),
        tipo: new String(_tipo.value),
        apelido: new String(_apelido.value),
    };

    //Validação de dados:

    //Operador ternario.
    // (teste lógico) ? (retorno se verdadeiro) : (retorno se falso)

    fetch(api_url + '/sala', {
        method: (cadastro.id > 0) ? ('put') : ('post'),
        headers: api_headers,
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
function preencheForm(sala) {
    _id.value = sala.id;
    _numero.value = sala.numero;
    _bloco.value = sala.bloco;
    _tipo.value = sala.tipo;
    _apelido.value = sala.apelido;
    _situacao.value = sala.situacao;

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
            headers: api_headers,
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