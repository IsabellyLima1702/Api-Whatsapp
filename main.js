'use-strict'

async function pesquisarContatos() {
    const url=`https://giovanna-whatsapp.onrender.com/v1/whatsapp/contatos/11987876567`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function criarContato(link){
    const contatos=document.getElementById('dados')
    const NovoCard=document.createElement('div')
    NovoCard.classList.add('cont')

    const Perfil=document.createElement('img')
    Perfil.scr=link.profile
    NovoCard.appendChild(Perfil)

    const NovaDesc=document.createElement('div')
    NovaDesc.classList.add('registro')
    NovoCard.appendChild(NovaDesc)

    const NovoContato=document.createElement('p')
    NovoContato.classList.add('name')
    NovoContato.textContent=`${link.name}`
    NovaDesc.appendChild(NovoContato)

    const NovoNumero=document.createElement('p')
    NovoNumero.textContent=`${link.description}`
    NovaDesc.appendChild(NovoNumero)
    
    NovoCard.appendChild(NovaDesc)
    contatos.appendChild(NovoCard)

    NovoCard.addEventListener('click', async function(){
        
        await preencherConversa(link.name)
    })
}

async function preencherContatos() {
    const contato= await pesquisarContatos()
    const contatos=document.getElementById('dados')
    contato.dados_contato.forEach(criarContato)
}

async function preencherConversa(name) {
    const data = await pesquisarConversa(name);
    const conversa = data.conversas[0]
    criarConversa(conversa);
}

async function pesquisarConversa(name){
    const url=`https://giovanna-whatsapp.onrender.com/v1/whatsapp/conversas?numero=11987876567&contato=${name}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar informações:", error)
        return null
    }
}

async function criarConversa(conversa){
    const conversas=document.getElementById('conts')
    conversas.replaceChildren()
    const pessoa=document.createElement('div')
    pessoa.classList.add('perfil')

    const imgContato = document.createElement('img')
    imgContato.src = conversa.profile
    pessoa.appendChild(imgContato)


    const NovaDesc=document.createElement('div')
    NovaDesc.classList.add('registro')
    pessoa.appendChild(NovaDesc)

    const NovoContato=document.createElement('p')
    NovoContato.classList.add('name')
    NovoContato.textContent=`${conversa.name}`
    NovaDesc.appendChild(NovoContato)

    const NovoNum=document.createElement('p')
    NovoNum.textContent=`${conversa.description}`
    NovaDesc.appendChild(NovoNum)

    conversas.appendChild(pessoa)

    const chat = document.createElement('div')
    chat.classList.add('chat')

    conversa.conversas.forEach(message => {
        const destinatario = document.createElement('p')
        destinatario.classList.add('destinatario')
        destinatario.textContent=`${message.sender}`
        chat.appendChild(destinatario)

        const remetente = document.createElement('p')
        remetente.classList.add('remetente')
        remetente.textContent=`${message.content}`
        chat.appendChild(remetente)
    })

    conversas.appendChild(chat)


}

preencherContatos()