import { Phone } from "../model/phone.js";

export let resetForm = () => {
    document.getElementById('formPhone').reset();
    // reset btn
    document.getElementById('btnUpdate').style.display = 'none';
    document.getElementById('btnAddPhone').style.display = 'inline-block';
}

export let turnOnLoading = () => {
    document.getElementById("loading").style.display = "block";
}

export let turnOffLoading = () => {
    document.getElementById("loading").style.display = "none";
}

export let renderProduct = (productArr) => {
    let contentHTML = '';
    productArr.reverse().forEach(item => {
        let { id, name, price, img, desc } = item;

        let trString = `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${img}</td>
            <td>${desc}</td>
            <td>
                <button onclick='removeProduct(${id})' class='btn text-danger fw-bold'>Delete</button>
                <button onclick='editProduct(${id})' class='btn text-warning fw-bold'>Edit</button>
            </td>
        </tr>`

        // <img src="" alt="" class="img-thumbnail">
        contentHTML += trString;
    });

    document.getElementById('tablePhone').innerHTML = contentHTML;
}

export let showMessage = (message, isSuccess = true) => {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: isSuccess ? "green" : "red",
        },
        onClick: function () { } // Callback after click
    }).showToast();
}

export let getDataForm = () => {
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value * 1;
    let screen = document.getElementById('screen').value;
    let backCam = document.getElementById('backCam').value;
    let frontCam = document.getElementById('frontCam').value;
    let img = document.getElementById('img').value;
    let desc = document.getElementById('desc').value;
    let type = document.getElementById('type').value;

    let phone = new Phone('', name, price, screen, backCam, frontCam, img, desc, type);

    return phone;
}

export let showDataForm = (product) => {
    let { name, price, screen, backCamera, frontCamera, img, desc, type } = product;

    document.getElementById('name').value = name;
    document.getElementById('price').value = price;
    document.getElementById('screen').value = screen;
    document.getElementById('backCam').value = backCamera;
    document.getElementById('frontCam').value = frontCamera;
    document.getElementById('img').value = img;
    document.getElementById('desc').value = desc;
    document.getElementById('type').value = type;
}
