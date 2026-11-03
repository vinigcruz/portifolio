export class PDFExporter {
    constructor(toast) {
        this.toast = toast;
        this.init();
    }

    init() {
        const buttons = [
            document.getElementById('btn-export-pdf'),
            document.getElementById('btn-export-pdf-nav'),
            document.getElementById('hero-pdf-trigger'),
            document.getElementById('footer-btn-pdf')
        ].filter(Boolean);

        buttons.forEach(btn => btn.addEventListener('click', () => this.export()));
    }

    export() {
        this.toast.show('Gerando prévia do Portfólio... Selecione "Salvar como PDF" no assistente!', 'info', 5000);
        setTimeout(() => {
            window.print();
        }, 600);
    }
}