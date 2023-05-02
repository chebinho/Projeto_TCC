var Solusao = [[]]
var Binario = [[]]
var Codigo = []

var Numero_Entradas = 2
var Numero_Saidas = 1

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

}

function Criar_Tabela(Entradas,Saidas){

    let Linhas = 2**Number(Entradas)
    
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
    let titulo_linha = []

    let VF = [[]]
    let VF_td = [[]]

    let input = [[]]
    let td = [[]]
    let tr = []

    // Cria o titulo
    for(l=65;l<(65+Number(Entradas));l++){
        titulo_elementos[l-65] = document.createTextNode(String.fromCharCode(l)) 
    }

    titulo_elementos[Entradas] = document.createTextNode("")

    for(c=Number(Entradas)+1;c<=(Number(Entradas)+Number(Saidas));c++){
        titulo_elementos[c] = document.createTextNode("S"+Number(c-Entradas))
    }
    
    tr[0] = document.createElement("tr")
    for(c=0;c<(Number(Entradas)+Number(Saidas)+1);c++){       
        titulo_linha[c] = document.createElement("td")
        titulo_linha[c].appendChild(titulo_elementos[c])
        tr[0].appendChild(titulo_linha[c])
    }
    table.appendChild(tr[0])

    // Criar o V F da tabela
    let conta_coluna = 0
    let conta_linha = 0

    let test = 0

    for(c=1;c<=(Linhas/2);c=c*2){
        for(l=0;l<(Linhas/c);l++){
            if(test == 1){
                test = 0
                for(a=0;a<c;a++){
                    VF[[conta_linha,conta_coluna]] = document.createTextNode("V")
                    Binario[[conta_linha,conta_coluna]] = "V"
                    conta_linha = conta_linha+1
                }
            }else{
                test = 1
                for(a=0;a<c;a++){
                    VF[[conta_linha,conta_coluna]] = document.createTextNode("F")
                    Binario[[conta_linha,conta_coluna]] = "F"
                    conta_linha = conta_linha+1
                }
            }
        }
        conta_coluna = conta_coluna + 1
        conta_linha = 0
    }
    for(c=0;c<Entradas;c++){
        for(l=0;l<Linhas;l++){

            VF_td[[l,c]] = document.createElement("td")
            VF_td[[l,c]].appendChild(VF[[l,c]])
        }
    }
    for(l=0;l<Linhas;l++){
        VF[[l,c]] = document.createTextNode("=")

        VF_td[[l,c]] = document.createElement("td")
        VF_td[[l,c]].appendChild(VF[[l,c]])
    }

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

    // adiciona as linhas nas colunas
    for(l=1;l<(Linhas+1);l++){
        tr[l] = document.createElement("tr")
        for(c=0;c<Number(Entradas)+1;c++){
            tr[l].appendChild(VF_td[[(l-1),c]])
        }
        for(c=0;c<Saidas;c++){
            tr[l].appendChild(td[[(l-1),c]])
        }
        table.appendChild(tr[l])
    }

    tabela.appendChild(table)
    console.log(tabela)

}
Criar_Tabela(2,1)

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
}

function Calculo(){

    let Linhas = 2**Number(Numero_Entradas)

    for(c=0;c<Numero_Saidas;c++){
        Codigo[c] = ""
        for(l=0;l<Linhas;l++){
            
            if(Solusao[[l,c]] == true){
                for(a=65;a<(65+Number(Numero_Entradas));a++){
                    
                    if(Binario[[l,(a-65)]] == "F"){
                        Codigo[c] = Codigo[c] + String.fromCharCode(a)
                        Codigo[c] = `${Codigo[c]}\"`
                        Codigo[c] = Codigo[c] + "."
                    }else{
                        Codigo[c] = Codigo[c] + String.fromCharCode(a)
                        Codigo[c] = Codigo[c] + "."
                    }
                    
                }
                Codigo[c] = Codigo[c].slice(0,-1)
                Codigo[c] = Codigo[c] + "+"
            }

        }
        Codigo[c] = Codigo[c].slice(0,-1)
        console.log("Solução "+Number(c+1)+" "+ Codigo[c])
    }
    console.log("------------")
    for(c=0;c<Numero_Saidas;c++){
        Codigo[c] = Simplificar(Codigo[c])
    }

    document.getElementById("Resultado_Bruto").innerHTML = "";
    document.getElementById("Resultado_Bruto").innerHTML = Codigo[0]
}

