import axios from 'axios';

const setHeader = (jwtToken) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
}

const handleResponse = response => {
    return response.data.isSusses
        ? {
            IsSusses: true,
            Data: response.data.result,
        }
        : {
            IsSusses: false,
            ErrorMessage: response.data.errorMessage,
        }
}


let api = axios.create({
    baseURL: 'http://localhost:5074',
});

const apiCall = async (request) => {
    try {
        return handleResponse(await request());
    }
    catch (e) {
        return handleResponse(e.response);
    }
}

const GetFoodList = async () => {
    console.log(api);
    return await apiCall(() => api.get(`/Food/GetFoodList`));
};

const GetCartList = async (id) => {
    return await apiCall(() => api.get(`/Food/GetCartList/${id}`));
};

const GetCartCount = async (id) => {
    return await apiCall(() => api.get(`/Food/GetCartCount/${id}`));
};

const AddProductToCart = async (cart, id) => {
    return await apiCall(() => api.post(`/Food/AddProductToCart/${id}`, cart));
}

const ChangeProductCount = async (cartId, newCount, id) => {
    return await apiCall(() => api.post(`/Food/ChangeCart/${id}?cartId=${cartId}&newCount=${newCount}`));
}

const PlaceOrder = async (orderDto, id) => {
    return await apiCall(() => api.post(`/Food/PlaceOrder/${id}`, orderDto));
}

const ValidateUser = async (userDto) => {
    return await apiCall(() => api.patch(`/User/ValidateUser`, userDto));
}

const CreateUser = async (createUserDto) => {
    return await apiCall(() => api.post(`/User/CreateUser`, createUserDto));
}

export {
    GetFoodList,
    GetCartList,
    GetCartCount,
    AddProductToCart,
    ChangeProductCount,
    PlaceOrder,
    ValidateUser,
    CreateUser,
    setHeader
};