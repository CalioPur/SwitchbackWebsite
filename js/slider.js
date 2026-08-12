document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.item_type').forEach(section => {
        const items = section.querySelector('.items');
        if (!items) return;

        // Création des flèches
        const leftBtn = document.createElement('button');
        leftBtn.className = 'scroll-btn left';
        leftBtn.innerHTML = '&#10094;';

        const rightBtn = document.createElement('button');
        rightBtn.className = 'scroll-btn right';
        rightBtn.innerHTML = '&#10095;';

        section.appendChild(leftBtn);
        section.appendChild(rightBtn);

        function update() {
            const hasOverflow = items.scrollWidth > items.clientWidth + 1;
            section.classList.toggle('has-overflow', hasOverflow);

            leftBtn.disabled = items.scrollLeft <= 0;
            rightBtn.disabled = items.scrollLeft + items.clientWidth >= items.scrollWidth - 1;
        }

        leftBtn.addEventListener('click', () => {
            items.scrollBy({ left: -300, behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', () => {
            items.scrollBy({ left: 300, behavior: 'smooth' });
        });

        items.addEventListener('scroll', update);
        window.addEventListener('resize', update);

        update();
    });
});