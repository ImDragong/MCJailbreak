document.addEventListener('DOMContentLoaded', () => {
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const contentArea = document.querySelector('.content-area');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const searchInput = document.getElementById('wiki-search');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.wiki-section');

    // 1. Sidebar Toggle Mechanics
    toggleSidebarBtn.addEventListener('click', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.toggle('hidden');
            contentArea.classList.toggle('expanded');
        } else {
            sidebar.classList.toggle('active-mobile');
        }
    });

    // 2. Tab Routing Framework
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Manage Active States
            navLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            sections.forEach(section => section.classList.remove('active'));
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Close responsive drawer layout on mobile tap
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active-mobile');
            }
        });
    });

    // 3. Simple Real-Time Client Search Filter
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        sections.forEach(section => {
            if (section.classList.contains('active')) {
                const textElements = section.querySelectorAll('p, h1, h4, li, summary');
                textElements.forEach(el => {
                    const match = el.textContent.toLowerCase().includes(query);
                    el.style.backgroundColor = match && query !== '' ? 'rgba(255, 235, 59, 0.4)' : 'transparent';
                });
            }
        });
    });

    // 4. Light/Dark Theme Controller
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
});
