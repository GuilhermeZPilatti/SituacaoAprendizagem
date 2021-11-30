//-------------------------------------------------------------------------------------------------------
//Elementos da interface.
const _id = document.getElementById('id')
const _nome = document.getElementById('nome')
const _cpf = document.getElementById('cpf')
const _dataNascimento = document.getElementById('dataNascimento')
const _email = document.getElementById('email')
const _sexo = document.getElementById('sexo')
const _telefone = document.getElementById('telefone')

//-------------------------------------------------------------------------------------------------------
//Função para enviar o cadastro de professor para a API REST.
function enviarCadastro() {

    let cadastro = {
        id: Number(_id.value),
        nome: new String(_nome.value),
        cpf: new String(_cpf.value),
        dataNascimento: new Date(_dataNascimento.value),
        email: new String(_email.value),
        sexo: new String(_sexo.value),
        telefone: new String(_telefone.value)
    };

    //validação de dados:

    if (cadastro.nome.length < 3) {
        alert('O seu nome deve ter mais do que 3 caracteres.')
        return false;
    }

    if (cadastro.cpf.length != 11) {
        alert('O seu cpf deve ser preechido corretamente (11 dígitos).')
        return false;
    }

    try {
        cadastro.dataNascimento = new Date(_dataNascimento.value).toISOString().substring(0, 10);
    } catch (err) {
        alert('Formato de data inválido.')
    }

    if (!(cadastro.email.endsWith('.com') && cadastro.email.includes('@'))) {
        alert('Este e-mail não é válido (Deve conter @ e .com)')
        return false;
    }

    if (cadastro.sexo.length != 1) {
        alert('Você deve marcar alguma das opções de sexo.')
        return false;
    }

    if (cadastro.telefone.length != 14) {
        alert('Preencha o seu telefone da forma correta.')
        return false;
    }

    //Operador ternario.
    // (teste lógico) ? (retorno se verdadeiro) : (retorno se falso)

    fetch(api_url + '/professor', {
        method: (cadastro.id > 0) ? 'put' : 'post',
        headers: api_headers,
        mode: 'cors',
        body: JSON.stringify(cadastro)
    })
        .then(res => {
            if (!res.ok) throw new Error(res.status)
            return res.json()
        })
        .then(() => window.location = 'relatorio_professores.html')
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

        fetch(api_url + '/professor/' + id, {
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