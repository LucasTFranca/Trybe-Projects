const cartItemsClass = 'cart__items';

async function getItem(phrase) {
  const items = document.querySelector('.items');
  const paragraph = document.createElement('p');
  paragraph.classList.add('loading');
  paragraph.innerText = phrase;
  items.appendChild(paragraph);

  return fetch('https://api.mercadolibre.com/sites/MLB/search?q=$computador')
      .then((response) => response.json())
      .then((object) => {
        paragraph.remove();
        return object.results;
      })
      .catch((error) => alert(error));
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function removeLocalStorage(id) {
  const idList = localStorage.getItem('computers').split(',');
  const newIdList = [];
  let count = 0;
  idList.forEach((computerId) => {
    if (computerId !== id) newIdList.push(computerId);
    else {
      count += 1;
      if (count > 1) newIdList.push(computerId);
    }
  });
  localStorage.computers = newIdList;
}

async function removePrice(id) {
  const priceElement = document.querySelector('.total-price');
  const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const computer = await response.json();
  priceElement.innerText = parseFloat(Number(priceElement.innerText) - computer.price);
  if (!id) priceElement.innerText = 0;
}

function cartItemClickListener(event) {
  const { target } = event;
  const id = target.classList[1];
  target.remove();
  removePrice(id);
  removeLocalStorage(id);
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.classList.add(sku);
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function saveLocalStorage(id) {
  if (!localStorage.computers) localStorage.computers = `${id}`;
  else localStorage.computers += `,${id}`;
}

function addPrice({ price }) {
  const priceElement = document.querySelector('.total-price');
  priceElement.innerText = parseFloat(Number(priceElement.innerText) + price);
}

function itemClickListener(event) {
  const { target } = event;
  const id = getSkuFromProductItem(target.parentElement);
  const cartItems = document.querySelector(`.${cartItemsClass}`);

  fetch(`https://api.mercadolibre.com/items/${id}`)
    .then((response) => response.json())
    .then((computer) => {
      cartItems.appendChild(createCartItemElement(computer));
      addPrice(computer);
      saveLocalStorage(id);
    })
    .catch((error) => alert(error));
}

function createProductList() {
  const items = document.querySelector('.items');

  getItem('Loading').then((computerResult) => {
    computerResult.forEach((computer) => {
      const section = createProductItemElement(computer);
      section.lastChild.addEventListener('click', itemClickListener);
      items.appendChild(section);
    });
  });
}

function loadCart() {
  const idList = localStorage.getItem('computers').split(',');
  const cartItems = document.querySelector(`.${cartItemsClass}`);
  idList.forEach((computerId) => {
    fetch(`https://api.mercadolibre.com/items/${computerId}`)
      .then((response) => response.json())
      .then((computer) => {
        cartItems.appendChild(createCartItemElement(computer));
        addPrice(computer);
      });
  });
}

function init() {
  createProductList();
  if (localStorage.computers) loadCart();
  const cartItems = document.querySelector(`.${cartItemsClass}`);
  const emptyCartButton = document.querySelector('.empty-cart');
  emptyCartButton.addEventListener('click', () => {
    cartItems.innerHTML = '';
    removePrice();
  });
}

window.onload = () => {
  init();
};
