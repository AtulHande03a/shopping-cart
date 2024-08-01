let shop = document.getElementById('shop')
let shopItemsData = [
  {
    id: 'jfhgbvnscs',
    name: 'Casual Shirt',
    price: 45,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    img: 'images/img-1.jpg',
  },
  {
    id: 'ioytrhndcv',
    name: 'Office Shirt',
    price: 100,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    img: 'images/img-2.jpg',
  },
  {
    id: 'wuefbncxbsn',
    name: 'T Shirt',
    price: 25,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    img: 'images/img-3.jpg',
  },
  {
    id: 'thyfhcbcv',
    name: 'Mens Suit',
    price: 300,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    img: 'images/img-4.jpg',
  },
  {
    id: 'thiecbawdjksadjk',
    name: 'Mens Tie',
    price: 25,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    img: 'images/img-5.png',
  },
  {
    id: 'iuertrywebncdjksadjk',
    name: 'Casual shoes',
    price: 200,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    img: 'images/img-6.png',
  },
  {
    id: 'thierytbvcbvzdhadjk',
    name: 'black suit',
    price: 450,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    img: 'images/img-7.png',
  },
  {
    id: 'trfoiwfcnbcawdjksadjk',
    name: 'polo shirt',
    price: 45,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    img: 'images/img-8.png',
  },
  {
    id: 'cbvxbcvsceldk',
    name: 'denim shirt',
    price: 85,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    img: 'images/img-9.png',
  },
  {
    id: 'oiopijmjkhuihb',
    name: 'denim pants',
    price: 120,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    img: 'images/img-10.png',
  },
  {
    id: 'oiopijewyiohbjhib',
    name: 'basic cap',
    price: 35,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    img: 'images/img-11.png',
  },
  {
    id: 'rtytytuyuytyytbvncv',
    name: 'leather boots',
    price: 350,
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
    img: 'images/img-12.png',
  },
]

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
