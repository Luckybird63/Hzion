// Hzion Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  const mobileMenu = document.querySelector('.navbar-menu');
  const mobileToggle = document.querySelector('.navbar-toggle');

  mobileToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    mobileToggle.innerHTML = mobileMenu.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();

        const targetElement = document.querySelector(targetId);
        const offsetTop =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          80; // Adjust for fixed navbar height

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });

        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      }
    });
  });

  // Map functionality
  const mapImage = document.querySelector('.map-image');
  const nearestBtn = document.getElementById('nearest-btn');
  const allBtn = document.getElementById('all-btn');
  const stationsList = document.querySelector('.stations-list');

  // Updated station data with relevant images
  const stations = [
    {
      id: 1,
      name: 'Hzion Station - Downtown',
      address: '123 Main Street, City Center',
      hours: 'Open 24/7',
      dispensers: 10,
      image:
        'download (9).jpeg',
      mapHighlight:
        'https://upload.wikimedia.org/wikipedia/commons/8/8e/Hydrogen_Stations_Map_2020_Europe.png', // Substitute with highlighted map if available
      directionsURL: 'https://www.google.com/maps/dir/?api=1&destination=123+Main+Street+City+Center',
    },
    {
      id: 2,
      name: 'Hzion Station - Westside',
      address: '456 West Avenue, Westside',
      hours: 'Open 24/7',
      dispensers: 8,
      image:
        'download (8).jpeg',
      mapHighlight:
        'https://upload.wikimedia.org/wikipedia/commons/8/8e/Hydrogen_Stations_Map_2020_Europe.png',
      directionsURL: 'https://www.google.com/maps/dir/?api=1&destination=456+West+Avenue+Westside',
    },
    {
      id: 3,
      name: 'Hzion Station - Eastside',
      address: '789 East Boulevard, Eastside',
      hours: 'Open 24/7',
      dispensers: 12,
      image:
        'download (7).jpeg',
      mapHighlight:
        'https://upload.wikimedia.org/wikipedia/commons/8/8e/Hydrogen_Stations_Map_2020_Europe.png',
      directionsURL: 'https://www.google.com/maps/dir/?api=1&destination=789+East+Boulevard+Eastside',
    },
    {
      id: 4,
      name: 'Hzion Station - Northside',
      address: '321 North Road, Northside',
      hours: 'Open 24/7',
      dispensers: 6,
      image:
        'download (6).jpeg',
      mapHighlight:
        'https://upload.wikimedia.org/wikipedia/commons/8/8e/Hydrogen_Stations_Map_2020_Europe.png',
      directionsURL: 'https://www.google.com/maps/dir/?api=1&destination=321+North+Road+Northside',
    },
  ];

  // Initialize stations list with all stations
  function renderStations(stationsToRender, title = 'Nearby Stations') {
    let stationsHTML = `<h3>${title}</h3>`;

    stationsToRender.forEach((station) => {
      stationsHTML += `
      <div class="station-card" tabindex="0" aria-label="${station.name}, ${station.address}">
        <img src="${station.image}" alt="${station.name} image" loading="lazy" style="border-radius:12px; max-width:100%; margin-bottom:1rem; box-shadow: 0 6px 12px rgba(0,0,0,0.15);" />
        <div class="station-info">
          <h4>${station.name}</h4>
          <p><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${station.address}</p>
          <p><i class="fas fa-clock" aria-hidden="true"></i> ${station.hours}</p>
          <p><i class="fas fa-gas-pump" aria-hidden="true"></i> ${station.dispensers} Dispensers Available</p>
        </div>
        <a href="${station.directionsURL}" target="_blank" rel="noopener" class="btn-direction" aria-label="Get directions to ${station.name}">Get Directions</a>
      </div>`;
    });

    stationsList.innerHTML = stationsHTML;
    stationsList.style.animation = 'fadeInUp 0.5s ease';

    // Reset map image to default station map
    mapImage.src =
      'download (4).jpeg';
    mapImage.alt = 'Hydrogen Stations Map';

    // Remove inline animation style after animation ends for repeated animations
    stationsList.addEventListener(
      'animationend',
      () => {
        stationsList.style.animation = '';
      },
      { once: true }
    );
  }

  // Initial render of all stations on page load
  renderStations(stations);

  // Show nearest station
  nearestBtn.addEventListener('click', function () {
    // Simulate finding nearest station (we use the first station)
    const nearestStation = stations[0];

    // Update map with optional highlighted map or keep default
    mapImage.src = nearestStation.mapHighlight || mapImage.src;
    mapImage.alt = `Map highlighting ${nearestStation.name}`;

    // Render nearest station only
    renderStations([nearestStation], 'Nearest Station');
  });

  // Show all stations
  allBtn.addEventListener('click', function () {
    renderStations(stations, 'Nearby Stations');
  });

  // Contact form submission
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values trimmed for better validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation with email pattern
    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    if (!validateEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    // Simulate successful submission (real implementation would send to a backend)
    showNotification("Thank you for your message! We'll get back to you soon.", 'success');

    contactForm.reset();
  });

  // Newsletter subscription
  const newsletterForm = document.getElementById('newsletter-form');

  newsletterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailInput = this.querySelector('input');
    const email = emailInput.value.trim();

    if (!email) {
      showNotification('Please enter your email address', 'error');
      return;
    }
    if (!validateEmail(email)) {
      showNotification('Please enter a valid email address', 'error');
      return;
    }

    showNotification('Thank you for subscribing to our newsletter!', 'success');
    newsletterForm.reset();
  });

  // Validate email format function
  function validateEmail(email) {
    // Simple regex for demonstration purposes
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Direction buttons click handler uses delegation
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-direction')) {
      e.preventDefault();

      // Safe navigation to station card info
      const stationCard = e.target.closest('.station-card');
      if (!stationCard) return;

      const stationNameElement = stationCard.querySelector('.station-info h4');
      const stationName = stationNameElement ? stationNameElement.textContent : 'the station';

      showNotification(`Directions to ${stationName} opening in Google Maps`, 'info');

      // Open directions in new tab for real navigation
      const directionsLink = e.target.href;
      if (directionsLink) {
        window.open(directionsLink, '_blank', 'noopener,noreferrer');
      }
    }
  });

  // Vehicle Learn More buttons handler (delegation)
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-learn')) {
      e.preventDefault();

      // Vehicle card is parent
      const vehicleCard = e.target.closest('.vehicle-card');
      if (!vehicleCard) return;

      // Vehicle name from card
      const vehicleNameElement = vehicleCard.querySelector('h3');
      const vehicleName = vehicleNameElement ? vehicleNameElement.textContent : 'this vehicle';

      // Show informational notification
      showNotification(`More information about ${vehicleName} coming soon!`, 'info');

      // Optionally: Open a modal or new page here in future expansions
    }
  });

  // Notification system
  function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${getNotificationIcon(type)}" aria-hidden="true"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close" aria-label="Close notification">
        <i class="fas fa-times" aria-hidden="true"></i>
      </button>
    `;

    // Add notification to DOM
    document.body.appendChild(notification);

    // Position and animate notification
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.transform = 'translateY(100%)';
    notification.style.opacity = '0';

    setTimeout(() => {
      notification.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      notification.style.transform = 'translateY(0)';
      notification.style.opacity = '1';
    }, 10);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function () {
      closeNotification(notification);
    });

    // Auto-close after 5 seconds
    const autoCloseTimeout = setTimeout(() => {
      if (document.body.contains(notification)) {
        closeNotification(notification);
      }
    }, 5000);

    // Clear timeout if user closes manually
    function closeNotification(elem) {
      elem.style.transform = 'translateY(100%)';
      elem.style.opacity = '0';
      clearTimeout(autoCloseTimeout);

      setTimeout(() => {
        if (document.body.contains(elem)) {
          document.body.removeChild(elem);
        }
      }, 300);
    }
  }

  function getNotificationIcon(type) {
    switch (type) {
      case 'success':
        return 'fa-check-circle';
      case 'error':
        return 'fa-exclamation-circle';
      case 'info':
        return 'fa-info-circle';
      default:
        return 'fa-bell';
    }
  }

  // Initialize tooltips
  initTooltips();
});

// Tooltip system
function initTooltips() {
  const tooltipTriggers = document.querySelectorAll('[data-tooltip]');

  tooltipTriggers.forEach((trigger) => {
    let tooltip;
    trigger.addEventListener('mouseenter', function () {
      tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = this.getAttribute('data-tooltip');

      // Append tooltip for dimensions
      document.body.appendChild(tooltip);
      const rect = this.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      // Position tooltip above centered horizontally with fallback
      let top = rect.top + window.scrollY - tooltipRect.height - 8;
      if (top < 0) top = rect.bottom + window.scrollY + 8;

      let left = rect.left + rect.width / 2 + window.scrollX - tooltipRect.width / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - tooltipRect.width - 8));

      tooltip.style.position = 'absolute';
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
      tooltip.style.pointerEvents = 'none'; // Prevent mouse interaction
      tooltip.style.zIndex = '9999';
      tooltip.style.opacity = '0';
      tooltip.style.transition = 'opacity 0.3s ease';

      // Show tooltip
      requestAnimationFrame(() => {
        tooltip.style.opacity = '1';
      });
    });

    trigger.addEventListener('mouseleave', function () {
      if (tooltip && tooltip.parentNode) {
        tooltip.style.opacity = '0';
        setTimeout(() => {
          if (tooltip.parentNode) {
            tooltip.parentNode.removeChild(tooltip);
          }
        }, 300);
      }
    });
  });
}