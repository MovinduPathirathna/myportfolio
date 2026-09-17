document.addEventListener('DOMContentLoaded', () => {
    
    // Helper to render templates
    const render = (containerId, data, templateFn) => {
        const container = document.getElementById(containerId);
        if (!container || !data || !Array.isArray(data)) return;
        
        let html = '';
        data.forEach((item, index) => {
            html += templateFn(item, index);
        });
        container.innerHTML = html;
        
        // Optional: Re-trigger scroll observer for new elements
        if (window.initScrollAnimations) {
            window.initScrollAnimations();
        } else {
            // Simple fallback if main.js observer isn't exposed
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.1 });
            
            container.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
                observer.observe(el);
            });
        }
    };

    const data = window.portfolioData || {};

    // 1. Experience
    render('experience-container', data.experience, (item, i) => {
        return `
            <div class="timeline-item reveal delay-${(i % 3) + 1}">
                <div class="timeline-dot"></div>
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-card glass-card">
                    <h3>${item.title}</h3>
                    <div class="subtitle">${item.subtitle}</div>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    });

    // 1.5 Education
    render('education-container', data.education, (item, i) => {
        const tagsHtml = (item.tags && item.tags.length > 0) 
            ? `<div class="tags" style="margin-top: 12px;">${item.tags.map(t => `<span class="${t.class}">${t.name}</span>`).join('')}</div>` 
            : '';
        return `
            <div class="timeline-item reveal delay-${(i % 3) + 1}">
                <div class="timeline-dot"></div>
                <div class="timeline-date">${item.date}</div>
                <div class="timeline-card glass-card">
                    <h3>${item.title}</h3>
                    <div class="subtitle">${item.subtitle}</div>
                    <p>${item.description}</p>
                    ${tagsHtml}
                </div>
            </div>
        `;
    });

    // 2. Projects
    render('projects-container', data.projects, (item, i) => {
        const tagsHtml = item.tags.map(t => `<span class="${t.class}">${t.name}</span>`).join('');
        return `
            <div class="project-card reveal delay-${(i % 3) + 1}">
                <div class="project-card-image" style="background: ${item.imageBg};"></div>
                <div class="project-card-body">
                    <h3>${item.title}</h3>
                    <div class="tags" style="margin-bottom: 12px;">
                        ${tagsHtml}
                    </div>
                    <p>${item.description}</p>
                    <div class="project-card-footer">
                        <a href="${item.link}" class="btn btn-sm btn-outline">View Details</a>
                        <a href="${item.github}" class="text-accent" title="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                    </div>
                </div>
            </div>
        `;
    });

    // 3. Collaborations
    render('collaborations-container', data.collaborations, (item, i) => {
        const bgStyle = item.avatarBg ? `style="background: ${item.avatarBg}"` : '';
        return `
            <div class="collab-card reveal delay-${(i % 4) + 1}">
                <div class="collab-avatar" ${bgStyle}>${item.avatar}</div>
                <h4>${item.title}</h4>
                <div class="role">${item.role}</div>
                <p>${item.description}</p>
            </div>
        `;
    });

    // 4. Certifications
    render('certifications-container', data.certifications, (item, i) => {
        return `
            <div class="cert-card reveal delay-${(i % 3) + 1}">
                <div class="cert-badge">
                    ${item.svg}
                </div>
                <h4>${item.title}</h4>
                <div class="issuer">${item.issuer}</div>
                <div class="date">${item.date}</div>
                <a href="${item.link}" class="btn btn-sm btn-outline" style="width:100%">View Badge</a>
            </div>
        `;
    });

    // 5. Publications
    render('publications-container', data.publications, (item, i) => {
        return `
            <div class="pub-card reveal delay-${(i % 3) + 1}">
                <span class="pub-type">${item.type}</span>
                <h3>${item.title}</h3>
                <div class="pub-authors">${item.authors}</div>
                <div class="pub-venue">${item.venue}</div>
                <p class="pub-abstract">${item.abstract}</p>
                <div class="pub-card-actions">
                    <a href="${item.pdfLink}" class="btn btn-sm btn-primary">Read PDF</a>
                    <a href="${item.doiLink}" class="btn btn-sm btn-outline">DOI Link</a>
                </div>
            </div>
        `;
    });

    // 6. Researches
    render('researches-container', data.researches, (item, i) => {
        const linkHtml = item.link ? `<div style="margin-top: 16px;"><a href="${item.link}" class="btn btn-sm btn-outline">View Related Paper</a></div>` : '';
        return `
            <div class="research-card reveal delay-${(i % 3) + 1}">
                <div class="research-status ${item.status}">
                    <div class="dot"></div>
                    ${item.statusText}
                </div>
                <h3>${item.title}</h3>
                <div class="field">${item.field}</div>
                <p>${item.description}</p>
                <div class="research-collaborators">
                    <span>${item.collaborators}</span>
                </div>
                ${linkHtml}
            </div>
        `;
    });

});
