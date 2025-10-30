// js/coordenador/prelecoes.js
document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DE CARREGAR A TABELA ---
    function carregarPrelecoes() {
        const tabela = document.querySelector('.table tbody');
        if (!tabela) return;

        tabela.innerHTML = ''; // Limpa a tabela

        const prelecoesSalvas = localStorage.getItem('sigo_prelecoes');
        const listaPrelecoes = prelecoesSalvas ? JSON.parse(prelecoesSalvas) : [];

        if (listaPrelecoes.length === 0) {
            tabela.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">Nenhuma preleção encontrada.</td></tr>';
            return;
        }

        listaPrelecoes.forEach(prelecao => {
            // Define o badge de status
            let statusBadge = '';
            if (prelecao.status === 'Concluída') {
                statusBadge = `<span class="badge badge-success">Concluída</span>`;
            } else if (prelecao.status === 'Agendada') {
                statusBadge = `<span class="badge badge-info">Agendada</span>`;
            } else if (prelecao.status === 'Cancelada') {
                statusBadge = `<span class="badge badge-danger">Cancelada</span>`;
            }

            const novaLinha = document.createElement('tr');
            novaLinha.innerHTML = `
                <td>${prelecao.titulo}</td>
                <td><span>${prelecao.responsavel} <small class="text-muted d-block">${prelecao.cargo}</small></span></td>
                <td>${prelecao.data}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary ver-detalhes" data-id="${prelecao.id}">
                       Ver Detalhes
                    </button>
                </td>
            `;
            tabela.appendChild(novaLinha);
        });
        
        // RE-ADICIONA os eventos de clique aos novos botões
        adicionarEventosModal();
    }

    // --- LÓGICA DO MODAL (ATUALIZADA) ---
    const modal = document.getElementById('modal-detalhes');
    const closeBtn = modal.querySelector('.close-btn');
    const btnFechar = modal.querySelector('.btn-fechar');
    
    function adicionarEventosModal() {
        const detalhesBtns = document.querySelectorAll('.ver-detalhes');

        detalhesBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const prelecaoId = Number(btn.dataset.id);
                if (!prelecaoId) return;

                // Busca os dados da preleção no localStorage
                const prelecoesSalvas = localStorage.getItem('sigo_prelecoes');
                const listaPrelecoes = prelecoesSalvas ? JSON.parse(prelecoesSalvas) : [];
                const prelecao = listaPrelecoes.find(p => p.id === prelecaoId);

                if (!prelecao) {
                    alert("Erro: não foi possível encontrar os detalhes da preleção.");
                    return;
                }

                // Preenche o modal com os dados do localStorage
                document.getElementById('det-titulo').innerText = prelecao.titulo;
                document.getElementById('det-responsavel').innerText = prelecao.responsavel;
                document.getElementById('det-cargo').innerText = prelecao.cargo;
                document.getElementById('det-data').innerText = prelecao.data;
                document.getElementById('det-status').innerText = prelecao.status;
                document.getElementById('det-unidade').innerText = prelecao.unidade;
                document.getElementById('det-supervisor').innerText = prelecao.supervisor;
                document.getElementById('det-turno').innerText = prelecao.turno;
                document.getElementById('det-selecao').innerText = prelecao.responsavel; // "Responsável pela Seleção" (usando o campo responsavel)
                document.getElementById('det-funcoes').innerText = prelecao.funcoes;

                modal.classList.add('show'); // Usa a classe CSS para exibir
            });
        });
    }

    const fecharModal = () => modal.classList.remove('show');
    
    closeBtn.addEventListener('click', fecharModal);
    btnFechar.addEventListener('click', fecharModal);
    window.addEventListener('click', e => { if (e.target === modal) fecharModal(); });
    
    // --- INICIALIZAÇÃO ---
    carregarPrelecoes();
});