export class TerminalDiagnostics {
    constructor(terminalBodyId = 'live-terminal-text') {
        this.container = document.getElementById(terminalBodyId);
        this.stage = document.getElementById('laptop-3d-stage');
        this.rig = document.getElementById('laptop-3d-rig');
        this.currentIndex = 0;
        this.commands = [
            {
                cmd: 'pfctl -s info && suricata-stat --ips',
                res: '[+] State Table: 4,812 active | IPS Inline: ENFORCED (0.28ms)',
                status: 'vlan-policy: Zero-Trust inter-VLAN ACLs ACTIVE'
            },
            {
                cmd: 'fortios-cli # diagnose sys session stat',
                res: '[+] NGFW Sessions: 1,940 established | 0 anomalies detected',
                status: 'nse3-profile: SSL/TLS Deep Inspection & IPS ENABLED'
            },
            {
                cmd: 'switch-core # show vlan brief | grep 802.1Q',
                res: '[+] Trunk Gi0/24: VLAN 10(Mgmt) 20(Corp) 30(DMZ) 40(SOC)',
                status: 'l2-security: DHCP Snooping & Port-Security VERIFIED'
            },
            {
                cmd: 'wazuh-control status && tail -n 1 /var/ossec/logs/alerts.log',
                res: '[+] Wazuh SIEM Manager RUNNING [18 Agents Online - 1514/tcp]',
                status: 'soc-telemetry: CIS Benchmark & FIM integrity OK'
            },
            {
                cmd: 'Get-ADDomainController -Discover | Select HostName, Site',
                res: '[+] DC01.corp.netsec.local [Kerberos & GPO Hardening OK]',
                status: 'ad-security: Tier-0 Domain Admin isolation ACTIVE'
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
      <p><span class="term-prompt">netsec@fw01:~#</span> ${item.cmd}</p>
      <p class="term-ok">${item.res}</p>
      <p class="term-cyan"><span class="term-prompt">netsec@fw01:~#</span> ${item.status} <span class="cursor-blink">█</span></p>
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
