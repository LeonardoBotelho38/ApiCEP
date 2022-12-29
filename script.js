
window.addEventListener('beforeunload', () => {
    // limpar os campos aqui
        cidade.value = ""
        bairro.value = ""
        endereco.value = ""
        estado.value = ""
  });
  
async function buscaEndereco(cep){
    var mensagemErro = document.querySelector("#erro")
    mensagemErro.innerHTML = ""
    try{
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        //converte a requisição da API (que chega em formato de bytes) para json
        var consultaCepConvertido = await consultaCep.json()
        if (consultaCepConvertido.erro){
           throw Error('CEP não existe!')
        }
        var cidade = document.querySelector('#cidade')
        var bairro = document.querySelector('#bairro')
        var logradouro = document.querySelector('#endereco')
        var estado = document.querySelector('#estado')

        cidade.value = consultaCepConvertido.localidade
        bairro.value = consultaCepConvertido.bairro
        logradouro.value = consultaCepConvertido.logradouro
        estado.value = consultaCepConvertido.uf


        console.log(consultaCepConvertido)
        return consultaCepConvertido

    }catch (erro){
        mensagemErro.innerHTML = `<p> CEP invalido! Tente novamente.</p>`
        console.log(erro)
    }
}

var cep = document.querySelector('#cep')
cep.addEventListener('focusout', () => (buscaEndereco(cep.value)))

