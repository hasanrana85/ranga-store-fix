const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then(response => response.json())
    .then(data => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML =
      `<div class="single-product">
           <div>
         <img class="product-image" src="${image}">
           </div>
           <h3>${product.title}</h3>
           <p class="fw-bold text-secondary">Category: ${product.category}</p>
           <h2>Price: $ ${product.price}</h2>
           <h5 class="fw-bold">Rating: ${product.rating.rate}
           <br>
           <i class="fas fa-star text-warning"></i>
           <i class="fas fa-star text-warning"></i>
           <i class="fas fa-star text-warning"></i>
           <i class="fas fa-star text-warning"></i>
           <i class="fas fa-star"></i>
           <br>
            Count:
            <i class="fas fa-user"></i>
            ${product.rating.count}</h5>
           <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
           <button onclick="loadSingleProduct(${product.id})" id="details-btn" class="btn btn-danger">Details</button></div>
           `;

    document.getElementById("all-products").appendChild(div);
  }
};

/* load single Product */
const loadSingleProduct = id => {
  url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displaySingle(data));
}

/* display single product */
const displaySingle = product => {
  document.getElementById('single-product').innerHTML = '';
  const div = document.createElement('div');
  div.classList.add('col', 'w-50', 'mx-auto');
  div.innerHTML = `
<div class="card h-100 single-product" style="background-color:antiquewhite">
          <img src="${product.image}" class="card-img-top w-50 mx-auto" alt="...">
          <div class="card-body">
            <h3>${product.title}</h3>
            <p class="fw-bold text-secondary">Category: ${product.category}</p>
            <h2>Price: $ ${product.price}</h2>
            <h5 class="fw-bold">Rating: ${product.rating.rate}
           <br>
           <i class="fas fa-star text-warning"></i>
           <i class="fas fa-star text-warning"></i>
           <i class="fas fa-star text-warning"></i>
           <i class="fas fa-star text-warning"></i>
           <i class="fas fa-star"></i>
           <br>
            Count:
            <i class="fas fa-user"></i>
            ${product.rating.count}</h5>
          </div>
        </div>
`;
  document.getElementById('single-product').appendChild(div);
}

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  // const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  let total = convertedOldPrice + convertPrice;
  total = total.toFixed(2);
  document.getElementById(id).innerText = parseFloat(total);
  // document.getElementById(id).innerText = Math.round(total);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  let grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  grandTotal = grandTotal.toFixed(2);
  document.getElementById("total").innerText = grandTotal;
};