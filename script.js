const formu = document.querySelector(".formulario")
const mascara = document.querySelector(".mascara-formulario")


function cliqueiNobotao(){
    formu.style.visibility= "visible"
    formu.style.left= '10%'
    form .style .transition= '0.5s liniar'
    mascara.style.visibility="visible"
    

}
function cliqueinatela(){
    formu.style.visibility="hidden"
    formu .style .transition= '0.5s linear'
    formu.style.left= '-700px'
    mascara.style.visibility="hidden" 
}

const form = document.getElementById('agendamentoForm');
const agendamentos = {};
const funcionarios = {
    'Walace': '5581994944344', // Substitua pelo número do WhatsApp do Funcionário 1
    'Henrique': '5581971092205', // Substitua pelo número do WhatsApp do Funcionário 2
    'Danilo': '5581994944344'  // Substitua pelo número do WhatsApp do Funcionário 3
};

const input = document.getElementById('data');
input.addEventListener('input', function() {
const date = new Date(input.value);
const day = date.getUTCDay();
if (day === 0 || day === 7) {
alert('Por favor, selecione um dia útil (segunda a sábado).');
input.value = '';
}
});

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = form.nome.value;
    const email = form.email.value;
    const telefone = form.telefone.value;
    const opcoesSelecionadas = Array.from(form.opcoes.selectedOptions).map(option => option.text);
    const funcionario = form.funcionario.value;
    const data = form.data.value;
    const horario = form.horario.value;

    const chave = `${data}-${horario}`;

    if (!agendamentos[chave]) {
        agendamentos[chave] = [];
    }

    // Verifica se o funcionário já está agendado para o horário
    if (agendamentos[chave].includes(funcionario)) {
        alert('Esse funcionário já está ocupado nesse horário. Por favor, escolha outro funcionário ou horário.');
        return;
    }

    // Adiciona o agendamento
    agendamentos[chave].push(funcionario);

    // Monta a mensagem do WhatsApp
    const numeroWhatsApp = funcionarios[funcionario];
    const mensagem = `Olá, ${funcionario}! Um novo agendamento foi feito.\n\n` +
                     `Nome: ${nome}\n` +
                     `Email: ${email}\n` +
                     `Telefone: ${telefone}\n` +
                     `Opções: ${opcoesSelecionadas.join(', ')}\n` +
                     `Data: ${data}\n` +
                     `Horário: ${horario}`;

    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    // Abre o link para o WhatsApp
    window.open(urlWhatsApp, '_blank');

    alert(`Agendamento realizado com sucesso para ${nome} às ${horario} com ${funcionario}!`);
    form.reset();
});
