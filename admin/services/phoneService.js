const BASE_URL = 'https://664207a93d66a67b3435e34a.mockapi.io/products';

export var productService = {

    getList: function () {
        return axios.get(BASE_URL);
    },

    getDetail: function (id) {
        return axios.get(`${BASE_URL}/${id}`)
    },

    create: function (newPhone) {
        return axios.post(BASE_URL, newPhone)
    },

    update: function (id, phone) {
        return axios.put(`${BASE_URL}/${id}`, phone)
    },

    delete: function (id) {
        return axios.delete(`${BASE_URL}/${id}`)
    }

}
