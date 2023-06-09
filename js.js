let nextPage = '';
let previousPage = '';
let table = '';
const tableContent = document.querySelector(".table-content");
async function getCharacters(page) {

}
async function getPersonatje(characterId) {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
    return await response.json();
}

async function getLocalitzacio(locationId) {
    const response = await fetch(`https://rickandmortyapi.com/api/location/${locationId}`)
    return await response.json();
}

// Funció per gestionar el clic al botó "Personatges"
async function handlePersonatgesClick() {
    table = 'character'
    fetchCharacters(`https://rickandmortyapi.com/api/character`);
}

const personatgesBtn = document.getElementById("personatges-btn");
personatgesBtn.addEventListener("click", handlePersonatgesClick);

// Funció per gestionar el clic al botó "Localitzacions"
async function handleLocalitzacionsClick() {
    table = 'location';
    fetchLocation(`https://rickandmortyapi.com/api/location`);
}

async function fetchLocation(page) {

    tableContent.innerHTML = `
    <thead>
    <tr>
      <th>Nom</th>
      <th>Tipus</th>
      <th>Dimensió</th>
      <th>Accions</th>
    </tr>
  </thead>`;

    const response = await fetch(page)
    const data = await response.json();

    previousPage = data.info.prev;
    nextPage = data.info.next;

    const tbody = document.createElement("tbody");
    for (const result of data.results) {
        const row = document.createElement("tr")
        const name = document.createElement("td")
        const type = document.createElement("td")
        const dimension = document.createElement("td")

        name.textContent = result.name;
        type.textContent = result.type;
        dimension.textContent = result.dimension;
        row.appendChild(name);
        row.appendChild(type);
        row.appendChild(dimension);

        const showButton = document.createElement('button');
        showButton.textContent = 'Mostrar detalls';
        showButton.addEventListener('click', () => {
            showLocation(result.id);
        });
        row.appendChild(showButton);

        tbody.appendChild(row);
    }
    tableContent.appendChild(tbody);
}

async function showLocation(locationId) {
    if (locationId !== null) {
        const location = await getLocalitzacio(locationId);
        const residentsList = document.getElementById("residents-list");
        const locationName = document.getElementById("location-name");
        const locationType = document.getElementById("location-type");

        locationName.textContent = location.name;
        locationType.textContent = location.type;

        const residents = location.residents;
        let residentsHTML = "";

        if (residents.length > 0) {
            for (const residenturl of residents) {
                const response = await fetch(residenturl);
                const resident = await response.json();
                residentsHTML += `<li>${resident.name}</li>`;
            }
        } else {
            residentsHTML = "<li>No hi ha residents enregistrats</li>";
        }

        residentsList.innerHTML = residentsHTML;
    } else {
        console.log("ID de la localització no vàlid");
    }
}

async function fetchCharacters(page) {
    tableContent.innerHTML = `
<thead>
  <tr>
    <th>Nom</th>
    <th>Estat</th>
    <th>Especie</th>
    <th>Genere</th>
    <th>Accions</th>
  </tr>
</thead>
    `;
    const response = await fetch(page)
    const data = await response.json();

    previousPage = data.info.prev;
    nextPage = data.info.next;

    const tbody = document.createElement("tbody");
    for (const result of data.results) {
        const row = document.createElement("tr")
        const name = document.createElement("td")
        const status = document.createElement("td")
        const species = document.createElement("td")
        const gender = document.createElement("td")
        name.textContent = result.name;
        status.textContent = result.status;
        species.textContent = result.species;
        gender.textContent = result.gender;


        row.appendChild(name);
        row.appendChild(status);
        row.appendChild(species);
        row.appendChild(gender)

        const showButton = document.createElement('button');
        showButton.textContent = 'Mostrar detalls';
        showButton.addEventListener('click', () => {
            showCharacter(result.id);
        });
        row.appendChild(showButton);

        tbody.appendChild(row);
    }
    tableContent.appendChild(tbody);
}

async function showCharacter(characterId) {

    if (characterId !== null) {
        const character = await getPersonatje(characterId)
        const characterName = document.getElementById("character-name");
        const characterStatus = document.getElementById("character-status");
        const characterSpecies = document.getElementById("character-species");
        const characterImage = document.getElementById("character-image");

        characterName.textContent = character.name;
        characterStatus.textContent = character.status;
        characterSpecies.textContent = character.species;
        characterImage.innerHTML = `<img src="${character.image}" alt="${character.name}">`;
    } else {
        console.log("ID del personatge no vàlid");
    }
}

const localitzacionsBtn = document.getElementById("localitzacions-btn");
localitzacionsBtn.addEventListener("click", handleLocalitzacionsClick);

const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");

previousBtn.addEventListener("click", loadPreviousPage);
nextBtn.addEventListener("click", loadNextPage);

function loadPreviousPage() {
    // Aquí pots escriure el codi per carregar la pàgina anterior
    if (!previousPage) {
        return;
    }

    if (table === 'location') {
        fetchLocation(previousPage);
    } else {
        fetchCharacters(previousPage);
    }
}

function loadNextPage() {
    // Aquí pots escriure el codi per carregar la següent pàgina
    if (!nextPage) {
        return;
    }

    if (table === 'location') {
        fetchLocation(nextPage);
    } else {
        fetchCharacters(nextPage);
    }
}
