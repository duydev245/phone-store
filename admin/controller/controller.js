
export let renderProduct = (productArr) => {
    let contentHTML = '';
    productArr.forEach(item => {
        let { id, name, price , img, desc} = item;
        
        let trString = `
        <tr>
            <td>${id}</td>
            <td>${name}</td>
            <td>${price}</td>
            <td>${img}</td>
            <td>${desc}</td>
            <td>
                <button class='btn text-danger fw-bold'>Delete</button>
                <button class='btn text-warning fw-bold'>Edit</button>
            </td>
        </tr>`

        // <img src="" alt="" class="img-thumbnail">
        contentHTML += trString;
    });

    document.getElementById('tablePhone').innerHTML = contentHTML;
}