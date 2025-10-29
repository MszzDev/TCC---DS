document.addEventListener('DOMContentLoaded', () => {

    // --- Elementos ---
    const form = document.getElementById('solicitation-form');
    const triggerBtn = document.getElementById('trigger-solicitar-btn');
    const modal = document.getElementById('confirmation-modal');
    const cancelBtn = document.getElementById('cancel-send-btn');
    const confirmBtn = document.getElementById('confirm-send-btn');
    const successToast = document.getElementById('success-message');
    const errorToast = document.getElementById('error-message'); // Adicionado para erros

    // --- Funções de Toast ---
    function showToast(element, message, duration = 3000) {
        element.textContent = message;
        element.classList.add('visible');
        setTimeout(() => {
            hideToast(element);
        }, duration);
    }

    function hideToast(element) {
        element.classList.remove('visible');
    }

    // --- Funções do Modal ---
    function showModal() {
        modal.classList.add('visible');
    }

    function hideModal() {
        modal.classList.remove('visible');
    }

    // --- Validação e Coleta de Dados ---
    function getFormData() {
        const data = {
            // Campos readonly são pegos pelo value, que deve estar correto no HTML
            unidade: document.getElementById('unidade').value.trim(),
            supervisor: document.getElementById('supervisor').value.trim(),
            turno: document.getElementById('turno').value.trim(),
            // Campos preenchidos pelo usuário
            colaborador: document.getElementById('colaborador').value.trim(),
            horaInicio: document.getElementById('hora-inicio').value,
            horaFim: document.getElementById('hora-fim').value,
            motivo: document.getElementById('motivo').value.trim()
        };

        const requiredFields = [
            // Readonly fields are pre-filled, focus on user inputs
            { key: 'colaborador', label: 'Quantidade de Colaboradores', elementId: 'colaborador' },
            { key: 'horaInicio', label: 'Hora de Início', elementId: 'hora-inicio' },
            { key: 'horaFim', label: 'Hora de Fim', elementId: 'hora-fim' },
            { key: 'motivo', label: 'Motivo', elementId: 'motivo' }
        ];

        // Validação de campos obrigatórios
        for (const field of requiredFields) {
            if (!data[field.key]) { // Verifica se está vazio ou é null/undefined
                showToast(errorToast, `Erro: O campo '${field.label}' é obrigatório.`);
                document.getElementById(field.elementId)?.focus(); // Opcional: focar no campo
                return null; // Indica erro
            }
        }

        // Validação específica de quantidade (deve ser número positivo)
        const colaboradores = parseInt(data.colaborador);
        if (isNaN(colaboradores) || colaboradores <= 0) {
            showToast(errorToast, 'Erro: A quantidade de colaboradores deve ser um número positivo.');
            document.getElementById('colaborador')?.focus();
            return null;
        }

        // Validação básica de hora (só verifica se foram selecionados)
        if (data.horaInicio === "" || data.horaFim === "") {
             showToast(errorToast, 'Erro: Selecione Hora de Início e Fim.');
             // Poderia focar no primeiro select vazio
             return null;
        }

        // Validação adicional (opcional): verificar se hora fim > hora início
        // (Isso pode ser mais complexo dependendo dos formatos)

        return data; // Retorna dados se válidos
    }

    // --- Handlers de Eventos ---

    // Botão "Solicitar": Valida e abre o modal
    triggerBtn.addEventListener('click', () => {
        const data = getFormData(); // Tenta obter e validar os dados
        if (data) {
            showModal(); // Se válido, mostra modal de confirmação
        }
    });

    // Botão "Cancelar" no modal: Fecha o modal
    cancelBtn.addEventListener('click', hideModal);

    // Botão "Confirmar" no modal: Processa o envio
    confirmBtn.addEventListener('click', () => {
        const data = getFormData(); // Revalida (caso algo tenha mudado, embora improvável)
        if (data) {
            // 1. Esconde o modal
            hideModal();

            // 2. Simula o envio (substituir por lógica de backend real)
            console.log('--- Dados da Solicitação Enviada ---');
            console.log('Unidade:', data.unidade);
            console.log('Supervisor:', data.supervisor);
            console.log('Turno:', data.turno);
            console.log('Qtd Colaboradores:', data.colaborador);
            console.log('Período:', `${data.horaInicio} às ${data.horaFim}`);
            console.log('Motivo:', data.motivo);
            console.log('------------------------------------');

            // 3. Exibe mensagem de sucesso
            showToast(successToast, 'Solicitação enviada com sucesso!');

            // 4. Limpa o formulário após um pequeno atraso
            setTimeout(() => {
                form.reset(); // Método mais simples para limpar forms
                 // document.getElementById('colaborador').value = '';
                 // document.getElementById('hora-inicio').value = '';
                 // document.getElementById('hora-fim').value = '';
                 // document.getElementById('motivo').value = '';
            }, 500); // Meio segundo
        } else {
             // Se a revalidação falhar (improvável aqui, mas bom ter)
             hideModal(); // Garante que o modal feche
             // A mensagem de erro já foi mostrada por getFormData()
        }
    });

     // Fechar modal clicando fora
     modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

});