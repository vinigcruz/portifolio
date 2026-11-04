export class TerminalDiagnostics {
    constructor(terminalBodyId = 'live-terminal-text') {
        this.container = document.getElementById(terminalBodyId);
        this.stage = document.getElementById('laptop-3d-stage');
        this.rig = document.getElementById('laptop-3d-rig');
        this.currentIndex = 0;
        this.commands = [
            {
                cmd: 'nmap -sS -p 22,80,443 10.0.10.1',
                res: '[+] PORT 443/tcp OPEN (pfSense WebGUI) - Latency 0.31ms',
                status: 'infra-watchdog: perimeter firewall ACTIVE'
            },
            {
                cmd: 'wazuh-control status && tail -n 1 alerts.log',
                res: '[+] Wazuh Manager RUNNING [Agent 10.0.40.5:1514 CONNECTED]',
                status: 'siem-monitor: 0 unauthorized privilege escalations'
            },
            {
                cmd: 'vlan-diag --show-trunks --interface=eth0',
                res: '[+] Trunk Port 24: VLANs 10,20,30,40 tagged [STP Forwarding]',
                status: 'net-segmentation: L2/L3 isolation VERIFIED'
            },
            {
                cmd: 'suricata -c /etc/suricata/suricata.yaml -T',
                res: '[+] Ruleset verified: 42,109 signatures loaded in IPS mode',
                status: 'fortinet-nse3-lab: zero-trust policy ENFORCED'
            },
            {
                cmd: 'Get-ADDomainController -Discover | Select HostName',
                res: '[+] DC01.corp.homelab.local [GPO & Kerberos HEALTHY]',
                status: 'ad-forest: Windows Server & Win11 clients SYNCED'
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
      <p><span class="term-prompt">root@secops:~#</span> ${item.cmd}</p>
      <p class="term-ok">${item.res}</p>
      <p class="term-cyan"><span class="term-prompt">root@secops:~#</span> ${item.status} <span class="cursor-blink">█</span></p>
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
