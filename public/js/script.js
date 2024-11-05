document.addEventListener('DOMContentLoaded', function(){

    const allButtons = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');
    const elements = document.querySelectorAll('.fade');

    function handleScroll() {
      elements.forEach(element => {
          const rect = element.getBoundingClientRect();
          const windowHeight = (window.innerHeight || document.documentElement.clientHeight);

          if (rect.top <= windowHeight && rect.bottom >= 0) {
              // Element is in view
              element.classList.add('visible');
          } else {
              // Element is out of view
              element.classList.remove('visible');
          }
      });
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check in case elements are already in view
  
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('click', function() {
        searchBar.style.visibility = 'visible';
        searchBar.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
        searchInput.focus();
      });
    }
  
    searchClose.addEventListener('click', function() {
      searchBar.style.visibility = 'hidden';
      searchBar.classList.remove('open');
      this.setAttribute('aria-expanded', 'false');
    });
  
  
  });