export class StorageManager {
    constructor(storageKey = 'vg_portfolio_data') {
        this.storageKey = storageKey;
    }

    get(fallbackData = {}) {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                return Object.assign({}, fallbackData, JSON.parse(stored));
            }
        } catch (err) {
            console.warn('[StorageManager] Falha ao acessar LocalStorage:', err);
        }
        return Object.assign({}, fallbackData);
    }

    set(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (err) {
            console.error('[StorageManager] Erro ao gravar dados no LocalStorage:', err);
            return false;
        }
    }

    clear() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (err) {
            console.error('[StorageManager] Erro ao limpar dados:', err);
            return false;
        }
    }
}