function renderProduct(arr) {
    let content = ""
    arr.forEach((value) => {
        let {id,name,price,img,desc,type} = value
        let trString= `
            <div class='col-3 mt-3'>
                <div class="card">
                    <img src="${value.img}" class="card-img-top" alt="" />
                    <div class="card-body">
                        <h5>${value.name}</h5>
                        <p>${value.price}</p>
                        <p>${value.desc}</p>
                        <button onclick="addToCart(${value.id})" class="btn btn-primary">Add to cart</button>
                    </div>
                </div>
            </div>
        `
        content += trString
    })
    document.getElementById("phoneList").innerHTML = content
}
// Cart page
function renderProductsToTable () {
    let data = ``;
    productInCart.forEach((value, index) => {
      data += `
      <tr>
        <td>${value.name}</td>
        <td>${value.price}</td>
        <td>
          <button onclick='plusQuantity(${index})' class='btn btn-secondary'>+</button>
          <span class='mx-2'>${value.quantity}</span>
          <button onclick='minusQuantity(${index}, ${value.quantity})' class='btn btn-secondary'>-</button>
        </td>
        <td>${value.quantity * value.price}</td>
        <td><button onclick='deleteProductInCart(${index})' class='btn btn-danger'>Delete</button></td>
      </tr>
      `;
    });
    document.getElementById('cartList').innerHTML = data;
  }