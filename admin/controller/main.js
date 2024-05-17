import { productService } from "../services/phoneService.js"
import { getDataForm, renderProduct, resetForm, showDataForm, showMessage, turnOffLoading, turnOnLoading } from "./controller.js";
import { Validate } from "./validate.js";

const dataFail = false;
let productEditId = 0;
const validate = new Validate();

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
            renderProduct(res);
        })
        .catch((err) => {
            console.log("🚀 ~ service.getList ~ err:", err)
        });
}

fetchProduct()

document.getElementById('addPhoneForm').addEventListener('click', () => {
    // reset form into default
    resetForm();
})

window.createProduct = () => {
    productService.getList().then(phoneList => {
        // Check Validate
        if (!validate.isValid(phoneList)) {
            return;
        }

        let newProduct = getDataForm();
        turnOnLoading();
        // Turn off modal
        $('#exampleModal').modal('hide');
        productService.create(newProduct)
            .then((res) => {
                console.log("🚀 ~ .then ~ res:", res);
                // Call fetchProduct again
                fetchProduct();
                // Reset form
                resetForm();
                // Show success message
                showMessage('Success!!!');
            }).catch((err) => {
                console.log("🚀 ~ .then ~ err:", err);
                // Show failure message
                showMessage('Fail!!!', err);
            }).finally(() => {
                // Turn off loading indicator
                turnOffLoading();
            });
    }).catch(err => {
        console.log("🚀 ~ productService.getList ~ err:", err);
        // Handle the error when fetching the product list
        showMessage('Failed to fetch product list!!!', err);
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
    document.getElementById('btnUpdate').style.display = 'inline-block';
    document.getElementById('btnAddPhone').style.display = 'none';
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
    productService.getList().then(phoneList => {
        // Check Validate
        if (!validate.isValid(phoneList, true)) {
            return;
        }

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

    }).catch(err => {
        console.log("🚀 ~ productService.getList ~ err:", err);
        // Handle the error when fetching the product list
        showMessage('Failed to fetch product list!!!', err);
    });

}

let isAscending = true;

window.searchProduct = () => {
    const searchName = document.getElementById('searchName').value.trim().toLowerCase();

    productService
        .getList()
        .then(products => {
            const filteredProducts = products.filter(product =>
                product.name.toLowerCase().includes(searchName)
            );

            // Sort a filteredProducts (Sort first then search)
            filteredProducts.sort((a, b) => isAscending ? a.price - b.price : b.price - a.price);

            // Render the filtered products
            renderProduct(filteredProducts);
        })
        .catch(error => {
            console.error('Error fetching profduct list:', error);
        });
}

// Sort products by price and change sort order
window.sortProduct = () => {
    productService
        .getList()
        .then(products => {
            products.sort((a, b) => isAscending ? a.price - b.price : b.price - a.price);

            renderProduct(products);

            // Change ascending -> descending
            isAscending = !isAscending;

            // Change the button's inner HTML
            document.getElementById('sortButton').innerHTML = isAscending
                ? '<i class="fa fa-arrow-circle-down"></i> Sort Phone'
                : '<i class="fa fa-arrow-circle-up"></i> Sort Phone';
        })
        .catch(error => {
            console.error('Error fetching product list:', error);
        });
};

