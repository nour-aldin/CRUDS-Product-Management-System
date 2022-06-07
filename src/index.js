let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
console.log(title, price, taxes, ads, discount, total, count, category, create);

function getTotal(){
  if(price.value){
      let result = (+price.value + +taxes.value + +ads.value) - +discount.value
      total.innerHTML = result
      total.style.backgroundColor = '#040'
  } else{
      total.innerHTML = ''
      total.style.backgroundColor = '#FF06B7'
  }
}
let products
if(localStorage.products){
      products = JSON.parse(localStorage.products)
}else{
      products = []
}


create.onclick = ()=>{
      let newProduct = {
            title: title.value,
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value
      }

      if(newProduct.count > 1){
            let x = 0 
            while(x<newProduct.count){
                  products.push(newProduct)
                  localStorage.setItem('products', JSON.stringify(products))
                  x++
            }
            
      }else{

      }
      
      showOutput()
      clearInput()
}

clearInput = ()=>{
      title.value = ''
      price.value = ''
      taxes.value = ''
      ads.value = ''
      discount.value = ''
      total.innerHTML = ''
      count.value = ''
      category.value = ''
}

showOutput = ()=>{
      let table = ''
      for (let i = 0; i < products.length; i++) {
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
                  <td><button id='update'>Update</button></td>
                  <td><button onclick="deleteItem(${i})" id='delete'>Delete</button></td>
            </tr>
            `
            
      }
      document.getElementById('tbody').innerHTML = table

      let deleteBTN = document.getElementById('deleteAll')
      if(products.length){
            deleteBTN.innerHTML = `<button onclick="deleteAll()">Delete All</button>`
      }else{
            deleteBTN.innerHTML = '' 
      }
}


deleteItem = (index)=>{
      products.splice(index, 1)
      localStorage.products = JSON.stringify(products)
      showOutput()
}

deleteAll = ()=>{
      products = []
      localStorage.products = JSON.stringify(products)
      showOutput()
}
showOutput()