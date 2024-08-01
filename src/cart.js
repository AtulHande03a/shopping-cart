let label = document.getElementById('label')
let shoppingCart = document.getElementById('shopping-cart')

let basket = JSON.parse(localStorage.getItem('data')) || []

let cartCount = () => {
  let cartCount = document.getElementById('cartCount')

  cartCount.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0)
}

cartCount()

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((cartItem) => {
        let { id, item } = cartItem

        let search = shopItemsData.find((cartItem) => cartItem.id === id) || []

        return `

      <div class="cart-item">
      <img width="100" src=${search.img} alt=${search.name} loading="lazy"/>
      <div class="details">
      <div class="title-price-x">
        <h4 class="title-price">
          <p>${search.name}</p>
          <p class="item-price">$ ${search.price}</p>
        </h4>
        <i class="bi bi-x-lg" onclick="removeCard(${id})"></i>
      </div>

      <div class="buttons">
        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
        <div id=${id} class="quantity">${item}</div>  
        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
      </div>
     
      <h3>
        $ ${item * search.price}
      </h3>

      </div>
      </div>
      `
      })
      .join(''))
  } else {
    shoppingCart.innerHTML = ``
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="index.html">
    <button class="homeBtn">Back to Home page</button>
    </a>`
  }
}

generateCartItems()

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

  generateCartItems()
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
  generateCartItems()
  localStorage.setItem('data', JSON.stringify(basket))
}

// updating card count value

let update = (id) => {
  let search = basket.find((x) => x.id === id)

  document.getElementById(id).innerHTML = search.item

  cartCount()
  totalAmount()
}

let removeCard = (id) => {
  let selectedItem = id

  basket = basket.filter((card) => card.id !== selectedItem.id)
  generateCartItems()
  totalAmount()
  cartCount()
  localStorage.setItem('data', JSON.stringify(basket))
}

let clearCart = () => {
  basket = []
  generateCartItems()
  cartCount()
  localStorage.setItem('data', JSON.stringify(basket))
}

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x
        let search = shopItemsData.find((cartItem) => cartItem.id === id) || []
        return item * search.price
      })
      .reduce((x, y) => x + y, 0)
    label.innerHTML = `
    <h2>Total Price : $ ${amount}</h2>
    <button class='checkout'>Checkout</button>
    <button class='removeAll' onclick="clearCart()">Clear Cart</button>
    
    `
  } else return
}

totalAmount()
