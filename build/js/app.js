document.addEventListener('DOMContentLoaded', function() {
    createGallery();
    HighlightLink();
    scrollNav();
});

function createGallery() {
    const number_Of_Images = 16
    const gallery = document.querySelector('.gallery-img');

    for (let i = 1; i <= number_Of_Images; i++) {
        const image = document.createElement('IMG');
        image.src = `../src/img/gallery/full/${i}.jpg`;
        image.alt = 'Gallery image';

        // Event Handler
        image.onclick = function() {
            showImage(i)
        }

        gallery.appendChild(image);
    }
}

function showImage(i) {
    const image = document.createElement('IMG');
    image.src = `../src/img/gallery/full/${i}.jpg`;
    image.alt = 'Gallery image';

    const modal = document.createElement('DIV')
    modal.classList.add('modal')

    const closeModalBtn = document.createElement('BUTTON')
    closeModalBtn.textContent = 'X'
    closeModalBtn.classList.add('btn-close')
    closeModalBtn.onclick = closeModal

    modal.appendChild(image)
    modal.appendChild(closeModalBtn)

    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}

function closeModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove()

        const body = document.querySelector('body')
        body.classList.remove('overflow-hidden')
    }, 490);
    
}

function HighlightLink() {
    document.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.main-nav a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) { 
                current = section.id; 
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            } else {
                link.classList.remove('active'); 
            }
        });
    });
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.main-nav a')

    navLinks.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault()
            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({behavior: 'smooth'})
        })
    })
}