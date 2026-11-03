import { StorageManager } from './modules/StorageManager.js';
import { ToastNotification } from './modules/ToastNotification.js';
import { UserProfile } from './modules/UserProfile.js';
import { ModalManager } from './modules/ModalManager.js';
import { PitchPlayer } from './modules/PitchPlayer.js';
import { TerminalDiagnostics } from './modules/TerminalDiagnostics.js';
import { PDFExporter } from './modules/PDFExporter.js';
import { NavigationController } from './modules/NavigationController.js';
import { ContactFormHandler } from './modules/ContactFormHandler.js';
import { PWAInstaller } from './modules/PWAInstaller.js';

export class PortfolioApp {
    constructor() {
        this.storage = new StorageManager();
        this.toast = new ToastNotification();
        this.userProfile = new UserProfile(this.storage, this.toast);
        this.modal = new ModalManager('config-modal', this.userProfile);
        this.pitchPlayer = new PitchPlayer(this.toast);
        this.terminal = new TerminalDiagnostics();
        this.pdfExporter = new PDFExporter(this.toast, this.userProfile);
        this.navigation = new NavigationController();
        this.contactForm = new ContactFormHandler(this.toast);
        this.pwa = new PWAInstaller(this.toast);
    }

    start() {
        this.userProfile.render();
        console.log('[PortfolioApp] Inicializado com sucesso em ES Modules + PWA.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    app.start();
    window.portfolioApp = app;
});
