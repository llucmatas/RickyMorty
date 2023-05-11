// Funció per gestionar el clic al botó "Personatges"
function handlePersonatgesClick() {
    const characterId = prompt("Introdueix l'ID del personatge:");
  
    if (characterId !== null && characterId.trim() !== "") {
      fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(response => response.json())
        .then(data => {
          const characterName = document.getElementById("character-name");
          const characterStatus = document.getElementById("character-status");
          const characterSpecies = document.getElementById("character-species");
          const characterImage = document.getElementById("character-image");
  
          characterName.textContent = data.name;
          characterStatus.textContent = data.status;
          characterSpecies.textContent = data.species;
          characterImage.innerHTML = `<img src="${data.image}" alt="${data.name}">`;
        })
        .catch(error => console.log(error));
    } else {
      console.log("ID del personatge no vàlid");
    }
  }
  
  const personatgesBtn = document.getElementById("personatges-btn");
  personatgesBtn.addEventListener("click", handlePersonatgesClick);
  
// Funció per gestionar el clic al botó "Localitzacions"
function handleLocalitzacionsClick() {
    const locationId = prompt("Introdueix l'ID de la localització:");
  
    if (locationId !== null && locationId.trim() !== "") {
      fetch(`https://rickandmortyapi.com/api/location/${locationId}`)
        .then(response => response.json())
        .then(data => {
          const residentsList = document.getElementById("residents-list");
          const locationName = document.getElementById("location-name");
          const locationType = document.getElementById("location-type");
  
          locationName.textContent = data.name;
          locationType.textContent = data.type;
  
          const residents = data.residents;
          let residentsHTML = "";
  
          if (residents.length > 0) {
            residents.forEach(resident => {
              residentsHTML += `<li>${resident.name}</li>`;
            });
          } else {
            residentsHTML = "<li>No hi ha residents enregistrats</li>";
          }
  
          residentsList.innerHTML = residentsHTML;
        })
        .catch(error => console.log(error));
    } else {
      console.log("ID de la localització no vàlid");
    }
  }
  
  const localitzacionsBtn = document.getElementById("localitzacions-btn");
  localitzacionsBtn.addEventListener("click", handleLocalitzacionsClick);
  