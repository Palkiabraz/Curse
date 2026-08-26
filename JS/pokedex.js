const cards = [
  { name: 'Aegislash', image: './Images/Cartes/Aegislash.png', sound: './Sons/Aegislash.ogg' },
  { name: 'Annihilape', image: './Images/Cartes/Annihilape.png', sound: './Sons/Annihilape.ogg' },
  { name: 'Banette', image: './Images/Cartes/Banette.png', sound: './Sons/Banette.ogg' },
  { name: 'Basculegion', image: './Images/Cartes/Basculegion.png', sound: './Sons/Basculegion.ogg' },
  { name: 'Brambleghast', image: './Images/Cartes/Brambleghast.png', sound: './Sons/Brambleghast.ogg' },
  { name: 'Ceruledge', image: './Images/Cartes/Ceruledge.png', sound: './Sons/Ceruledge.ogg' },
  { name: 'Chandelure', image: './Images/Cartes/Chandelure.png', sound: './Sons/Chandelure.ogg' },
  { name: 'Cofagrigus', image: './Images/Cartes/Cofagrigus.png', sound: './Sons/Cofagrigus.ogg' },
  { name: 'Cursola', image: './Images/Cartes/Cursola.png', sound: './Sons/Cursola.ogg' },
  { name: 'Decidueye', image: './Images/Cartes/Decidueye.png', sound: './Sons/Decidueye.ogg' },
  { name: 'Dhelmise', image: './Images/Cartes/Dhelmise.png', sound: './Sons/Dhelmise.ogg' },
  { name: 'Dragapult', image: './Images/Cartes/Dragapult.png', sound: './Sons/Dragapult.ogg' },
  { name: 'Drifblim', image: './Images/Cartes/Drifblim.png', sound: './Sons/Drifblim.ogg' },
  { name: 'Dusknoir', image: './Images/Cartes/Dusknoir.png', sound: './Sons/Dusknoir.ogg' },
  { name: 'Froslass', image: './Images/Cartes/Froslass.png', sound: './Sons/Froslass.ogg' },
  { name: 'Gengar', image: './Images/Cartes/Gengar.png', sound: './Sons/Gengar.ogg' },
  { name: 'Gholdengo', image: './Images/Cartes/Gholdengo.png', sound: './Sons/Gholdengo.ogg' },
  { name: 'Golurk', image: './Images/Cartes/Golurk.png', sound: './Sons/Golurk.ogg' },
  { name: 'Gourgeist', image: './Images/Cartes/Gourgeist.png', sound: './Sons/Gourgeist.ogg' },
  { name: 'Houndstone', image: './Images/Cartes/Houndstone.png', sound: './Sons/Houndstone.ogg' },
  { name: 'Jellicent', image: './Images/Cartes/Jellicent.png', sound: './Sons/Jellicent.ogg' },
  { name: 'Marowak', image: './Images/Cartes/Marowak.png', sound: './Sons/Marowak.ogg' },
  { name: 'Mimikyu', image: './Images/Cartes/Mimikyu.png', sound: './Sons/Mimikyu.ogg' },
  { name: 'Mismagius', image: './Images/Cartes/Mismagius.png', sound: './Sons/Mismagius.ogg' },
  { name: 'Palossand', image: './Images/Cartes/Palossand.png', sound: './Sons/Palossand.ogg' },
  { name: 'Polteageist', image: './Images/Cartes/Polteageist.png', sound: './Sons/Polteageist.ogg' },
  { name: 'Rotom', image: './Images/Cartes/Rotom.png', sound: './Sons/Rotom.ogg' },
  { name: 'Runerigus', image: './Images/Cartes/Runerigus.png', sound: './Sons/Runerigus.ogg' },
  { name: 'Sableye', image: './Images/Cartes/Sableye.png', sound: './Sons/Sableye.ogg' },
  { name: 'Shedinja', image: './Images/Cartes/Shedinja.png', sound: './Sons/Shedinja.ogg' },
  { name: 'Sinistcha', image: './Images/Cartes/Sinistcha.png', sound: './Sons/Sinistcha.ogg' },
  { name: 'Skeledirge', image: './Images/Cartes/Skeledirge.png', sound: './Sons/Skeledirge.ogg' },
  { name: 'Spiritomb', image: './Images/Cartes/Spiritomb.png', sound: './Sons/Spiritomb.ogg' },
  { name: 'Trevenant', image: './Images/Cartes/Trevenant.png', sound: './Sons/Trevenant.ogg' },
  { name: 'Typhlosion', image: './Images/Cartes/Typhlosion.png', sound: './Sons/Typhlosion.ogg' },
  { name: 'Zoroark', image: './Images/Cartes/Zoroark.png', sound: './Sons/Zoroark.ogg' }
];

const catalog = document.getElementById('card-catalog');
const searchInput = document.getElementById('card-search');
const resultsCounter = document.getElementById('search-results');
const modalOverlay = document.getElementById('card-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.getElementById('modal-close');
const cardMap = new Map(cards.map((card) => [card.name.toLowerCase(), card]));
const audioPlayer = new Audio();

function normalizeText(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function updateResultsCounter(count) {
  resultsCounter.textContent = `${count} Pokémon found using the search filter`;
}

function createCardElement(card) {
  const article = document.createElement('button');
  article.type = 'button';
  article.className = 'catalog-card';
  article.dataset.name = card.name.toLowerCase();
  article.setAttribute('aria-label', `Show ${card.name}`);
  article.innerHTML = `
    <img src="${card.image}" alt="${card.name}" loading="lazy">
    <span>${card.name}</span>
  `;

  return article;
}

function renderCards(filter = '') {
  const normalizedFilter = normalizeText(filter.trim());
  const filteredCards = cards.filter(({ name }) =>
    normalizeText(name).includes(normalizedFilter)
  );

  catalog.replaceChildren(...filteredCards.map(createCardElement));
  updateResultsCounter(filteredCards.length);
}

function openCardModal(card) {
  modalImage.src = card.image;
  modalImage.alt = card.name;
  modalOverlay.classList.add('visible');
  modalOverlay.setAttribute('aria-hidden', 'false');
}

function closeCardModal() {
  modalOverlay.classList.remove('visible');
  modalOverlay.setAttribute('aria-hidden', 'true');
}

function playCardSound(card) {
  if (!card.sound) {
    return;
  }

  audioPlayer.src = card.sound;
  audioPlayer.currentTime = 0;
  audioPlayer.volume = 0.25;
  audioPlayer.play().catch(() => {});
}

searchInput.addEventListener('input', (event) => {
  renderCards(event.target.value);
});

catalog.addEventListener('click', (event) => {
  const cardButton = event.target.closest('.catalog-card');

  if (!cardButton) {
    return;
  }

  const card = cardMap.get(cardButton.dataset.name);

  if (!card) {
    return;
  }

  openCardModal(card);
  playCardSound(card);
});

modalClose.addEventListener('click', closeCardModal);
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    closeCardModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalOverlay.classList.contains('visible')) {
    closeCardModal();
  }
});

renderCards();
