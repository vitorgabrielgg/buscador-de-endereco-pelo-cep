const mostrar = async () =>{
    const cep = document.querySelector('#cep').value
    if(validarDados(cep)){
        const address = document.querySelector('#address')
        address.classList.toggle('hide')
    }else{
        alert('Digite um CEP válido!')
    }

    const endereco = await buscarEndereco(cep)

    console.log(endereco)

    preencherTabela(endereco)
}

const validarDados = (cep) => {
    if(cep.length == 8 && !isNaN(cep)){
        return true
    }else{
        return false
    }
}

const buscarEndereco = async (cep) => {
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }

    const url = `https://viacep.com.br/ws/${cep}/json/`
    const response = await fetch(url,options)
    const data = await response.json()
    return data
}

const preencherTabela = async (endereco) =>{
    const {logradouro,bairro,localidade,uf,cep} = await endereco
    if(cep != undefined){
        const tbody = document.querySelector('#tbody')
        tbody.innerText = ''

        const tr = tbody.insertRow()

        const td_logradouro = tr.insertCell()
        td_logradouro.innerText = logradouro

        const td_bairro = tr.insertCell()
        td_bairro.innerText = bairro

        const td_localidade = tr.insertCell()
        td_localidade.innerHTML = localidade+ '/' +uf
        const td_cep = tr.insertCell()
        td_cep.innerText = cep
    }else{
        alert('CEP Inválido!')
        const tbody = document.querySelector('#tbody')
        tbody.innerText = ''

        buscarNovamente()
    }
}

const buscarNovamente = () => {
    const address = document.querySelector('#address')
    address.classList.toggle('hide')
    const cep = document.querySelector('#cep')
    cep.value = ''
    cep.focus()
}