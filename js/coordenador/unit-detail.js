document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('#collaboratorTabs .nav-link');
    const tabPanes = document.querySelectorAll('#collaboratorTabsContent .tab-pane');

function carregarStatusUnidadeDetalhe() {
        // Este código assume que esta página (unit-detail) é SEMPRE sobre o Jardim Ângela
        // Se fosse dinâmico, teríamos que ler a URL
        const statusJardimAngela = localStorage.getItem('sigo_status_unidade_JardimAngela');
        const badgeElement = document.getElementById('status-unidade-JardimAngela');

        if (badgeElement && statusJardimAngela === 'Ativa') {
            badgeElement.textContent = 'Ativa';
            badgeElement.classList.remove('badge-secondary', 'badge-danger');
            badgeElement.classList.add('badge-success');
        } else if (badgeElement) {
            badgeElement.textContent = 'Inativa';
            badgeElement.classList.remove('badge-success');
            badgeElement.classList.add('badge-secondary');
        }
    }

    // Carrega o status ao abrir a página
    carregarStatusUnidadeDetalhe();



    if (tabs.length > 0 && tabPanes.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function (event) {
                event.preventDefault();

                // Desativar todas as abas e painéis
                tabs.forEach(t => t.classList.remove('active'));
                tabPanes.forEach(p => {
                    p.classList.remove('active', 'show');
                });

                // Ativar a aba clicada
                this.classList.add('active');

                // Ativar o painel correspondente
                const targetPaneId = this.getAttribute('data-bs-target');
                const targetPane = document.querySelector(targetPaneId);
                if (targetPane) {
                    targetPane.classList.add('active', 'show');
                }
            });
        });
    }
});