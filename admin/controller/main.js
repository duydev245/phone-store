import { productService } from "../services/phoneService.js"
import { renderProduct } from "./controller.js";


let fetchProduct = () => {
    productService
        .getList()
        .then((res) => {
            console.log("🚀 ~ service.getList ~ res:", res)
            renderProduct(res.data);
        })
        .catch((err) => {
            console.log("🚀 ~ service.getList ~ err:", err)

        });
}

fetchProduct()

