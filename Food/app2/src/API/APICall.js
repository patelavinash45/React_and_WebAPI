import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    CreateUser
};