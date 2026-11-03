export class TerminalDiagnostics {
    constructor(terminalBodyId = 'live-terminal-text') {
        this.container = document.getElementById(terminalBodyId);
        this.currentIndex = 0;
        this.commands = [
            { cmd: 'nmap -sS -p 22,80,443 10.0.10.1', res: 'PORT 443/tcp OPEN (pfSense WebGUI) - Latency 0.31ms' },
            { cmd: 'wazuh-agent status', res: 'Wazuh Agent running [Connected to Manager 10.0.40.5:1514]' },
            { cmd: 'vlan-diag --show-trunks', res: 'Trunk Port 24: VLANs 10,20,30,40 tagged [STP Forwarding]' },
            { cmd: 'ap-status --vendor=omada', res: '4 APs online, 68 clients connected, channel interference: LOW' },
            { cmd: 'suricata -c /etc/suricata/suricata.yaml -T', res: 'Configuration provided was successfully verified. Rules: 42,109 loaded' }
        ];
        this.init();
    }

    init() {
        if (!this.container) return;
        setInterval(() => this.tick(), 4500);
    }

    tick() {
        this.currentIndex = (this.currentIndex + 1) % this.commands.length;
        const item = this.commands[this.currentIndex];
        this.container.innerHTML = `
      <p><span class="term-prompt">$</span> ${item.cmd}</p>
      <p class="term-ok">${item.res}</p>
      <p class="term-cyan"><span class="term-prompt">$</span> infra-watchdog: all services HEALTHY</p>
    `;
    }
}