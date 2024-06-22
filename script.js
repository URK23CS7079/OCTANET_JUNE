document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.hamburger-menu');
    const nav = document.querySelector('nav ul');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }

    // Form validation
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = (form.querySelector('input[name="name"]')).value.trim();
        const email = (form.querySelector('input[name="email"]')).value.trim();
        const message = (form.querySelector('textarea[name="message"]')).value.trim();

        if (name && email && message) {
            alert('Thank you for your message!');
            form.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
});
