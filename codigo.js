var Solusao = [[]]
var Numero_Entradas
var Numero_Saidas

function Ler_fomulario(){

    Numero_Entradas = document.getElementById("Numero_Entradas").value
    Numero_Saidas = document.getElementById("Numero_Saidas").value

    if(Numero_Entradas < 2){
        Numero_Entradas = 2
    }
    if(Numero_Saidas < 1){
        Numero_Saidas = 1
    }

    Criar_Tabela(Numero_Entradas,Numero_Saidas)

    document.getElementById("Valores").innerHTML = ""
    document.getElementById("Valores").innerHTML = "Numero_Entradas = " + Numero_Entradas + " " + "Numero_Saidas = "+Numero_Saidas

}

function Criar_Tabela(Entradas,Saidas){

    let Linhas = 2
    
    // limpa a tabela antes de criar a nova
    var container = document.querySelector("#Tabela");
    var p = document.querySelector("#Tabela table");
    if(p != null){
        container.removeChild(p);
    }

    // Cria a tabela principal
    let tabela = document.getElementById("Tabela")
    let table = document.createElement("table")
    table.setAttribute("id", "remover")

    let titulo_elementos = []
    let titulo_linha 
    let input = [[]]
    let td = [[]]
    let tr = []

    for(a=0;a<(Entradas-1);a++){
        Linhas = Linhas*2
    }
    

    titulo_linha = document.createElement("td")

    // limpa as variaveis e cria botão
    for(c=0;c<Saidas;c++){
        for(l=0;l<Linhas;l++){
        
            Solusao[[l,c]] = false

            input[[l,c]] = document.createElement("input")
            input[[l,c]].type="button"
            input[[l,c]].value="F"
            input[[l,c]].setAttribute("id",""+l+c)
            input[[l,c]].setAttribute("onclick","Ler_Botao("+l+","+c+")")

            td[[l,c]] = document.createElement("td")
            td[[l,c]].appendChild(input[[l,c]])

        }
    }
    tr[0] = document.createElement("tr")
    tr[0].appendChild(titulo_linha)
    table.appendChild(tr[0])
    // adiciona os botões nas colunas
    for(l=0;l<Linhas;l++){
        tr[l] = document.createElement("tr")  
        for(c=0;c<Saidas;c++){
            tr[l].appendChild(td[[l,c]])
        }
        table.appendChild(tr[l])
    }
    
 
    tabela.appendChild(table)

    console.log(tabela)

}

function Ler_Botao(Botao,Tamanho){

    let id_botao = document.getElementById(""+Botao+Tamanho)

    if(Solusao[[Botao,Tamanho]] == true){
        Solusao[[Botao,Tamanho]] = false
        id_botao.setAttribute("value", "F")
    }else{
        Solusao[[Botao,Tamanho]] = true
        id_botao.setAttribute("value", "V")
    }
    console.log(Solusao[[Botao,Tamanho]] + " " + Botao+"/"+Tamanho)
    Calculo(Botao,Tamanho)
}

function Calculo(Botao,Tamanho){









    document.getElementById("Resultado_Bruto").innerHTML = "";
    document.getElementById("Resultado_Bruto").innerHTML = "funciona";
}

function tests(){

    let letras
    for(l=65;l<90;l++){
        letras = String.fromCharCode(l)
        console.log(letras)
    }

}
