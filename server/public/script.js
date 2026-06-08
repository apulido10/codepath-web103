const keyboardList = document.getElementById("keyboard-list");

async function getKeyboards() {
  const response = await fetch("/keyboard");

  const keyboards = await response.json();

  keyboards.forEach((keyboard) => {
    keyboardList.innerHTML += `
      <article>
        <h2>${keyboard.name}</h2>
        <img src="${keyboard.image}" alt="${keyboard.name}">
        <a href="/keyboard/${keyboard.id}">
  View Details
</a>
      </article>
    `;
  });
}

getKeyboards();
