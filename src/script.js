let shop = document.getElementById('shop')

let basket = JSON.parse(localStorage.getItem('data')) || []

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      let { id, name, desc, price, img } = item
      let search = basket.find((item) => item.id === id) || []
      return `
   <div id="procduct-id-${id}" class="item">
        <img width="220" src="${img}" alt="shirt" loading="lazy" />
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>${price}</h2>
            <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">
             ${search.item === undefined ? 0 : search.item}  
              </div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
          </div>
        </div>
      </div>
  `
    })
    .join(''))
}

generateShop()

//increment item count

let increment = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  if (!search) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    })
  } else {
    search.item += 1
  }

  update(selectedItem.id)

  localStorage.setItem('data', JSON.stringify(basket))
}

//decrement  item count

let decrement = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) return
  else if (search.item === 0) return
  else {
    search.item -= 1
  }

  update(selectedItem.id)

  basket = basket.filter((cartItem) => cartItem.item !== 0)

  localStorage.setItem('data', JSON.stringify(basket))
}

// updating card count value

let update = (id) => {
  let search = basket.find((x) => x.id === id)

  document.getElementById(id).innerHTML = search.item

  cartCount()
}

let cartCount = () => {
  let cartCount = document.getElementById('cartCount')

  cartCount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

cartCount()
