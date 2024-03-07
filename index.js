const input = document.querySelector('input');
const div = document.querySelector('div');

const operadoresSuportados = [ 
    '-',
    '+',
    '*',
    '/',
 ];

input.addEventListener('input', (e)=>{
    input.setAttribute('placeholder', 'Insira o calculo 🤖');
input.value = e.target.value.replace(/[^\d-*/+()]+/g, '');
})


input.addEventListener('keyup', (e)=>{
    if(e.code == 'Enter'){
        try{
            const calculo = calcula(input.value);
        renderizar(calculo)



        }catch(err){
            
            input.value = '';

            input.setAttribute('placeholder', 'Operação inválida ⚠️')

        }




        
    }
});

function obterCorResultado (resultado){
    if(resultado >= 0){
        return '#77a6ef';
    }else if(resultado < 0){
        return '#FF0000'

    }
    

}



function renderizar(calculo){
    const span = document.createElement('span');

    let calculoFormatado = calculo.operaçao;

    for(let i=0; i<operadoresSuportados.length; i++){
        let arrCaracteres = calculoFormatado.split(operadoresSuportados[i])
        calculoFormatado = arrCaracteres.join(` ${operadoresSuportados[i]} `)
    }

    span.innerHTML= ` 
    ${calculoFormatado} =
    <span style="color: ${obterCorResultado(calculo.resultado)}">
    ${calculo.resultado}
    </span>
    <br>

    
    `;

    div.insertBefore(span, div.firstChild);
    input.value = calculo.resultado;
}

function calcula(entrada){
    entrada = removerUltimoCaracter(entrada);
    return {
        operaçao: entrada,
        resultado: eval(entrada)
    }
}

function removerUltimoCaracter(entrada){
    const caracteres = entrada.split('');
    if(operadoresSuportados.filter(x => x.includes(caracteres.at(-1))).length >0 ){
        return entrada.substring(0, entrada.length - 1);
    }
    return entrada;
}