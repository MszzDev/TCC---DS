// js/coordenador/solicitacoes.js
document.addEventListener('DOMContentLoaded', () => {
    
    // Função para carregar as solicitações na tabela
    function carregarSolicitacoes() {
        const tabela = document.querySelector('.table tbody');
        if (!tabela) {
            console.error("Tabela <tbody> não encontrada.");
            return;
        }

        // Limpa a tabela (exceto os dados estáticos que já estão no HTML, se houver)
        // Para esta simulação, vamos limpar tudo e recarregar
        tabela.innerHTML = ''; 

        // Pega os dados do localStorage
        const solicitacoesSalvas = localStorage.getItem('sigo_solicitacoes');
        const listaSolicitacoes = solicitacoesSalvas ? JSON.parse(solicitacoesSalvas) : [];

        if (listaSolicitacoes.length === 0) {
            // (Opcional) Mostrar uma mensagem se não houver nada
            tabela.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px;">Nenhuma solicitação pendente encontrada.</td></tr>';
            return;
        }

        // Adiciona cada solicitação à tabela
        listaSolicitacoes.forEach(solicitacao => {
            
            // Define o conteúdo do status/ação
            let statusHtml = '';
            if (solicitacao.status === 'Pendente') {
                // Link para a página de aprovação (passando o ID pela URL)
                statusHtml = `<a href="aprovar-solicitacao.html?id=${solicitacao.id}" class="btn btn-sm btn-outline-primary">Analisar</a>`;
            } else if (solicitacao.status === 'Aprovado') {
                statusHtml = `<span class="badge badge-success">Aprovado</span>`;
            } else if (solicitacao.status === 'Recusado') {
                statusHtml = `<span class="badge badge-danger">Recusado</span>`;
            }

            // Cria a nova linha (tr)
            const novaLinha = document.createElement('tr');
            novaLinha.innerHTML = `
                <td>
                    <span>${solicitacao.solicitante} <small class="text-muted d-block">${solicitacao.cargo}</small></span>
                </td>
                <td>${solicitacao.turno}</td>
                <td>${solicitacao.data}</td>
                <td>${statusHtml}</td>
            `;
            
            tabela.appendChild(novaLinha);
        });
    }

    // Carrega as solicitações assim que a página é aberta
    carregarSolicitacoes();
});