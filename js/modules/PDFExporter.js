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

        const profile = this.userProfile ? this.userProfile.getProfile() : {};
        const resumeUrl = profile.resumeUrl || './curriculo.pdf';

        buttons.forEach((btn) => {
            if (btn.tagName === 'A') {
                btn.href = resumeUrl;
                btn.target = '_blank';
                btn.rel = 'noopener noreferrer';
            }
            btn.addEventListener('click', (e) => {
                this.toast.show('Abrindo currículo em PDF...', 'info', 3500);
                if (btn.tagName !== 'A') {
                    e.preventDefault();
                    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
                }
            });
        });
    }
}
