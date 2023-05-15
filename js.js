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
    tableContent.innerHTML = `
<thead>
  <tr>
    <th>name</th>
    <th>status</th>
    <th>species</th>
    <th>gender</th>
  </tr>
</thead>
    `;

    const characterId = prompt("Introdueix l'ID del personatge:");

    if (characterId !== null && characterId.trim() !== "") {
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

const personatgesBtn = document.getElementById("personatges-btn");
personatgesBtn.addEventListener("click", handlePersonatgesClick);

// Funció per gestionar el clic al botó "Localitzacions"
async function handleLocalitzacionsClick() {
    tableContent.innerHTML=`
    <thead>
    <tr>
      <th>name</th>
      <th>type</th>
      <th>dimension</th>
    </tr>
  </thead>`;

    const locationId = prompt("Introdueix l'ID de la localització:");

    if (locationId !== null && locationId.trim() !== "") {
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

const localitzacionsBtn = document.getElementById("localitzacions-btn");
localitzacionsBtn.addEventListener("click", handleLocalitzacionsClick);

