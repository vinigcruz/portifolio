export class UserProfile {
    static DEFAULT_STATE = {
        name: 'Vinicius Guimarães da Cruz',
        shortName: 'Vinicius Cruz',
        age: '25 anos',
        email: 'viniciusgcruz@gmail.com',
        phone: '(41)9 8406-5476',
        linkedin: 'https://www.linkedin.com/in/viniciusgcruz/',
        github: 'https://github.com/vinigcruz',
        pitchUrl: 'https://youtu.be/pitch-vinicius-guimaraes',
        resumeUrl: './curriculo.pdf'
    };

    constructor() {
        this.data = Object.assign({}, UserProfile.DEFAULT_STATE);
    }

    getProfile() {
        return Object.assign({}, this.data);
    }

    render() {
        const heroName = document.getElementById('hero-display-name');
        if (heroName) heroName.textContent = this.data.name;

        const navBrand = document.getElementById('nav-brand-name');
        if (navBrand) navBrand.textContent = this.data.shortName || this.data.name;

        const cardName = document.getElementById('card-profile-name');
        if (cardName) cardName.textContent = this.data.shortName || this.data.name;

        const videoAuthor = document.getElementById('video-author-name');
        if (videoAuthor) videoAuthor.textContent = this.data.shortName || this.data.name;

        const footerName = document.getElementById('footer-name');
        if (footerName) footerName.textContent = this.data.shortName || this.data.name;

        const printName = document.getElementById('print-name');
        if (printName) printName.textContent = this.data.name;

        document.querySelectorAll('.data-email').forEach(el => {
            el.textContent = this.data.email;
            if (el.tagName === 'A') el.href = `mailto:${this.data.email}`;
        });

        document.querySelectorAll('.data-phone').forEach(el => {
            el.textContent = this.data.phone;
            if (el.tagName === 'A') el.href = `tel:${this.data.phone.replace(/[^0-9+]/g, '')}`;
        });

        document.querySelectorAll('.data-linkedin-url').forEach(el => {
            el.textContent = this.data.linkedin.replace(/^https?:\/\//, '');
            if (el.tagName === 'A') el.href = this.data.linkedin;
        });

        const heroLinkedin = document.getElementById('hero-linkedin-link');
        if (heroLinkedin) heroLinkedin.href = this.data.linkedin;

        const netLinkedin = document.getElementById('net-linkedin-btn');
        if (netLinkedin) netLinkedin.href = this.data.linkedin;

        document.querySelectorAll('.data-github-url').forEach(el => {
            el.textContent = this.data.github.replace(/^https?:\/\//, '');
            if (el.tagName === 'A') el.href = this.data.github;
        });

        const heroGithub = document.getElementById('hero-github-link');
        if (heroGithub) heroGithub.href = this.data.github;

        const netGithub = document.getElementById('net-github-btn');
        if (netGithub) netGithub.href = this.data.github;

        document.querySelectorAll('.data-pitch-url').forEach(el => {
            el.textContent = this.data.pitchUrl;
            if (el.tagName === 'A') el.href = this.data.pitchUrl;
        });
    }
}
