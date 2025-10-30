document.addEventListener('DOMContentLoaded', () => {
    // Adiciona o 'click' para abrir o seletor de data
    document.querySelectorAll('.date-filter-wrapper').forEach(wrapper => {
        const input = wrapper.querySelector('.date-input-field');
        if(input) {
            // Tenta abrir o date picker nativo ao clicar no wrapper
            wrapper.addEventListener('click', () => {
                 try {
                    input.showPicker();
                 } catch (e) {
                     // Fallback para navegadores que não suportam showPicker()
                     input.click();
                 }
            });
        }
    });
});