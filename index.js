const accessKey = "NPGZEb1d0Dv-yJYJSyYNcFCTZ2ERPavc_EOGyJUshMk";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");
const darkModeToggleBtn = document.getElementById("dark-mode-toggle");
const feedbackTextarea = document.getElementById('feedbackTextarea');
const submitFeedbackBtn = document.getElementById('submitFeedbackBtn');
const body = document.body;

// Function to toggle dark mode
function toggleDarkMode() {
  body.classList.toggle("dark-mode");
  
  // Update button text based on current mode
  const isDarkMode = body.classList.contains("dark-mode");
  darkModeToggleBtn.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
}

// Event listener for dark mode toggle button
darkModeToggleBtn.addEventListener("click", toggleDarkMode);

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});

// Event listener for submitting feedback
const feedbackBtn = document.getElementById('feedbackBtn');
const feedbackForm = document.getElementById('feedbackForm');

feedbackBtn.addEventListener('click', function() {
  feedbackForm.style.display = 'block';
});
submitFeedbackBtn.addEventListener('click', function() {
  const feedback = feedbackTextarea.value;
  const feedbackForm = document.getElementById('feedbackForm'); // Get the feedback form element
  if (feedback.trim() !== '') {
    // Here you can send the feedback to your server or perform any other action
    alert('Feedback submitted successfully!');
    feedbackForm.style.display = 'none';
    feedbackTextarea.value = '';
  } else {
    alert('Please enter your feedback.');
  }
});