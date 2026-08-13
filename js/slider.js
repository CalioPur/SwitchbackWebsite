window.addEventListener('load', () => {
    document.querySelectorAll('.item_type').forEach(section => {
        const items = section.querySelector('.items');
        if (!items) return;

        const leftBtn = document.createElement('button');
        leftBtn.className = 'scroll-btn left';
        leftBtn.innerHTML = '&#10094;';

        const rightBtn = document.createElement('button');
        rightBtn.className = 'scroll-btn right';
        rightBtn.innerHTML = '&#10095;';

        section.appendChild(leftBtn);
        section.appendChild(rightBtn);

        function getCardPositions() {
            const itemsRect = items.getBoundingClientRect();
            const scrollLeft = items.scrollLeft;
            const cards = Array.from(items.querySelectorAll('.type_categories'));

            return cards.map(card => ({
                el: card,
                position: card.getBoundingClientRect().left - itemsRect.left + scrollLeft
            }));
        }

        function update() {
            const hasOverflow = items.scrollWidth > items.clientWidth + 1;
            section.classList.toggle('has-overflow', hasOverflow);

            leftBtn.disabled = items.scrollLeft <= 0;
            rightBtn.disabled = items.scrollLeft + items.clientWidth >= items.scrollWidth - 1;
        }

        leftBtn.addEventListener('click', () => {
            const current = items.scrollLeft;
            const positions = getCardPositions();
            const prev = [...positions].reverse().find(c => c.position < current - 5);
            items.scrollTo({ left: prev ? prev.position : 0, behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', () => {
            const current = items.scrollLeft;
            const positions = getCardPositions();
            const next = positions.find(c => c.position > current + 5);
            if (next) items.scrollTo({ left: next.position, behavior: 'smooth' });
        });

        items.addEventListener('scroll', update);
        window.addEventListener('resize', update);

        update();

        // Le navigateur peut choisir un point de repos initial en se basant sur la
        // mise en page d'avant l'ajout du padding du mask ci-dessus. On force la
        // position 0 (début réel, buffer du fondu inclus) pour partir sur une base
        // fiable, sans coller la 1ère carte au bord (ce qui annulerait le buffer).
        if (section.classList.contains('has-overflow')) {
            items.scrollTo({ left: -30, behavior: 'auto' });
        }
    });
});