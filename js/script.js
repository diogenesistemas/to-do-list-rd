let btnAddTarefa = document.querySelector('#adicionar-tarefa');
let tarefas = document.querySelector('#tarefas');
let inputTarefa = document.querySelector('#tarefa-digitada');
//getItem retorna um array, não é um valor booleano porém o javascript entende que se retornar undefined ou null é false.
let listaTarefas = localStorage.getItem('listaTarefas') ? JSON.parse(localStorage.getItem('listaTarefas')) : [];


// btnAddTarefa.onclick = function () {
//    tarefas.innerHTML += tarefaNova;
// }

const salvarLocalStorage = tarefas => {
    let tarefasEmJason = JSON.stringify(tarefas);
    localStorage.setItem('listaTarefas', tarefasEmJason);
    console.log("Lista de Tarefas Salva com Sucesso!");

}

const mostrarNaTela = arrayTarefas => {
    arrayTarefas.forEach(textoTarefa => {
        let tarefaNova = ` <div class="col-md-4">
<div class="card-tarefa">
    <div class="texto-tarefa">
        ${textoTarefa}
    </div>
    <div class="botao-tarefa">
        <img src="img/check.png" width="32" alt="Botão para finalizar tarefa"
            title="Botão para finalizar tarefa">
    </div>
</div>
</div>`

        // O innerHTML sempre destroi o HTML e renderiza novamente tudo, causando um problema nos eventos já incluídos
        // tarefas.innerHTML += tarefaNova;

        // tarefas.insertAdjacentHTML('afterbegin', tarefaNova);
        tarefas.insertAdjacentHTML('beforeend', tarefaNova);

        let objTarefaNova = tarefas.lastElementChild;
        let btnCheckTarefaNova = objTarefaNova.lastElementChild.lastElementChild;

        btnCheckTarefaNova.onclick = (event) => {
            // This perde a referência por
            // console.log(this);

            //Target traz a imagem

            //Elemento se autro destrói
            event.target.parentNode.parentNode.parentNode.remove();
            listaTarefas = listaTarefas.filter(valor => valor != textoTarefa);
            salvarLocalStorage(listaTarefas)

            //Pai remove o elemento filho
            // tarefas.removeChild(event.target.parentNode.parentNode.parentNode);
        };

        //    tarefas.forEach((tarefa)=>{
        //        tarefa.onclick = alert("Cliquei no botão");
        //    })


    });
}

mostrarNaTela(listaTarefas);

const criarTarefaComEnter = (event) => {

    if (event.keyCode == 13 || event.type == 'click') {

        // event.key == "Enter" || event.code == "Enter" ||
        let valorDigitado = inputTarefa.value;

        if (valorDigitado == "") {
            alert("Você deve digitar um valor primeiro");
            return
        }
        listaTarefas.push(valorDigitado);
        salvarLocalStorage(listaTarefas);
        inputTarefa.value = "";
        let tarefaNova = ` <div class="col-md-4">
<div class="card-tarefa">
    <div class="texto-tarefa">
        ${valorDigitado}
    </div>
    <div class="botao-tarefa">
        <img src="img/check.png" width="32" alt="Botão para finalizar tarefa"
            title="Botão para finalizar tarefa">
    </div>
</div>
</div>`
        // O innerHTML sempre destroi o HTML e renderiza novamente tudo, causando um problema nos eventos já incluídos
        // tarefas.innerHTML += tarefaNova;

        // tarefas.insertAdjacentHTML('afterbegin', tarefaNova);
        tarefas.insertAdjacentHTML('beforeend', tarefaNova);

        let objTarefaNova = tarefas.lastElementChild;
        let btnCheckTarefaNova = objTarefaNova.lastElementChild.lastElementChild;

        btnCheckTarefaNova.onclick = (event) => {
            // This perde a referência por
            // console.log(this);

            //Target traz a imagem

            //Elemento se autro destrói
            event.target.parentNode.parentNode.parentNode.remove();
            listaTarefas = listaTarefas.filter(valor => valor != valorDigitado);
            salvarLocalStorage(listaTarefas)

            //Pai remove o elemento filho
            // tarefas.removeChild(event.target.parentNode.parentNode.parentNode);
        };

        //    tarefas.forEach((tarefa)=>{
        //        tarefa.onclick = alert("Cliquei no botão");
        //    })

    }

}

inputTarefa.addEventListener('keypress', criarTarefaComEnter);
btnAddTarefa.addEventListener('click', criarTarefaComEnter);
