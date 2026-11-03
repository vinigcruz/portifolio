export class NavigationController {
    constructor() {
        this.hamburger = document.getElementById('mobile-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.navMenu.classList.toggle('open');
            });

            this.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.navMenu.classList.remove('open');
                });
            });
        }

        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        let currentId = '';
        const scrollPos = window.pageYOffset;

        this.sections.forEach(section => {
            const top = section.offsetTop - 120;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentId = section.getAttribute('id');
            }
        });

        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    }
}