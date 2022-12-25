window.onload = () => {
    new Swiper('.swiper-container', {
        loop: true,
        autoHeight: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: true
        },
        speed: 500,
        effect: 'fade',
    });

    smoothScroll();
}
const smoothScroll = () => {
    const smooth = 10;
    const divisor = 8;
    const range = (divisor / 2) + 1;
    const links = document.querySelectorAll('a[href^="#"]');

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (e) {

            e.preventDefault();
            let moveY;
            let currentY = window.pageYOffset;
            const href = e.target.getAttribute('href');
            const target = document.querySelector(href);
            const position = target.getBoundingClientRect();
            const targetY = position.top + currentY;

            (scroll = () => {
                moveY = currentY + Math.round((targetY - currentY) / divisor);
                window.scrollTo(0, moveY);
                currentY = moveY;

                if (document.body.clientHeight - window.innerHeight < moveY) {
                    window.scrollTo(0, document.body.clientHeight);
                    return;
                }
                if (moveY >= targetY + range || moveY <= targetY - range) {
                    window.setTimeout(scroll, smooth);
                } else {
                    window.scrollTo(0, targetY);
                }
            })();
        });
    }
}