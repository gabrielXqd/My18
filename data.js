// Arquivo para armazenar e gerenciar os dados de confirmação

const GuestData = {
    // Array para armazenar os dados dos convidados
    guests: [],

    // Método para adicionar um novo convidado
    addGuest: function(guest) {
        // Adiciona o convidado ao array
        this.guests.push(guest);
        
        // Salva os dados no localStorage
        this.saveToLocalStorage();
        
        // Retorna o convidado adicionado
        return guest;
    },

    // Método para obter todos os convidados
    getAllGuests: function() {
        // Carrega os dados do localStorage antes de retornar
        this.loadFromLocalStorage();
        
        // Retorna o array de convidados
        return this.guests;
    },

    // Método para salvar os dados no localStorage
    saveToLocalStorage: function() {
        localStorage.setItem('birthdayGuests', JSON.stringify(this.guests));
    },

    // Método para carregar os dados do localStorage
    loadFromLocalStorage: function() {
        const storedData = localStorage.getItem('birthdayGuests');
        if (storedData) {
            this.guests = JSON.parse(storedData);
        }
    },

    // Método para exportar os dados como CSV
    exportAsCSV: function() {
        // Verifica se há convidados
        if (this.guests.length === 0) {
            return 'Nenhum convidado confirmado ainda.';
        }
        
        // Cabeçalho do CSV
        let csv = 'Nome,Telefone,Confirmação,Mensagem\n';
        
        // Adiciona cada convidado ao CSV
        this.guests.forEach(guest => {
            csv += `"${guest.name}","${guest.phone}","${guest.attendance}","${guest.message || ''}"\n`;
        });
        
        return csv;
    }
};

// Inicializa carregando dados do localStorage
GuestData.loadFromLocalStorage();

// Exporta o objeto GuestData
window.GuestData = GuestData;