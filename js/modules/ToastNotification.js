export class ToastNotification {
    constructor(toastElementId = 'toast-notification') {
        this.toastEl = document.getElementById(toastElementId);
        this.timer = null;
    }

    show(message, type = 'success', duration = 4000) {
        if (!this.toastEl) return;

        const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';
        const color = type === 'success' ? '#10b981' : '#00d4ff';

        this.toastEl.innerHTML = `<i class="fa-solid ${icon}" style="color: ${color};"></i> <span>${message}</span>`;
        this.toastEl.classList.add('show');

        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.toastEl.classList.remove('show');
        }, duration);
    }
}