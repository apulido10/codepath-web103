const keyboardList = document.getElementById("keyboard-list");
const searchInput = document.getElementById("search");

// Fetches keyboards from the backend (which reads them from PostgreSQL) and
// renders them. An optional search term is passed to the API as a query param
// so the database does the filtering (stretch feature).
async function getKeyboards(search = "") {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  const response = await fetch(`/keyboard${query}`);
  const keyboards = await response.json();

  keyboardList.innerHTML = "";

  if (keyboards.length === 0) {
    keyboardList.innerHTML = "<p>No keyboards found.</p>";
    return;
  }

  keyboards.forEach((keyboard) => {
    keyboardList.innerHTML += `
      <article>
        <h2>${keyboard.name}</h2>
        <img src="${keyboard.image}" alt="${keyboard.name}">
        <a href="/keyboard/${keyboard.id}">View Details</a>
      </article>
    `;
  });
}

// Re-query the database as the user types in the search box.
searchInput.addEventListener("input", (event) => {
  getKeyboards(event.target.value);
});

getKeyboards();