function Simplificar(Resumido){

//subistituir pelo teste

}

function tests(){

    // * 0 ou n
    // + 1 ou n
    // ? 0 ou 1
    // (A)(?!") = não pode ter " no final

    // X+(X’.Y) = X+Y

    let Resumido = 'A".B".C"+A.B".C"+A".B.C"+A.B.C"+A".B".C+A.B".C+A".B.C+A.B.C' // = A + B.C

    const situa_R_0 = /(0(\+|\.)0)|((0\.1)|(1\.0))|((([A-Z]"?)\.0)|(0\.([A-Z]"?)))|((([A-Z])"\.\13)(?!"))|((([A-Z])\.\16"))/g
    // 0+0 0.0 0.1 1.0 A.0 A".0 0.A 0.A" A".A A.A" = 0 !0
    const situa_R_1 = /(1(\.|\+)1)|((1\+0)|(0\+1))|(([A-Z]"?\+1)|(1\+[A-Z]"?))|((([A-Z])"\+\11)(?!"))|(([A-Z])\+\13")/g
    // 1.1 1+1 1+0 0+1 A+1 A"+1 1+A 1+A" A"+A A+A" = 1 !1
    const situa_R_AZ = /((([A-Z])(\+|\.)\3)(?!"))|((0\+([A-Z]))(?!"))|(([A-Z])\+0)|((1\.([A-Z]))(?!"))|(([A-Z])\.1)/g
    // A+A A.A A+0 0+A A.1 1.A = A !$3$7$9$12$14
    const situa_R_AZi = /(([A-Z]")\+0)|(0\+([A-Z]"))|(([A-Z]")\.1)|(1\.([A-Z]"))|(([A-Z]")(\+|\.)\10)/g
    // A"+A" A".A" A"+0 0+A" A".1 1.A" = A" !$2$4$6$8$10
    const situa_A_A = /([A-Z]"?)(?<seila>((\+|\.)(([A-Z]"?)(?<!\1)\4)+))\1/g
    // A+X+A = A+X
    const tira_parentes = /\((([A-Z]"?)|(1|0))\)/g
    // (A) = A
    const tira_rep_parentes = /\(\((.+)\)\)/g
    // ((A+Z)) = (A+Z)

    const abisor = /(([A-Z])\+\((\2(\.[A-Z]"?)+)\))|(([A-Z])\.\((\6(\+[A-Z])+)\))/g
    //A+(A.B) A+(A.A) A+(A.B.A) A.(A+B) A.(A+A) A.(A+B+A) A.(A+B"+A") = A !$2$6

    const distri_adi = /([A-Z])\+\(([A-Z](?<!\1))\.([A-Z](?<!\1|\2))\)/g // A+(B.C) = (A+B).(A+C) !($1+$2).($1+$3)
    const distri_mult = /([A-Z])\.\(([A-Z](?<!\1))\+([A-Z](?<!\1|\2))\)/ // A.(B+C) = A.B+A.C !$1.$2+$1.$3

    const distri_2 = /(\(([A-Z]"?)(\+|\.)([A-Z]"?)\))(\+|\.)(\(([A-Z]"?)\3([A-Z]"?)\))/g
    // (A+B).(D"+C) = (A.D")+(A.C)+(B.D")+(B.C) !($2$5$7)$3($2$5$8)$3($4$5$7)$3($4$5$8)
    const distri_3 = /(\(?([A-Z]"?)((\.|\+)([A-Z]"?))+\)?)(((\+|\.)(?<!\4))(\(?([A-Z]"?)((\.|\+)([A-Z]"?))+\)?))+/g
    // (A.D")+(A.C)+(B.D")+(B.C) = (A+B).(D"+C)

    const outra_adi = /([A-Z])\+\"\1\.([A-Z](?<!\1))/g // A + Ā.B = A + B
    const outra_mult = /\(([A-Z])\+([A-Z](?<!\1))\)\.\(\1\+([A-Z](?<!\1|\2))\)/g // (A+B).(A+C) = A+B.C

    const morgan = /\((([A-Z]"?)(\+|\.)?)+\)"/g // (A.B)’ = A'+B' !(/?/)
    //
    const comu_adi = 0 // A + B = B + A
    const comu_mult = 0 // A . B = B . A

    const asso_adi = 0 // A+(B+C) = (A+B)+C = A+B+C
    const asso_mult = 0 // A.(B.C) = (A.B).C = A.B.C

    console.log(Resumido)

    let conatador = 0
    let c = 1
    while(c != 0){
        if(Resumido.match(situa_R_0) != null){
            Resumido = Resumido.replace(situa_R_0,"0")
        }else if(Resumido.match(situa_R_1) != null){
            Resumido = Resumido.replace(situa_R_1,"1")
        }else if(Resumido.match(situa_R_AZ) != null){
            Resumido = Resumido.replace(situa_R_AZ,"$3$7$9$12$14")
        }else if(Resumido.match(situa_R_AZi) != null){
            Resumido = Resumido.replace(situa_R_AZi,"$2$4$6$8$10")

        }else if(Resumido.match(tira_parentes) != null){
            Resumido = Resumido.replace(tira_parentes,"$1")
        }else if(Resumido.match(tira_rep_parentes) != null){
            Resumido = Resumido.replace(tira_rep_parentes,"($1)")

        }else if(Resumido.match(situa_A_A) != null){
            Resumido = Resumido.replace(situa_A_A,"$1$<seila>")
            Resumido = Resumido.replace(/((\+)\+)|((\.)\.)/g,"$2$4")
        
        }else if(Resumido.match(abisor) != null){
            Resumido = Resumido.replace(abisor,"$2$6")

        }else if(Resumido.match(distri_adi) != null){
            Resumido = Resumido.replace(distri_adi,"($1+$2).($1+$3)")//
        }else if(Resumido.match(distri_mult) != null){  
            Resumido = Resumido.replace(distri_mult,"$1.$2+$1.$3")//
        }

        else if(Resumido.match(distri_3) != null){
            let a = Resumido.match(distri_3)
            let b = Resumido.match(distri_3)
            Resumido = Resumido.replace(distri_3,'(/?/)')
            let Letra_Repete = []

            for(l=0;l<b.length;l++){
                b[l] = b[l].replace(/(\(|\)|\.|\+)/g,"")
                let letra = b[l].match(/[A-Z]"?/g)
        
                let elemen = letra.filter(function(este, i) {
                    return letra.indexOf(este) === i;
                })

                var conta_elemen = []
                for(l2=0;l2<elemen.length;l2++){
                    conta_elemen[l2] = {
                        'letra':elemen[l2],
                        'quantidade':0
                    }
                }

                for(l2=0;l2<elemen.length;l2++){
                    for(l3=0;l3<letra.length;l3++){

                        if(conta_elemen[l2].letra == letra[l3]){
                            conta_elemen[l2].quantidade = conta_elemen[l2].quantidade +1

                        }
                    }
                }

                Letra_Repete[l] = conta_elemen.reduce(function(prev, current) { 
                    return prev.quantidade >= current.quantidade ? prev : current; 
                })
            }
            //console.log(Letra_Repete)
            for(l=0;l<a.length;l++){
                
                let Etapa_Final = ""

                let primeiro_sinal = a[l].replace(/\(?([A-Z]"?)\)?/g,"")
                let segundo_sinal = ""
                primeiro_sinal = primeiro_sinal.match(/^./)

                for(l2=0;l2<primeiro_sinal.length;l2++){
                    if(primeiro_sinal[l2] == "+"){
                        segundo_sinal = "."
                    }else{
                        segundo_sinal = "+"
                    }
                }
                //\(?([A-Z]"?(\.|\+))+[A-Z]"?\)?
                //(\(?([A-Z]"?)(\.|\+)(([A-Z]"?)\3)+([A-Z]"?)\)?)|(\(?((\+|\.|\(|\))([A-Z]"?)(\+|\.)(?<!\9)([A-Z]"?)\9)\)?)|(\([A-Z]"?(\+|\.)[A-Z]"?\))|(([A-Z]"?))
                let conjuntos = a[l].match(/(\(?([A-Z]"?)(\.|\+)(([A-Z]"?)\3)+([A-Z]"?)\)?)|(\(?((\+|\.)([A-Z]"?)(\+|\.)(?<!\9)([A-Z]"?)\9)\)?)|(\([A-Z]"?(\+|\.)[A-Z]"?\))|(([A-Z]"?))/g)
                let manten = segundo_sinal
                let tira_letra = ""

                for(l2=0;l2<conjuntos.length;l2++){
                    if(conjuntos[l2].match(RegExp(`(${Letra_Repete[l].letra})(?!")`,"g")) != null){
                        if(conjuntos[l2].match(/(\(?((\+|\.)([A-Z]"?)(\+|\.)(?<!\3)([A-Z]"?)\3)\)?)/g) != null){
                            conjuntos[l2] = conjuntos[l2].slice(0,-1)
                            conjuntos[l2] = conjuntos[l2].slice(1)
                        }
                        tira_letra = tira_letra + conjuntos[l2] + segundo_sinal
                    }else{
                        console.log(conjuntos[l2] +" -------")
                        if(conjuntos[l2].match(/(\(?((\+|\.)([A-Z]"?)(\+|\.)(?<!\3)([A-Z]"?)\3)\)?)/g) != null){
                            conjuntos[l2] = conjuntos[l2].slice(0,-1)
                            conjuntos[l2] = conjuntos[l2].slice(1)
                        }
                        manten = manten + conjuntos[l2] + segundo_sinal
                        console.log(manten +" <-----")
                    }
                }
                manten = manten.slice(0,-1)
                tira_letra = tira_letra.slice(0,-1)

                while(tira_letra.match(RegExp(`(${Letra_Repete[l].letra})(?!")`,"g")) != null){
                    tira_letra = tira_letra.replace(Letra_Repete[l].letra,"")
                }
                
                
                tira_letra = tira_letra.replace(/((\.)\.)|((\+)\+)/g,"$2$4")
                tira_letra = tira_letra.replace(/\((\.|\+)/g,"(")
                tira_letra = tira_letra.replace(/(\.|\+)\)/g,")")
                tira_letra = tira_letra.replace(/^(\+|\.)/g,"")

                if(segundo_sinal == "+"){
                    tira_letra = tira_letra.replace(/(\+\.)|(\.\+)/g,"+")
                }else{
                    tira_letra = tira_letra.replace(/(\+\.)|(\.\+)/g,".")
                }
                console.log(manten + " final")

                Etapa_Final = Etapa_Final + Letra_Repete[l].letra
                Etapa_Final = Etapa_Final + primeiro_sinal + "("
                Etapa_Final = Etapa_Final + tira_letra
                Etapa_Final = Etapa_Final + ")" + manten

                Resumido = Resumido.replace(/\(\/\?\/\)/,Etapa_Final)
            }

        }else if(Resumido.match(morgan) != null){
            let a = Resumido.match(morgan)
            Resumido = Resumido.replace(morgan,'(/?/)')

            for(l=0;l<a.length;l++){
                a[l] = a[l].replace(/([A-Z]"?)/g,'$1"')
                a[l] = a[l].replace(/\((.+)\)\"/g,'$1')
                a[l] = a[l].replace(/""/g,'')
                Resumido = Resumido.replace(/\(\/\?\/\)/,a[l])
            }
        }else{
            c = c-1
        }
        conatador += 1
        console.log(Resumido)
    }

    console.log(conatador+" passos")
    
}

let vari = '12345'
console.log(vari.slice(1))


/*

let current_counter = 1;
let regex = new RegExp(`\\[${current_counter}\\]`, 'g');
let novo_valor = 'teste[1]'.replace(regex, `[${current_counter + 1}]`);
console.log(novo_valor); // teste[2]

*/