// Toggle details for company cards
document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.company-card .toggle');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.company-card');
      const details = card.querySelector('.details');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        details.style.display = 'none';
        btn.textContent = 'Ver mais';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        details.style.display = 'block';
        btn.textContent = 'Ver menos';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // The contact form now posts directly to an external service (formsubmit.co),
  // so no custom JavaScript handler is needed here.

  // Scroll reveal using IntersectionObserver
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // When stats section becomes visible, animate numbers
        if (entry.target.id === 'destaques') {
          animateStats();
        }
      }
    });
  }, {
    threshold: 0.2
  });
  revealElements.forEach(el => observer.observe(el));

  // Animate statistics numbers
  function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      let count = 0;
      const increment = target / 100;
      const updateCount = () => {
        count += increment;
        if (count < target) {
          stat.textContent = Math.ceil(count);
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      };
      updateCount();
    });
  }

  // Fetch and display the total number of visits using CountAPI.
  // This will increment the visit count every time the page loads and
  // update the "Visitas" stat with the current value.
  (function updateVisitCount() {
    const visitElement = document.getElementById('visit-count');
    if (visitElement) {
      // Use a unique namespace and key to avoid collisions with other sites.
      const endpoint = 'https://api.countapi.xyz/hit/leonildo-portal/visits';
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          visitElement.textContent = data.value;
        })
        .catch(err => {
          // In case of a network error, keep the default value.
          console.error('Não foi possível atualizar o contador de visitas:', err);
        });
    }
  })();
});