export class TerminalDiagnostics {
    constructor(terminalBodyId = 'live-terminal-text') {
        this.container = document.getElementById(terminalBodyId);
        this.stage = document.getElementById('laptop-3d-stage');
        this.rig = document.getElementById('laptop-3d-rig');
        this.currentIndex = 0;
        this.commands = [
            {
                cmd: 'fortiap-diag --status --ssid=CORP',
                res: '[+] FortiAPs Online | Sinal Estável | Isolamento de SSID Visitante OK',
                status: 'osi-check: Camadas L1/L2/L3 íntegras'
            },
            {
                cmd: 'unifi-controller --rf-scan --band=5ghz',
                res: '[+] Canais 5GHz otimizados | Interferência: BAIXA | Roaming ativo',
                status: 'wlan-sec: Autenticação WPA2/WPA3 e VLAN Tagging OK'
            },
            {
                cmd: 'switch-l2 # show vlan brief | verify-isolation',
                res: '[+] VLAN 10 (Gerência) | VLAN 20 (Corporativo) | VLAN 30 (Visitantes)',
                status: 'net-concept: Segmentação de domínio de broadcast ATIVA'
            },
            {
                cmd: 'ping -n 4 gateway.local && nslookup dc01.corp.local',
                res: '[+] Latência média: 0.4ms | Resolução DNS e concessão DHCP íntegras',
                status: 'infra-sla: Operação mantendo SLA > 95%'
            },
            {
                cmd: 'netsec-review --principles="CIA,Least-Privilege"',
                res: '[+] Confidencialidade, Integridade e Disponibilidade validadas',
                status: 'fortinet-nse3: Trilha de Network Security em evolução'
            }
        ];
        this.init();
        this.init3DLaptop();
    }

    init() {
        if (!this.container) return;
        setInterval(() => this.tick(), 3800);
    }

    tick() {
        this.currentIndex = (this.currentIndex + 1) % this.commands.length;
        const item = this.commands[this.currentIndex];
        this.container.innerHTML = `
      <p><span class="term-prompt">net-infra:~#</span> ${item.cmd}</p>
      <p class="term-ok">${item.res}</p>
      <p class="term-cyan"><span class="term-prompt">net-infra:~#</span> ${item.status} <span class="cursor-blink">█</span></p>
    `;
    }

    init3DLaptop() {
        if (!this.stage || !this.rig) return;

        const handleMove = (clientX, clientY) => {
            const rect = this.stage.getBoundingClientRect();
            const x = (clientX - rect.left) / rect.width;
            const y = (clientY - rect.top) / rect.height;

            const clampedX = Math.max(0, Math.min(1, x));
            const clampedY = Math.max(0, Math.min(1, y));

            const rotateY = (clampedX - 0.5) * 32;
            const rotateX = (0.5 - clampedY) * 24;

            this.rig.classList.remove('is-floating');
            this.rig.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;
            this.rig.style.setProperty('--glare-x', `${(clampedX * 100).toFixed(1)}%`);
            this.rig.style.setProperty('--glare-y', `${(clampedY * 100).toFixed(1)}%`);
        };

        const handleReset = () => {
            this.rig.style.transform = '';
            this.rig.classList.add('is-floating');
        };

        this.stage.addEventListener('mousemove', (e) => {
            handleMove(e.clientX, e.clientY);
        });

        this.stage.addEventListener('mouseleave', () => {
            handleReset();
        });

        this.stage.addEventListener('touchmove', (e) => {
            if (e.touches && e.touches[0]) {
                handleMove(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        this.stage.addEventListener('touchend', () => {
            handleReset();
        });
    }
}
