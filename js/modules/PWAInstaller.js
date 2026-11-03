export class PWAInstaller {
    constructor(toast) {
        this.toast = toast;
        this.deferredPrompt = null;
        this.installButtons = [
            document.getElementById('btn-install-pwa'),
            document.getElementById('btn-install-pwa-hero')
        ].filter(Boolean);

        this.init();
    }

    init() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js').catch((err) => {
                    console.warn('[PWAInstaller] Falha ao registrar Service Worker:', err);
                });
            });
        }

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.installButtons.forEach((btn) => {
                btn.style.display = 'inline-flex';
            });
        });

        window.addEventListener('appinstalled', () => {
            this.deferredPrompt = null;
            this.installButtons.forEach((btn) => {
                btn.style.display = 'none';
            });
            if (this.toast) {
                this.toast.show('App instalado com sucesso na tela inicial!');
            }
        });

        this.installButtons.forEach((btn) => {
            btn.addEventListener('click', () => this.promptInstall());
        });
    }

    async promptInstall() {
        if (this.deferredPrompt) {
            this.deferredPrompt.prompt();
            await this.deferredPrompt.userChoice;
            this.deferredPrompt = null;
        } else {
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (isIOS) {
                this.toast.show('No iPhone/iPad: toque em Compartilhar e selecione "Adicionar à Tela de Início".', 'info', 6000);
            } else {
                this.toast.show('Abra o menu do navegador (⋮) e selecione "Instalar aplicativo" ou "Adicionar à tela inicial".', 'info', 5500);
            }
        }
    }
}

