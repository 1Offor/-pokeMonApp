const apiBaseUrl = 'https://pokeapi.co/api/v2/pokemon/';

// Fetch Pokémon data
async function fetchPokemon(query) {
  try {
    const response = await fetch(apiBaseUrl + query.toLowerCase());
    if (!response.ok) throw new Error('Pokémon not found');
    return await response.json();
  } catch (error) {
    alert(error.message);
    return null;
  }
}

// Populate Pokémon details
function populatePokemonDetails(pokemon) {
  document.getElementById('pokemon-name').textContent = pokemon.name.toUpperCase();
  document.getElementById('pokemon-id').textContent = `#${pokemon.id}`;
  document.getElementById('weight').textContent = `Weight: ${pokemon.weight}`;
  document.getElementById('height').textContent = `Height: ${pokemon.height}`;

  // Clear and set types
  const typesContainer = document.getElementById('types');
  typesContainer.innerHTML = '';
  pokemon.types.forEach(typeInfo => {
    const typeElement = document.createElement('div');
    typeElement.textContent = typeInfo.type.name.toUpperCase();
    typesContainer.appendChild(typeElement);
  });

  // Set stats
  const stats = {};
  pokemon.stats.forEach(stat => {
    stats[stat.stat.name] = stat.base_stat;
  });
  document.getElementById('hp').textContent = stats.hp;
  document.getElementById('attack').textContent = stats.attack;
  document.getElementById('defense').textContent = stats.defense;
  document.getElementById('special-attack').textContent = stats['special-attack'];
  document.getElementById('special-defense').textContent = stats['special-defense'];
  document.getElementById('speed').textContent = stats.speed;

  // Add sprite image
  const spriteContainer = document.getElementById('sprite-container');
  spriteContainer.innerHTML = '';
  const sprite = document.createElement('img');
  sprite.id = 'sprite';
  sprite.src = pokemon.sprites.front_default;
  sprite.alt = `${pokemon.name} sprite`;
  spriteContainer.appendChild(sprite);
}

// Handle search button click
document.getElementById('search-button').addEventListener('click', async () => {
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  const pokemon = await fetchPokemon(query);
  if (pokemon) populatePokemonDetails(pokemon);
});