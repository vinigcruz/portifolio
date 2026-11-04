export class PitchPlayer {
    constructor(toast) {
        this.toast = toast;
        this.playBtn = document.getElementById('play-pitch-btn');
        this.simPlayer = document.getElementById('simulated-player');
        this.closeSimBtn = document.getElementById('close-sim-player');
        this.playPauseBtn = document.getElementById('sim-play-pause-btn');
        this.teleprompter = document.getElementById('sim-teleprompter');
        this.progressFill = document.getElementById('sim-progress-fill');
        this.progressBar = document.getElementById('sim-bar-container');
        this.timeDisplay = document.getElementById('sim-time');
        this.waveAnimation = document.getElementById('speaking-wave');
        this.copyBtn = document.getElementById('btn-copy-pitch-link');

        this.timer = null;
        this.currentSeconds = 0;
        this.totalSeconds = 165;
        this.isPlaying = false;

        this.scriptPhrases = [
            { time: 0, text: '"Olá! Meu nome é Vinicius Guimarães, tenho 25 anos e atuo com paixão em Infraestrutura e Segurança."' },
            { time: 15, text: '"Trabalho há 3,5 anos na área de TI, com 1 ano de estágio e 2,5 anos como técnico de infraestrutura."' },
            { time: 35, text: '"No meu dia a dia, gerencio switches gerenciáveis com VLANs, Access Points corporativos e atendo usuários."' },
            { time: 65, text: '"Mantenho a operação rodando com SLA acima de 95%, garantindo cabeamento e sinal estável."' },
            { time: 90, text: '"Nos meus Homelabs, simulo ambientes corporativos com Windows Server, Active Directory, GPO, File Server e estações Windows 11 integradas ao domínio."' },
            { time: 105, text: '"Também desenvolvo laboratórios de cibersegurança com Kali Linux, Parrot OS, Metasploitable 3, pfSense, Suricata e Wazuh SIEM."' },
            { time: 125, text: '"Na minha trilha de aprendizagem, estou avançando no Fortinet NSE 3 e me preparando para a certificação CompTIA Security+."' },
            { time: 150, text: '"Busco oportunidades para agregar valor em equipes de Infraestrutura ou Blue Team. Muito obrigado!"' }
        ];

        this.init();
    }

    init() {
        if (this.playBtn) this.playBtn.addEventListener('click', () => this.start());
        if (this.closeSimBtn) this.closeSimBtn.addEventListener('click', () => this.stop());
        if (this.playPauseBtn) this.playPauseBtn.addEventListener('click', () => this.toggle());

        if (this.progressBar) {
            this.progressBar.addEventListener('click', (e) => {
                const rect = this.progressBar.getBoundingClientRect();
                const clickRatio = (e.clientX - rect.left) / rect.width;
                this.currentSeconds = Math.floor(clickRatio * this.totalSeconds);
                this.updateView();
            });
        }

        if (this.copyBtn) {
            this.copyBtn.addEventListener('click', () => {
                const urlEl = document.getElementById('pitch-external-url');
                const text = urlEl ? urlEl.getAttribute('href') || urlEl.textContent.trim() : '';
                navigator.clipboard.writeText(text).then(() => {
                    this.toast.show('Link do vídeo copiado para a área de transferência!');
                }).catch(() => {
                    this.toast.show('Link do vídeo: ' + text);
                });
            });
        }
    }

    formatTime(s) {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    updateView() {
        let activeText = this.scriptPhrases[0].text;
        for (let i = 0; i < this.scriptPhrases.length; i++) {
            if (this.currentSeconds >= this.scriptPhrases[i].time) {
                activeText = this.scriptPhrases[i].text;
            }
        }

        if (this.teleprompter) this.teleprompter.textContent = activeText;
        if (this.timeDisplay) {
            this.timeDisplay.textContent = `${this.formatTime(this.currentSeconds)} / ${this.formatTime(this.totalSeconds)}`;
        }
        if (this.progressFill) {
            this.progressFill.style.width = `${(this.currentSeconds / this.totalSeconds) * 100}%`;
        }
    }

    start() {
        if (this.simPlayer) this.simPlayer.style.display = 'flex';
        this.isPlaying = true;
        if (this.playPauseBtn) this.playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        if (this.waveAnimation) this.waveAnimation.style.opacity = '1';

        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => {
            if (this.currentSeconds < this.totalSeconds) {
                this.currentSeconds += 1;
                this.updateView();
            } else {
                this.pause();
                this.currentSeconds = 0;
                this.updateView();
            }
        }, 1000);
        this.updateView();
    }

    pause() {
        this.isPlaying = false;
        if (this.timer) clearInterval(this.timer);
        if (this.playPauseBtn) this.playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        if (this.waveAnimation) this.waveAnimation.style.opacity = '0.3';
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.start();
        }
    }

    stop() {
        this.pause();
        this.currentSeconds = 0;
        if (this.simPlayer) this.simPlayer.style.display = 'none';
    }
}
