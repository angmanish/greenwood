document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('virtual-tour-modal');
  var btns = document.querySelectorAll('#virtual-tour-button');
  var span = document.getElementsByClassName('close-button')[0];

  btns.forEach(function(btn) {
    btn.onclick = function() {
      modal.style.display = 'block';
    }
  });

  if(span) {
    span.onclick = function() {
      modal.style.display = 'none';
    }
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  var form = document.getElementById('virtual-tour-form');
  if(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch('https://api.web3forms.com/submit', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
              },
              body: json
          })
          .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                  modal.style.display = 'none'; // Close modal first
                  showAnimatedPopup('Thank you for your interest! We will contact you shortly.', 'success');
              } else {
                  console.log(response);
                  modal.style.display = 'none'; // Close modal first
                  showAnimatedPopup('Something went wrong. Please try again.', 'error');
              }
          })
          .catch(error => {
              console.log(error);
              modal.style.display = 'none'; // Close modal first
              showAnimatedPopup('Something went wrong. Please try again.', 'error');
          })
          .then(function() {
              form.reset();
          });

    });
  }

  // Function to show animated popup
  function showAnimatedPopup(message, type) {
    const popup = document.createElement('div');
    popup.classList.add('animated-popup', type);
    popup.textContent = message;
    document.body.appendChild(popup);

    setTimeout(() => {
      popup.classList.add('show');
    }, 10);

    setTimeout(() => {
      popup.classList.remove('show');
      popup.classList.add('hide');
      popup.addEventListener('transitionend', () => popup.remove());
    }, 3000);
  }
});