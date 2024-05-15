import { productService } from "../services/phoneService.js"
import { getDataForm, renderProduct, resetForm, showDataForm, showMessage, turnOffLoading, turnOnLoading } from "./controller.js";

const dataFail = false;
let productEditId = 0;

let fetchProduct = () => {
    // on loading
    turnOnLoading();
    productService
        .getList()
        .then((res) => {
            // off loading
            turnOffLoading();
            console.log("🚀 ~ service.getList ~ res:", res)
            // renderProduct
            renderProduct(res.data);
        })
        .catch((err) => {
            console.log("🚀 ~ service.getList ~ err:", err)
        });
}

fetchProduct()

window.createProduct = () => {
    let newProduct = getDataForm();
    turnOnLoading();
    // Turn off modal
    $('#exampleModal').modal('hide');
    productService
        .create(newProduct)
        .then((res) => {
            console.log("🚀 ~ .then ~ res:", res);
            // call fetchProduct again
            fetchProduct();
            // reset form
            resetForm();
            // Show message
            showMessage('Succes!!!');
        }).catch((err) => {
            turnOffLoading();
            console.log("🚀 ~ .then ~ err:", err);
            // Show message
            showMessage('Fail!!!', dataFail);
        });
}

window.removeProduct = (id) => {
    turnOnLoading();
    productService
        .delete(id)
        .then((res) => {
            console.log("🚀 ~ .then ~ res:", res)
            // showMessage
            showMessage('Succes!!!');
            // fetchProduct
            fetchProduct();
        }).catch((err) => {
            turnOffLoading();
            console.log("🚀 ~ .then ~ err:", err)
            showMessage('Fail!!!', dataFail);
        });
}

window.editProduct = (id) => {
    productEditId = id;
    // Turn on modal
    $('#exampleModal').modal('show');
    // disable btnAddPhone
    document.getElementById('btnAddPhone').disabled = true;
    productService
        .getDetail(id)
        .then((res) => {
            console.log("🚀 ~ .then ~ res:", res);
            // showDataForm
            showDataForm(res.data);
            // Show message
            showMessage('Succes!!!');
        }).catch((err) => {
            turnOffLoading();
            console.log("🚀 ~ .then ~ err:", err);
            // Show message
            showMessage('Fail!!!', dataFail);
        });
}

window.updateProduct = () => {
    let newPhone = getDataForm();
    // On Loading
    turnOnLoading();
    // Turn off modal
    $('#exampleModal').modal('hide');
    productService
        .update(productEditId, newPhone)
        .then((res) => {
            console.log("🚀 ~ .then ~ res:", res);
            // fetchProduct
            fetchProduct();
            // reset form
            resetForm();
            // Show message
            showMessage('Succes!!!');
        }).catch((err) => {
            turnOffLoading();
            console.log("🚀 ~ .then ~ err:", err);
            // Show message
            showMessage('Fail!!!', dataFail);
        });
}