import axios from 'axios';

const handleResponse = response => {
    return {
        IsSusses: true,
        Data: response.data.result,
    }
}

const handleErrorResponse = response => {
    console.log(response);
    return {
        IsSusses: false,
        Data: 'LogIn Again !!',
        Navigate: '/Auth/Login'
    }
}

const GetUserId = () => {
    return localStorage.getItem('userId');
}

let api = axios.create({
    baseURL: 'http://localhost:5074',
});

const apiCall = async (request) => {
    try {
        api.defaults.headers.common['Authorization'] = `${localStorage.getItem('jwtToken')}`;
        return handleResponse(await request());
    }
    catch (e) {
        return handleErrorResponse(e.response.data);
    }
}

const GetFoodList = async () => {
    return await apiCall(() => api.get(`/Food/GetFoodList/${GetUserId()}`));
};

const GetCartList = async () => {
    return await apiCall(() => api.get(`/Food/GetCartList/${GetUserId()}`));
};

const GetCartCount = async () => {
    return await apiCall(() => api.get(`/Food/GetCartCount/${GetUserId()}`));
};

const AddProductToCart = async (cart) => {
    return await apiCall(() => api.post(`/Food/AddProductToCart/${GetUserId()}`, cart));
}

const ChangeProductCount = async (cartId, newCount) => {
    return await apiCall(() => api.post(`/Food/ChangeCart/${GetUserId()}?cartId=${cartId}&newCount=${newCount}`));
}

const PlaceOrder = async (orderDto) => {
    return await apiCall(() => api.post(`/Food/PlaceOrder/${GetUserId()}`, orderDto));
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
    CreateUser
};