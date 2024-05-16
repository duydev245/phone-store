const BASE_URL = "https://664207a93d66a67b3435e34a.mockapi.io/products"

function fetchProduct(){
    axios
    .get(BASE_URL)
    .then((res) => {
        renderProduct(res.data)
    })
    .catch((err) => {
        console.log(err);
    })
}
fetchProduct()

let products = [];

function getDataToCart() {
    axios
    .get(BASE_URL)
    .then((res) => {
        products = res.data;
        console.log('products: ', products);
    })
    .catch((err) => {
        console.log(err);
    });
}
getDataToCart()

let productInCart = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];

function saveToLocalStorage () {
  localStorage.setItem('products', JSON.stringify(productInCart));
}
function addToCart (id) {
    let checkProduct = productInCart.some((value) => {
        return value.id == id;
    });
    if(!checkProduct){
        let product = products.find((value) => {
            return value.id == id;
        });
        productInCart.unshift({
            ...product,
            quantity: 1
        })
        saveToLocalStorage()
        calculatorTotal()
        renderProductsToTable()
        totalMoney()
    } else {
        let getIndex = productInCart.findIndex((value) => {
            return value.id == id
        })
        let product = productInCart.find((value) => {
            return value.id == id
        })
        productInCart[getIndex] = {
            ...product,
            quantity: ++product.quantity
        }
        saveToLocalStorage()
        renderProductsToTable()
    }
}

function calculatorTotal () {
    document.getElementById('cartCount').innerHTML = productInCart.length;
}

function plusQuantity(index){
    productInCart[index] = {
        ...productInCart[index],
        quantity: ++productInCart[index].quantity
    }
    saveToLocalStorage()
    renderProductsToTable()
    totalMoney()
}

function minusQuantity(index,quantity){
    if(quantity>1){
        productInCart[index] = {
            ...productInCart[index],
            quantity: --productInCart[index].quantity
        }
        saveToLocalStorage()
        renderProductsToTable()
        totalMoney()
    } else{
        alert("Quantity min is 1")
    }
}

function deleteProductInCart(index){
    productInCart.splice(index,1)
    saveToLocalStorage()
    renderProductsToTable()
    totalMoney()
    calculatorTotal()
}

function totalMoney(){
    if(productInCart != []){
        let total = 0
        for(let i=0; i<productInCart.length; i++){
            total += productInCart[i].quantity * productInCart[i].price
        }
        document.getElementById("priceTotal").innerHTML = total
    }
}

function emptyCart(){
    productInCart.length = 0
    saveToLocalStorage()
    renderProductsToTable()
    totalMoney()
    calculatorTotal()
}

function payNow(){
    productInCart.length = 0
    alert("Successfully paid")
    saveToLocalStorage()
    renderProductsToTable()
    totalMoney()
    calculatorTotal()
}

function renderSamsungProducts() {
    let samsungProducts = products.filter(product => product.type == "Samsung");
    renderProduct(samsungProducts);
}
function renderIPProducts() {
    let iphoneProducts = products.filter(product => product.type == "Iphone");
    renderProduct(iphoneProducts);
}
function handleSelection() {
    let selectedValue = document.getElementById("selectList").value;
    if (selectedValue == "Samsung") {
        renderSamsungProducts();
    } else if (selectedValue == "Iphone") {
        renderIPProducts()
    } else if (selectedValue == "all"){
        fetchProduct()
    }
}


