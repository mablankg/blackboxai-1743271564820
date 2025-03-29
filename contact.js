document.addEventListener('DOMContentLoaded', () => {
    // LGPD Popup handling
    const lgpdPopup = document.getElementById('lgpdPopup');
    const acceptBtn = document.getElementById('acceptLGPD');
    const rejectBtn = document.getElementById('rejectLGPD');

    // Check if user has already accepted LGPD
    if (!localStorage.getItem('lgpdAccepted')) {
        lgpdPopup.style.display = 'flex';
    } else {
        lgpdPopup.style.display = 'none';
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('lgpdAccepted', 'true');
        lgpdPopup.style.opacity = '0';
        setTimeout(() => {
            lgpdPopup.style.display = 'none';
        }, 300);
    });

    rejectBtn.addEventListener('click', () => {
        // Redirect to homepage if user rejects LGPD
        window.location.href = 'index.html';
    });

    // Form handling
    const form = document.getElementById('contactForm');
    const whatsappInput = document.getElementById('whatsapp');
    const interestSelect = document.getElementById('interest');

    // WhatsApp input mask
    whatsappInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
        if (value.length > 9) {
            value = `${value.slice(0, 9)}-${value.slice(9)}`;
        }
        
        e.target.value = value;
    });

    // Form validation and submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate LGPD acceptance
        if (!localStorage.getItem('lgpdAccepted')) {
            alert('Por favor, aceite nossa Política de Privacidade para continuar.');
            return;
        }

        // Validate area of interest
        if (!interestSelect.value) {
            alert('Por favor, selecione uma área de interesse.');
            interestSelect.focus();
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Email configuration
        const emailConfig = {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'xxxxxxxxxx@gmail.com',
                pass: 'xxxx xxxx xxxx xxxx'
            }
        };

        try {
            // Here you would typically send the data to your server
            // For this example, we'll just log it and show a success message
            console.log('Form data:', data);
            console.log('Email config:', emailConfig);

            // Show success message
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            form.reset();
            
            // Redirect to homepage after successful submission
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
        }
    });

    // Back button handling
    const backButton = document.querySelector('a[href="index.html"]');
    if (backButton) {
        backButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
});
