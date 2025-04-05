document.addEventListener('DOMContentLoaded', function() {
    // Configuração da data do evento
    const eventDate = new Date('2025-05-24T12:00:00').getTime();
    
    // Atualização da contagem regressiva
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = eventDate - now;
        
        // Cálculo de dias, horas, minutos e segundos
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Atualização dos elementos HTML
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Se a contagem regressiva terminou
        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    // Inicialização da contagem regressiva
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Manipulação do formulário de confirmação
    const form = document.getElementById('confirmation-form');
    const modal = document.getElementById('confirmation-modal');
    const closeButton = document.querySelector('.close-button');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coleta os dados do formulário
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const attendance = document.querySelector('input[name="attendance"]:checked').value;
            const message = document.getElementById('message').value;
            
            // Cria um objeto com os dados do convidado
            const guestData = {
                name: name,
                phone: phone,
                attendance: attendance,
                message: message,
                date: new Date().toISOString()
            };
            
            // Salva os dados usando o objeto GuestData
            GuestData.addGuest(guestData);
            
            // Exibição do modal de confirmação
            modal.style.display = 'flex';
            
            // Limpar o formulário
            form.reset();
        });
    }
    
    // Fechar o modal quando o botão de fechar for clicado
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Fechar o modal quando clicar fora dele
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Animações de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
});