export class ModalManager {
    constructor(modalId = 'config-modal', userProfileInstance) {
        this.modalEl = document.getElementById(modalId);
        this.userProfile = userProfileInstance;
        this.init();
    }

    init() {
        if (!this.modalEl) return;

        const openTriggers = [
            document.getElementById('btn-open-config'),
            document.getElementById('btn-open-config-nav'),
            document.getElementById('footer-btn-config')
        ].filter(Boolean);

        openTriggers.forEach(btn => btn.addEventListener('click', () => this.open()));

        const closeBtn = document.getElementById('modal-close-btn');
        if (closeBtn) closeBtn.addEventListener('click', () => this.close());

        this.modalEl.addEventListener('click', (e) => {
            if (e.target === this.modalEl) this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) this.close();
        });

        const form = document.getElementById('portfolio-config-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSave();
            });
        }

        const resetBtn = document.getElementById('btn-reset-default');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (confirm('Deseja restaurar as informações padrões do portfólio?')) {
                    this.userProfile.resetToDefault();
                    this.close();
                }
            });
        }
    }

    isOpen() {
        return this.modalEl && this.modalEl.classList.contains('active');
    }

    open() {
        if (!this.modalEl) return;
        this.userProfile.syncFormFields();
        this.modalEl.style.display = 'flex';
        requestAnimationFrame(() => {
            this.modalEl.classList.add('active');
        });
    }

    close() {
        if (!this.modalEl) return;
        this.modalEl.classList.remove('active');
        setTimeout(() => {
            this.modalEl.style.display = 'none';
        }, 200);
    }

    handleSave() {
        const updated = {
            name: document.getElementById('cfg-name').value.trim(),
            age: document.getElementById('cfg-age').value.trim(),
            email: document.getElementById('cfg-email').value.trim(),
            phone: document.getElementById('cfg-phone').value.trim(),
            linkedin: document.getElementById('cfg-linkedin').value.trim(),
            github: document.getElementById('cfg-github').value.trim(),
            pitchUrl: document.getElementById('cfg-pitch').value.trim()
        };

        this.userProfile.updateProfile(updated);
        this.close();
    }
}