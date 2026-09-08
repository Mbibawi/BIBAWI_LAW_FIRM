"use strict";
const PHONE = '+33 7 81 22 51 91';
const EMAIL = 'mina.bibawi@bibawi-avocats.com';
const ADDRESS = '54, rue Letort - 75018 Paris';
const IMG = 'https://images.unsplash.com/';
const ASSETS = '/dist/assets/';
const IMAGES = `${ASSETS}images/`;
const UPOLADS = `${ASSETS}uploads/`;
const EXPERTISES = [
    {
        title: 'Baux commerciaux',
        short: 'Négociation, rédaction et contentieux des baux commerciaux, renouvellement, déplafonnement et révision de loyer.',
        detail: 'Accompagnement des preneurs et des bailleurs à chaque étape de la vie du bail commercial : rédaction et négociation des clauses, congé et renouvellement, déplafonnement et révision du loyer, contentieux relatif au statut des baux commerciaux et à la propriété commerciale.',
        icon: iconContract
    },
    {
        title: 'Location-gérance et cessions de fonds de commerce',
        short: 'Structuration et sécurisation des opérations de location-gérance, cession et acquisition de fonds de commerce.',
        detail: 'Rédaction et négociation des contrats de location-gérance, audit préalable et sécurisation des cessions et acquisitions de fonds de commerce, garanties de passif, séquestre, et accompagnement jusqu\u2019à la formalisation de l\u2019opération.',
        icon: iconBriefcase
    },
    {
        title: 'Droit des sociétés',
        short: 'Constitution, gouvernance, cessions de titres, restructurations et opérations sur le capital.',
        detail: 'Constitution et vie sociale des sociétés (statuts, pactes d\u2019associés, gouvernance), cessions et acquisitions de titres, opérations de restructuration, augmentation et réduction de capital, et prévention ou gestion des conflits entre associés.',
        icon: iconBuilding
    },
    {
        title: 'Contrats commerciaux et internationaux',
        short: 'Rédaction, négociation et exécution des contrats commerciaux, distribution, prestation de services et contrats internationaux.',
        detail: 'Rédaction et négociation de contrats commerciaux et internationaux (distribution, agence, franchise, prestation de services), sécurisation des relations contractuelles, clauses de loi applicable et de règlement des différends, et accompagnement dans l\u2019exécution ou la résolution des litiges contractuels.',
        icon: iconGlobe
    },
    {
        title: 'Droit des affaires',
        short: 'Conseil transversal aux entrepreneurs, dirigeants et investisseurs, en français, anglais et arabe.',
        detail: 'Conseil juridique transversal aux entrepreneurs, dirigeants et investisseurs français et étrangers, dans leurs opérations courantes et leurs projets de développement, avec une attention particulière portée à la clarté et à l\u2019anticipation des risques.',
        icon: iconScale
    },
    {
        title: 'Procédures collectives',
        short: 'Conseil et représentation en redressement et liquidation judiciaire, cession d\u2019actifs et de fonds en difficulté.',
        detail: 'Accompagnement des dirigeants, créanciers et repreneurs dans les procédures de redressement et de liquidation judiciaire, cession d\u2019actifs ou de fonds de commerce en difficulté, et sécurisation des opérations de reprise.',
        icon: iconDocument
    }
];
function el(tag, cls, text, attrs, children) {
    const el = document.createElement(tag);
    if (cls) {
        if (Array.isArray(cls))
            el.classList.add(...cls);
        else
            el.classList.add(cls);
    }
    if (text)
        el.textContent = text;
    if (attrs)
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, k === 'style' ? normalizeStyle(v) : v));
    if (children)
        children.forEach(c => el.appendChild(c));
    return el;
    function normalizeStyle(style) {
        return style
            .split(';')
            .map(decl => {
            const idx = decl.indexOf(':');
            if (idx === -1)
                return decl;
            const prop = decl.slice(0, idx).trim().replace(/[A-Z]/g, m => '-' + m.toLowerCase());
            const value = decl.slice(idx + 1);
            return `${prop}:${value}`;
        })
            .join(';');
    }
}
function iconPhone() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 512 512');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'currentColor');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z');
    svg.appendChild(path);
    return svg;
}
class Router {
    constructor(outlet) {
        this.routes = new Map();
        this.base = '/';
        this.outlet = outlet;
        window.addEventListener('popstate', () => this.render());
    }
    add(path, handler) {
        this.routes.set(this.path(path), handler);
    }
    path(path) {
        return `${this.base}${path.replace(/^\/+/, '')}`;
    }
    navigate(path, cat) {
        const fullPath = this.path(path);
        history.pushState({}, '', fullPath);
        this.render(cat);
        document.querySelectorAll('.nav a').forEach(a => {
            a.classList.toggle('act', a.pathname === fullPath);
        });
    }
    render(cat) {
        const path = window.location.pathname;
        const handler = this.routes.get(path) || this.routes.get(this.base);
        this.outlet.innerHTML = '';
        this.outlet.appendChild(handler(cat));
        window.scrollTo(0, 0);
        document.querySelectorAll('.nav a').forEach(a => {
            a.classList.toggle('act', a.pathname === path);
        });
    }
}
function Header(router) {
    const hdr = el('header', 'hdr');
    const tbar = el('div', 'tbar');
    const tbarInner = el('div', ['w', 'f', 'jb', 'ai']);
    const phone = el('a', ['f', 'ai'], PHONE, { href: `tel:${PHONE.replace(/\s/g, '')}` });
    phone.prepend(iconPhone());
    const hours = el('span', '', 'Du lundi au vendredi, 9h \u2013 19h, sur rendez-vous');
    tbarInner.append(phone, hours);
    tbar.appendChild(tbarInner);
    const main = el('div', ['w', 'f', 'jb', 'ai'], '', { style: 'padding:1rem' });
    const logo = el('a', 'logo', '', { href: '/' });
    logo.append(el('span', '', 'Mina BIBAWI', { style: 'display:block;fontFamily:Georgia,serif;fontSize:1.25rem;fontWeight:700;color:var(--p);lineHeight:1.1' }), el('span', '', 'Avocat au Barreau de Paris', { style: 'display:block;fontSize:.7rem;letterSpacing:1px;textTransform:uppercase;color:var(--a);fontWeight:700' }));
    logo.addEventListener('click', e => { e.preventDefault(); router.navigate(''); });
    const nav = el('nav', 'nav');
    const links = [
        { t: 'Accueil', p: '' },
        { t: 'Expertises', p: 'expertises' },
        { t: 'À propos', p: 'about' },
        { t: 'FAQ', p: 'faq' },
        { t: 'Contact', p: 'contact' }
    ];
    links.forEach(l => {
        const a = el('a', window.location.pathname === router.path(l.p) ? 'act' : '', l.t, { href: l.p });
        a.addEventListener('click', e => { e.preventDefault(); router.navigate(l.p); });
        nav.appendChild(a);
    });
    const mob = el('div', 'mob');
    for (let i = 0; i < 3; i++)
        mob.appendChild(el('span'));
    mob.addEventListener('click', () => nav.classList.toggle('act'));
    main.append(logo, nav, mob);
    hdr.append(tbar, main);
    return hdr;
}
function Footer() {
    const ftr = el('footer', 'ftr');
    const grid = el('div', ['w', 'ftr-grid']);
    const col1 = el('div');
    col1.appendChild(el('h3', 'tit', 'Mina BIBAWI', { style: 'color:#fff;font-size:1.25rem' }));
    col1.appendChild(el('p', 'txt', 'Avocat au Barreau de Paris \u2014 Droit des affaires', { style: 'color:#94a3b8' }));
    col1.appendChild(el('p', 'txt', 'Consultations en fran\u00e7ais, anglais et arabe.', { style: 'color:#94a3b8' }));
    const col2 = el('div');
    col2.appendChild(el('h4', '', 'Coordonn\u00e9es', { style: 'color:#fff;marginBottom:.5rem' }));
    col2.appendChild(el('p', '', PHONE, { style: 'color:#cbd5e1' }));
    col2.appendChild(el('p', '', ADDRESS, { style: 'color:#cbd5e1' }));
    col2.appendChild(el('p', '', EMAIL, { style: 'color:#cbd5e1' }));
    const col3 = el('div');
    col3.appendChild(el('h4', '', 'Expertises', { style: 'color:#fff;marginBottom:.5rem' }));
    EXPERTISES.slice(0, 4).forEach(x => {
        col3.appendChild(el('span', '', x.title, { style: 'display:block;color:#cbd5e1;marginBottom:.25rem' }));
    });
    grid.append(col1, col2, col3);
    const cp = el('div', ['w', 'cp-t'], 'Copyright \u00a9 2026 Mina Bibawi \u2013 Avocat. Tous droits r\u00e9serv\u00e9s.');
    ftr.append(grid, cp);
    return ftr;
}
function ExpertiseCard(x, router) {
    const card = el('div', 'card', '', { style: 'padding:2rem' });
    const iconWrap = el('div', '', '', { style: 'color:var(--p);margin-bottom:1rem' });
    iconWrap.appendChild(x.icon());
    card.appendChild(iconWrap);
    card.appendChild(el('h3', '', x.title, { style: 'fontSize:1.2rem;marginBottom:.6rem' }));
    card.appendChild(el('p', 'txt', x.short));
    const btn = el('a', ['btn', 'btn-o'], 'En savoir plus', { href: '/expertises' });
    btn.addEventListener('click', e => { e.preventDefault(); router.navigate('expertises'); });
    card.appendChild(btn);
    return card;
}
function SectionTitle(prefix, title) {
    const wrap = el('div', ['ac', 'sec'], '', { style: 'paddingBottom:2rem' });
    wrap.appendChild(el('p', 'sub', prefix));
    wrap.appendChild(el('h2', 'tit', title));
    return wrap;
}
function HomePage(router) {
    const page = el('div');
    const hero = el('section', ['sec', 'hero'], '', {
        style: `background-image: linear-gradient(rgba(7, 52, 61, 0.55), rgba(8, 23, 38, 0.72)), url(${IMAGES}hero.png)`
    });
    const heroInner = el('div', 'w');
    const heroBox = el('div', '', '', { style: 'maxWidth:640px' });
    heroBox.appendChild(el('p', 'sub', 'Cabinet d\u2019avocat \u2014 Droit des affaires', { style: 'color:#e7ecf1' }));
    const h1 = el('h1', 'tit', 'D\u00e9fendre vos int\u00e9r\u00eats, s\u00e9curiser vos d\u00e9cisions', { style: 'color:#fff' });
    const p = el('p', 'txt', 'Ma\u00eetre Mina BIBAWI accompagne entrepreneurs, dirigeants et investisseurs dans leurs op\u00e9rations commerciales, immobili\u00e8res et soci\u00e9taires, en France et \u00e0 l\u2019international.', { style: 'color:#e7ecf1;font-size:1.05rem' });
    const btnRow = el('div', ['f', 'ai'], '', { style: 'gap:1rem;flex-wrap:wrap;marginTop:.5rem' });
    const cta = el('a', ['btn', 'btn-p'], 'Prendre rendez-vous', { href: '/contact' });
    cta.addEventListener('click', e => { e.preventDefault(); router.navigate('contact'); });
    const phoneBtn = el('a', ['btn', 'btn-o', 'f', 'ai'], PHONE, { href: `tel:${PHONE.replace(/\s/g, '')}`, style: 'color:#fff;borderColor:#fff' });
    phoneBtn.prepend(iconPhone());
    btnRow.append(cta, phoneBtn);
    heroBox.append(h1, p, btnRow);
    heroInner.appendChild(heroBox);
    hero.appendChild(heroInner);
    const msg = el('section', ['sec', 'sec-alt']);
    const msgW = el('div', ['w', 'g'], '', { style: 'gridTemplateColumns:1fr 1fr;gap:2rem' });
    const msgInfo = el('div');
    msgInfo.appendChild(el('p', 'sub', 'Une question juridique ?'));
    msgInfo.appendChild(el('h2', 'tit', 'Contactez le cabinet'));
    msgInfo.appendChild(el('p', 'txt', 'D\u00e9crivez bri\u00e8vement votre situation : Ma\u00eetre Bibawi vous recontacte pour convenir d\u2019un premier \u00e9change, au cabinet ou \u00e0 distance.'));
    const msgForm = el('form', 'fm');
    msgForm.appendChild(el('input', 'inp', '', { type: 'text', placeholder: 'Votre nom *', required: 'true' }));
    msgForm.appendChild(el('input', 'inp', '', { type: 'email', placeholder: 'Votre email *', required: 'true' }));
    msgForm.appendChild(el('textarea', ['inp', 'txta'], '', { placeholder: 'Votre message *', required: 'true' }));
    const msgBtn = el('button', ['btn', 'btn-p'], 'Envoyer le message');
    msgForm.appendChild(msgBtn);
    msgForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Merci, votre message a bien \u00e9t\u00e9 envoy\u00e9. Le cabinet vous recontactera rapidement.');
        msgForm.reset();
    });
    msgW.append(msgInfo, msgForm);
    msg.appendChild(msgW);
    const feat = el('section', 'sec');
    const featW = el('div', 'w');
    featW.appendChild(SectionTitle('Domaines d\u2019intervention', 'Nos expertises'));
    const featGrid = el('div', 'cl');
    EXPERTISES.forEach(x => featGrid.appendChild(ExpertiseCard(x, router)));
    featW.appendChild(featGrid);
    feat.appendChild(featW);
    const about = el('section', ['sec', 'sec-alt']);
    const aboutW = el('div', ['w', 'g'], '', { style: 'gridTemplateColumns:1fr 1fr;gap:3rem;alignItems:center' });
    const aboutTxt = el('div');
    aboutTxt.appendChild(el('p', 'sub', 'QUI SOMMES-NOUS'));
    aboutTxt.appendChild(el('h2', 'tit', '\u00c0 propos du cabinet'));
    aboutTxt.appendChild(el('p', 'txt', 'Ma\u00eetre Mina BIBAWI est avocat au Barreau de Paris, sp\u00e9cialis\u00e9 en droit des affaires. Il conseille et repr\u00e9sente ses clients depuis plus de 15 ans en mati\u00e8re de baux commerciaux, location-g\u00e9rance et cessions de fonds de commerce, droit des soci\u00e9t\u00e9s, et contrats commerciaux et internationaux.'));
    aboutTxt.appendChild(el('p', 'txt', 'Titulaire d\u2019un Master II Professionnel en droit europ\u00e9en et international des affaires de l\u2019Universit\u00e9 Paris I Panth\u00e9on-Sorbonne, il conseille sa client\u00e8le en fran\u00e7ais, en anglais et en arabe.'));
    const aboutBtn = el('a', ['btn', 'btn-o'], 'En savoir plus', { href: '/about' });
    aboutBtn.addEventListener('click', e => { e.preventDefault(); router.navigate('about'); });
    aboutTxt.appendChild(aboutBtn);
    const aboutImg = el('img', '', '', { src: `${IMG}photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80`, alt: 'Cabinet Mina Bibawi', style: 'borderRadius:var(--ra)' });
    aboutW.append(aboutTxt, aboutImg);
    about.appendChild(aboutW);
    const look = el('section', 'sec');
    const lookW = el('div', 'w');
    lookW.appendChild(SectionTitle('Notre engagement d\u00e9ontologique', 'Une pratique exigeante et rigoureuse'));
    const lookGrid = el('div', 'cl');
    [
        { t: 'Confidentialit\u00e9 absolue', d: 'Chaque dossier est trait\u00e9 avec la plus stricte confidentialit\u00e9, du premier entretien jusqu\u2019\u00e0 la cl\u00f4ture de l\u2019affaire.' },
        { t: 'Secret professionnel', d: 'Le secret professionnel de l\u2019avocat s\u2019applique \u00e0 l\u2019ensemble des \u00e9changes, documents et strat\u00e9gies discut\u00e9s avec le cabinet.' },
        { t: 'Loyaut\u00e9 et transparence', d: 'Un conseil clair, des honoraires d\u00e9finis en amont, et une information r\u00e9guli\u00e8re sur l\u2019avancement de chaque dossier.' }
    ].forEach(v => {
        const card = el('div', ['card', 'ac'], '', { style: 'padding:2rem' });
        card.appendChild(el('h3', '', v.t, { style: 'fontSize:1.15rem;marginBottom:.5rem' }));
        card.appendChild(el('p', 'txt', v.d, { style: 'marginBottom:0' }));
        lookGrid.appendChild(card);
    });
    lookW.appendChild(lookGrid);
    look.appendChild(lookW);
    const ctaSec = el('section', ['sec', 'sec-alt']);
    const ctaW = el('div', ['w', 'ac']);
    ctaW.appendChild(el('h2', 'tit', 'Vous c\u00e9dez, vous reprenez, vous investissez ? Parlons-en.'));
    ctaW.appendChild(el('p', 'txt', 'Le cabinet propose un premier \u00e9change confidentiel, \u00e0 Paris ou \u00e0 distance, pour comprendre vos objectifs et s\u00e9curiser juridiquement votre projet.'));
    const ctaPhone = el('a', ['btn', 'btn-p'], PHONE, { href: `tel:${PHONE.replace(/\s/g, '')}` });
    ctaW.appendChild(ctaPhone);
    ctaSec.appendChild(ctaW);
    page.append(hero, msg, feat, about, look, ctaSec);
    return page;
}
function AboutPage() {
    const page = el('div');
    const s1 = el('section', 'sec');
    const w1 = el('div', 'w');
    w1.appendChild(SectionTitle('Qui sommes-nous', 'À propos de Maître Bibawi'));
    page.appendChild(s1).appendChild(w1);
    const s2 = el('section', ['sec', 'sec-alt']);
    const w2 = el('div', ['w', 'g'], '', { style: 'gridTemplateColumns:1fr 1fr;gap:3rem;alignItems:center' });
    const txt = el('div');
    txt.appendChild(el('h4', '', 'Un cabinet ind\u00e9pendant, \u00e0 taille humaine, au service des entrepreneurs et des dirigeants.', { style: 'fontSize:1.25rem;marginBottom:1rem' }));
    txt.appendChild(el('p', 'txt', 'Ma\u00eetre Mina BIBAWI est avocat au Barreau de Paris depuis plus de 15 ans. Il exerce en droit des affaires, avec une expertise reconnue en baux commerciaux, location-g\u00e9rance et cessions de fonds de commerce, droit des soci\u00e9t\u00e9s, et contrats commerciaux et internationaux.'));
    txt.appendChild(el('p', 'txt', 'Titulaire d\u2019un Master II Professionnel en droit europ\u00e9en et international des affaires de l\u2019Universit\u00e9 Paris I Panth\u00e9on-Sorbonne, il a d\u00e9velopp\u00e9 tout au long de sa carri\u00e8re une pratique tourn\u00e9e vers les op\u00e9rations transfrontali\u00e8res, aux c\u00f4t\u00e9s de clients fran\u00e7ais et \u00e9trangers.'));
    txt.appendChild(el('p', 'txt', 'Il conseille et repr\u00e9sente ses clients en fran\u00e7ais, en anglais et en arabe, ce qui lui permet d\u2019accompagner des entrepreneurs et investisseurs issus d\u2019horizons vari\u00e9s, en France comme \u00e0 l\u2019international.'));
    txt.appendChild(el('p', 'txt', 'Son approche est celle d\u2019un conseil de proximit\u00e9 : comprendre les objectifs commerciaux du client, anticiper les risques juridiques et fiscaux, et structurer chaque op\u00e9ration avec rigueur, jusqu\u2019\u00e0 sa r\u00e9alisation.'));
    const img = el('img', '', '', { src: `${IMG}photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=80`, alt: 'Ma\u00eetre Mina Bibawi', style: 'borderRadius:var(--ra)' });
    w2.append(txt, img);
    s2.appendChild(w2);
    page.appendChild(s2);
    const s3 = el('section', 'sec');
    const w3 = el('div', 'w');
    const grid = el('div', 'cl');
    const visions = [
        { t: 'Notre approche', d: 'Nous parlons le langage de nos clients : d\u00e9cision, rentabilit\u00e9, ma\u00eetrise du risque. Notre approche est strat\u00e9gique, anticip\u00e9e et structur\u00e9e. Nous assurons la coordination des intervenants (experts-comptables, notaires, banques) jusqu\u2019\u00e0 la r\u00e9alisation de l\u2019op\u00e9ration.' },
        { t: 'Notre engagement', d: 'Cabinet ind\u00e9pendant \u00e0 taille humaine, nous garantissons proximit\u00e9, agilit\u00e9 et exigence, quel que soit le profil du dossier : de la question ponctuelle jusqu\u2019aux op\u00e9rations complexes impliquant plusieurs parties.' }
    ];
    visions.forEach(v => {
        const box = el('div', 'box');
        box.appendChild(el('h3', 'tit', v.t, { style: 'fontSize:1.5rem' }));
        box.appendChild(el('p', 'txt', v.d));
        grid.appendChild(box);
    });
    w3.appendChild(grid);
    s3.appendChild(w3);
    page.appendChild(s3);
    return page;
}
function ExpertisesPage(router) {
    const page = el('div');
    const hero = el('section', ['sec', 'hero', 'hero-flat'], '', { style: `background:linear-gradient(rgba(8,23,38,.6),rgba(8,23,38,.6)),url(${IMG}photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=80) center/cover no-repeat;min-height:360px` });
    const heroInner = el('div', 'w');
    const heroBox = el('div', '', '', { style: 'max-width:720px' });
    heroBox.appendChild(el('p', 'sub', 'Expertises', { style: 'color:#fff' }));
    heroBox.appendChild(el('h1', 'tit', 'Un conseil de bout en bout, du diagnostic \u00e0 la r\u00e9alisation', { style: 'color:#fff' }));
    heroBox.appendChild(el('p', 'txt', 'Le cabinet intervient en conseil et en contentieux pour les entrepreneurs, dirigeants et investisseurs, sur l\u2019ensemble des op\u00e9rations li\u00e9es \u00e0 leur activit\u00e9 commerciale.', { style: 'color:#e6ecf1' }));
    heroInner.appendChild(heroBox);
    hero.appendChild(heroInner);
    const sec = el('section', 'sec');
    const w = el('div', 'w');
    const grid = el('div', 'cl');
    EXPERTISES.forEach(x => {
        const card = el('div', 'card', '', { style: 'padding:2rem' });
        const iconWrap = el('div', '', '', { style: 'color:var(--p);margin-bottom:1rem' });
        iconWrap.appendChild(x.icon());
        card.appendChild(iconWrap);
        card.appendChild(el('h3', '', x.title, { style: 'fontSize:1.2rem;marginBottom:.6rem' }));
        card.appendChild(el('p', 'txt', x.detail, { style: 'marginBottom:0' }));
        grid.appendChild(card);
    });
    w.appendChild(grid);
    sec.appendChild(w);
    const cta = el('section', ['sec', 'sec-alt']);
    const ctaW = el('div', ['w', 'ac'], '', { style: 'max-width:700px;margin:0 auto' });
    ctaW.appendChild(el('h2', 'tit', 'Un projet, une difficult\u00e9, une op\u00e9ration \u00e0 s\u00e9curiser ?'));
    ctaW.appendChild(el('p', 'txt', 'Contactez le cabinet pour un premier \u00e9change confidentiel.'));
    const ctaBtn = el('a', ['btn', 'btn-p'], 'Contacter le cabinet', { href: '/contact' });
    ctaBtn.addEventListener('click', e => { e.preventDefault(); router.navigate('contact'); });
    ctaW.appendChild(ctaBtn);
    cta.appendChild(ctaW);
    page.append(hero, sec, cta);
    return page;
}
function FAQPage() {
    const page = el('div');
    const sec = el('section', 'sec');
    const w = el('div', 'w');
    w.appendChild(SectionTitle('FAQ', 'Questions fr\u00e9quentes'));
    const items = [
        { q: 'Dans quelles langues le cabinet intervient-il ?', a: 'Ma\u00eetre Bibawi conseille et repr\u00e9sente ses clients en fran\u00e7ais, en anglais et en arabe.' },
        { q: 'Le cabinet intervient-il en dehors de Paris ?', a: 'Oui. Le cabinet accompagne des clients en France et \u00e0 l\u2019international, notamment sur des dossiers impliquant des parties fran\u00e7aises et \u00e9trang\u00e8res, avec des rendez-vous possibles \u00e0 distance.' },
        { q: 'Comment se d\u00e9roule un premier rendez-vous ?', a: 'Un premier \u00e9change permet de comprendre votre situation et vos objectifs, d\u2019identifier les enjeux juridiques et de vous proposer, le cas \u00e9ch\u00e9ant, une strat\u00e9gie et des honoraires adapt\u00e9s \u00e0 votre dossier.' },
        { q: 'Le cabinet intervient-il aussi bien en conseil qu\u2019en contentieux ?', a: 'Oui. Le cabinet intervient en amont, pour structurer et s\u00e9curiser vos op\u00e9rations, ainsi qu\u2019en repr\u00e9sentation devant les juridictions comp\u00e9tentes en cas de litige.' },
        { q: 'Comment prendre rendez-vous ?', a: 'Vous pouvez appeler le cabinet au ' + PHONE + ' ou utiliser le formulaire de contact de ce site.' }
    ];
    items.forEach(it => {
        const box = el('div', 'box', '', { style: 'marginBottom:1rem' });
        box.appendChild(el('h4', '', it.q, { style: 'marginBottom:.5rem;color:var(--p)' }));
        box.appendChild(el('p', 'txt', it.a));
        w.appendChild(box);
    });
    sec.appendChild(w);
    page.appendChild(sec);
    return page;
}
function ContactPage() {
    const page = el('div');
    const s1 = el('section', 'sec');
    const w1 = el('div', 'w');
    w1.appendChild(SectionTitle('Contact', 'Prendre rendez-vous'));
    page.appendChild(s1).appendChild(w1);
    const s2 = el('section', ['sec', 'sec-alt']);
    const w2 = el('div', ['w', 'g'], '', { style: 'gridTemplateColumns:1fr 1fr;gap:3rem' });
    const formWrap = el('div');
    formWrap.appendChild(el('h4', '', 'Envoyer un message', { style: 'marginBottom:1rem' }));
    const form = el('form', 'fm');
    form.appendChild(el('input', 'inp', '', { type: 'text', placeholder: 'Votre nom *', required: 'true' }));
    form.appendChild(el('input', 'inp', '', { type: 'email', placeholder: 'Votre email *', required: 'true' }));
    form.appendChild(el('input', 'inp', '', { type: 'tel', placeholder: 'T\u00e9l\u00e9phone' }));
    form.appendChild(el('textarea', ['inp', 'txta'], '', { placeholder: 'D\u00e9crivez bri\u00e8vement votre demande *', required: 'true' }));
    const btn = el('button', ['btn', 'btn-p'], 'Envoyer');
    form.appendChild(btn);
    form.addEventListener('submit', e => { e.preventDefault(); alert('Message envoy\u00e9 ! Le cabinet vous recontactera rapidement.'); form.reset(); });
    formWrap.appendChild(form);
    const info = el('div');
    info.appendChild(el('h4', '', 'Coordonn\u00e9es du cabinet', { style: 'marginBottom:1rem' }));
    info.appendChild(el('p', 'txt', 'Une question sur un dossier en cours, un projet de cession, un bail commercial ou une op\u00e9ration \u00e0 s\u00e9curiser ? Contactez le cabinet, Ma\u00eetre Bibawi vous r\u00e9pondra dans les meilleurs d\u00e9lais.'));
    const phoneLine = el('a', ['f', 'ai'], PHONE, { href: `tel:${PHONE.replace(/\s/g, '')}`, style: 'marginBottom:.5rem;color:var(--p);fontWeight:600' });
    phoneLine.prepend(iconPhone());
    info.appendChild(phoneLine);
    info.appendChild(el('p', '', ADDRESS, { style: 'marginBottom:.5rem' }));
    info.appendChild(el('a', '', EMAIL, { href: `mailto:${EMAIL}`, style: 'display:block;marginBottom:1.5rem;color:var(--p)' }));
    info.appendChild(el('h4', '', 'Barreau', { style: 'marginBottom:.5rem' }));
    info.appendChild(el('p', 'txt', 'Avocat au Barreau de Paris, sp\u00e9cialis\u00e9 en droit des affaires.'));
    w2.append(formWrap, info);
    s2.appendChild(w2);
    page.appendChild(s2);
    return page;
}
function iconPath(d, viewBox = '0 0 512 512') {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', viewBox);
    svg.setAttribute('width', '32');
    svg.setAttribute('height', '32');
    svg.setAttribute('fill', 'currentColor');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    svg.appendChild(path);
    return svg;
}
function iconScale() {
    return iconPath('M256 0c17 0 32 15 32 32v34.7c15.5 3.4 29.9 9.9 42.6 18.8l16.4-16.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-16.4 16.4c8.9 12.7 15.4 27.1 18.8 42.6H430c17.7 0 32 14.3 32 32s-14.3 32-32 32h-35.3c-3.4 15.5-9.9 29.9-18.8 42.6l16.4 16.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-16.4-16.4c-12.7 8.9-27.1 15.4-42.6 18.8V480c0 17.7-14.3 32-32 32s-32-14.3-32-32v-34.7c-15.5-3.4-29.9-9.9-42.6-18.8l-16.4 16.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l16.4-16.4c-8.9-12.7-15.4-27.1-18.8-42.6H82c-17.7 0-32-14.3-32-32s14.3-32 32-32h35.3c3.4-15.5 9.9-29.9 18.8-42.6l-16.4-16.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l16.4 16.4c12.7-8.9 27.1-15.4 42.6-18.8V32c0-17 15-32 32-32zM160 256a96 96 0 1 0 192 0 96 96 0 1 0-192 0z');
}
function iconBuilding() {
    return iconPath('M0 32C0 14.3 14.3 0 32 0H288c17.7 0 32 14.3 32 32V64h48c26.5 0 48 21.5 48 48V448h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H448 320 32 16c-8.8 0-16-7.2-16-16s7.2-16 16-16H32V32zM64 240c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16v32zm128 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H192c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zM64 336c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16v32zm128 16h32c8.8 0 16-7.2 16-16V304c0-8.8-7.2-16-16-16H192c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16zM80 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H80zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zM320 448h96V128H320V448z');
}
function iconBriefcase() {
    return iconPath('M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z');
}
function iconContract() {
    return iconPath('M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5-24.9-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm32-48h224v-32H80v32zm0-64h224v-32H80v32zm0-64h224v-32H80v32z');
}
function iconGlobe() {
    return iconPath('M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z');
}
function iconDocument() {
    return iconPath('M0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm384 64H256V64H384v64z');
}
(function start() {
    const app = document.getElementById('app');
    const main = el('main');
    const router = new Router(main);
    const layout = el('div');
    layout.appendChild(Header(router));
    layout.appendChild(main);
    layout.appendChild(Footer());
    app.appendChild(layout);
    router.add('', () => HomePage(router));
    router.add(`expertises`, () => ExpertisesPage(router));
    router.add(`about`, () => AboutPage());
    router.add(`contact`, () => ContactPage());
    router.add(`faq`, () => FAQPage());
    router.render();
})();
//# sourceMappingURL=app.js.map