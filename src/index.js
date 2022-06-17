let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");

let mode = "create";
let temp;

function getTotal() {
  if (price.value) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#FF06B7";
  }
}
let products;
if (localStorage.products) {
  products = JSON.parse(localStorage.products);
} else {
  products = [];
}

create.onclick = () => {
  let newProduct = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  if (mode === "create") {
    if (newProduct.count > 1) {
      let x = 0;
      while (x < newProduct.count) {
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        x++;
      }
    } else {
      products.push(newProduct);
    }
  } else {
    products[temp] = newProduct;
    mood = "create";
    create.innerHTML = "Create";
    count.style.display = "block";
  }

  showOutput();
  clearInput();
};

function clearInput() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showOutput() {
  getTotal();
  let table = "";
  for (let i = 0; i < products.length; i++) {
    table += `
            <tr>
                  <td>${i+1}</td>
                  <td>${products[i].title}</td>
                  <td>${products[i].price}</td>
                  <td>${products[i].taxes}</td>
                  <td>${products[i].ads}</td>
                  <td>${products[i].discount}</td>
                  <td>${products[i].total}</td>
                  <td>${products[i].category}</td>
                  <td><button onclick="updateItem(${i})" id='update'>Update</button></td>
                  <td><button onclick="deleteItem(${i})" id='delete'>Delete</button></td>
            </tr>
            `;
  }
  document.getElementById("tbody").innerHTML = table;

  let deleteBTN = document.getElementById("deleteAll");
  if (products.length) {
    deleteBTN.innerHTML = `<button onclick="deleteAll()">Delete All</button>`;
  } else {
    deleteBTN.innerHTML = "";
  }
}

function deleteItem(index) {
  products.splice(index, 1);
  localStorage.products = JSON.stringify(products);
  showOutput();
}

function deleteAll() {
  products = [];
  localStorage.products = JSON.stringify(products);
  showOutput();
}
function updateItem(index) {
  title.value = products[index].title;
  price.value = products[index].price;
  taxes.value = products[index].taxes;
  ads.value = products[index].ads;
  discount.value = products[index].discount;
  getTotal();
  count.style.display = "none";
  category.value = products[index].category;
  create.innerHTML = "Update";
  mode = "update";
  temp = index;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  // total = document.getElementById("total");
  // count = document.getElementById("count");
  // create = document.getElementById("create");
}

//Search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");

  if (id === "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }

  search.focus();
  search.value = ''
  showOutput()
}

function searchData(value) {
  let table = "";
  if (searchMood === "title") {
    for (let i = 0; i < products.length; i++) {
      if (products[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
              <td>${i+1}</td>
              <td>${products[i].title}</td>
              <td>${products[i].price}</td>
              <td>${products[i].taxes}</td>
              <td>${products[i].ads}</td>
              <td>${products[i].discount}</td>
              <td>${products[i].total}</td>
              <td>${products[i].category}</td>
              <td><button onclick="updateItem(${i})" id='update'>Update</button></td>
              <td><button onclick="deleteItem(${i})" id='delete'>Delete</button></td>
        </tr>
        `;
      }
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      if (products[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
              <td>${i}</td>
              <td>${products[i].title}</td>
              <td>${products[i].price}</td>
              <td>${products[i].taxes}</td>
              <td>${products[i].ads}</td>
              <td>${products[i].discount}</td>
              <td>${products[i].total}</td>
              <td>${products[i].category}</td>
              <td><button onclick="updateItem(${i})" id='update'>Update</button></td>
              <td><button onclick="deleteItem(${i})" id='delete'>Delete</button></td>
        </tr>
        `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
showOutput();
