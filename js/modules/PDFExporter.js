export class PDFExporter {
    constructor(toast, userProfile) {
        this.toast = toast;
        this.userProfile = userProfile;
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
        const profile = this.userProfile ? this.userProfile.getProfile() : {};
        const resumeUrl = profile.resumeUrl || './curriculo.pdf';

        this.toast.show('Abrindo currículo em PDF...', 'info', 3500);
        window.open(resumeUrl, '_blank', 'noopener,noreferrer');
    }
}
