// Fetch user data from JSON file
let users = [];

fetch("users.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    users = data;
  })
  .catch((error) => {
    console.error("Error loading user data:", error);
  });

// Show user details
function searchUser() {
  const input = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const detailsDiv = document.getElementById("userDetails");

  detailsDiv.innerHTML = "";

  // Case-insensitive match for the user name
  const user = users.find((u) => u.name.toLowerCase() === input);

  if (user) {
    for (const [key, value] of Object.entries(user)) {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      detailsDiv.innerHTML += `<div><strong>${label}:</strong> ${value}</div>`;
    }
  } else if (input) {
    detailsDiv.innerHTML = `<div class="no-data">No user found.</div>`;
  }
}

// Show suggestions for names that start with input
function showSuggestions() {
  const input = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();
  const suggestionsDiv = document.getElementById("suggestions");

  // Clear previous suggestions
  suggestionsDiv.innerHTML = "";

  if (input) {
    // Filter users where name starts with input (case-insensitive)
    const startsWith = users.filter((u) =>
      u.name.toLowerCase().startsWith(input)
    );

    // Show matching suggestions
    if (startsWith.length > 0) {
      startsWith.forEach((user) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add("suggestion-item");
        suggestionItem.textContent = user.name;

        // Add click event to fill input and search
        suggestionItem.addEventListener("click", () => {
          document.getElementById("searchInput").value = user.name;
          suggestionsDiv.innerHTML = "";
          searchUser();
        });

        suggestionsDiv.appendChild(suggestionItem);
      });
    } else {
      suggestionsDiv.innerHTML = `<div class="no-data">No suggestions found.</div>`;
    }
  }
}
