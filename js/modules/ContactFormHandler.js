export class ContactFormHandler {
    constructor(toast) {
        this.toast = toast;
        this.form = document.getElementById('contact-form');
        this.feedback = document.getElementById('form-feedback');
        this.init();
    }

    init() {
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submit();
        });
    }

    submit() {
        const name = document.getElementById('form-name').value;
        if (this.feedback) {
            this.feedback.className = 'form-feedback success';
            this.feedback.innerHTML = `<strong>Mensagem registrada com sucesso!</strong> Obrigado pelo contato, ${name}. Retornarei em breve.`;
            this.form.reset();
        }
        this.toast.show('Mensagem enviada com sucesso!');
    }
}