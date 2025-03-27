// OMDb API Key and Base URL
const apiKey = 'f7b88eff'; 
const baseUrl = 'https://www.omdbapi.com/';

// DOM Elements
const movieContainer = document.querySelector('.movie-list');
const searchInput = document.querySelector('#searchInput');
const movieCategoryButton = document.querySelector('#movieCategory');
const tvCategoryButton = document.querySelector('#tvCategory');

// Store the current category and search query
let currentCategory = 'movie'; 
let currentQuery = ''; 

// Function to fetch movies and TV shows by category
function fetchMovies(category = 'movie', query = '') {
  const url = `${baseUrl}?apikey=${apiKey}&type=${category}${query ? `&s=${query}` : ''}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => displayMovies(data.Search, category)) 
    .catch(error => console.error('Error fetching data:', error));
}

// Function to display movies and TV shows
function displayMovies(items, category) {
  movieContainer.innerHTML = ''; 

  if (!items || items.length === 0) {
    //movieContainer.innerHTML = `<p>No ${category === 'movie' ? 'movies' : 'TV shows'} found.</p>`;
    return;
  }

  items.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('movie-item');
    itemElement.innerHTML = `
      <img src="${item.Poster !== 'N/A' ? item.Poster : 'https://via.placeholder.com/150'}" alt="${item.Title || item.Name}" />
      <h4>${item.Title || item.Name}</h4>
      <p>${item.Year || item.Released}</p>
    `;
    movieContainer.appendChild(itemElement);
  });
}

// Function to search for movies or TV shows based on user input
function searchMovies() {
  const query = searchInput.value.trim();
  if (query) {
    currentQuery = query;
  } else {
    currentQuery = ''; 
  }
  
  // Fetch movies or TV shows based on the current category and query
  fetchMovies(currentCategory, currentQuery);

   // Reset search input after search
     searchInput.value = '';
}

// Event listener for the search input to trigger search functionality
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') { 
    searchMovies(); 
  }
});

// Function to change between movies and series based on selection
function switchCategory(category) {
  currentCategory = category; 

  
  // Fetch movies or TV shows based on the current category and search query
  fetchMovies(category, currentQuery);
}

// Event listeners for category buttons
movieCategoryButton.addEventListener('click', () => {
  switchCategory('movie');
});

tvCategoryButton.addEventListener('click', () => {
  switchCategory('series');
});

// Initial fetch for movies (default category is 'movie')
fetchMovies('movie');


let accordian = document.getElementsByClassName("FAQ__title");

for (let i = 0; i < accordian.length; i++) {
  accordian[i].addEventListener("click", function () {
    if (this.childNodes[1].classList.contains("fa-plus")) {
      this.childNodes[1].classList.remove("fa-plus");
      this.childNodes[1].classList.add("fa-times");
    } else {
      this.childNodes[1].classList.remove("fa-times");
      this.childNodes[1].classList.add("fa-plus");
    }

    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

// Script to open and close the modal
document.querySelector(".signin__button").addEventListener("click", function () {
  document.getElementById("loginModal").style.display = "flex";
});

document.getElementById("closeBtn").addEventListener("click", function () {
  document.getElementById("loginModal").style.display = "none";
});

// Handle registration
function handleRegister() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
  }

  const userData = { email, password };

  // Send data to the server
  fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
  })
  .then(response => response.json())
  .then(data => {
      alert(data.message); 
      if (data.message === 'User registered successfully!') {
          document.getElementById('email').value = '';
          document.getElementById('password').value = '';
          document.getElementById('confirmPassword').value = '';
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}

// Handle login functionality
function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userData = { email, password };

  // Send login data to the server
  fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
  })
  .then(response => response.json())
  .then(data => {
      if (data.message === 'Login successful!') {
          alert('Login successful!');
          window.location.href = 'index.html'; 
      } else {
          alert('Invalid email or password!');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}


