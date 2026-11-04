const CONTACT_FORM_EMAIL = 'dhlineback@gmail.com';

document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  const form = document.getElementById('contactForm');
  if (form) {
    const status = document.getElementById('formStatus');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async function(event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submitButton.disabled = true;
      status.textContent = 'Sending...';
      status.className = 'form-status';

      const data = new FormData(form);

      try {
        const response = await fetch('https://formsubmit.co/ajax/' + CONTACT_FORM_EMAIL, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: data
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        form.reset();
        status.textContent = 'Thanks! Your message has been sent.';
        status.className = 'form-status success';
      } catch (error) {
        status.textContent = 'Sorry, something went wrong. Please try again or call (801) 259-7311.';
        status.className = 'form-status error';
      } finally {
        submitButton.disabled = false;
      }
    });
  }
});
