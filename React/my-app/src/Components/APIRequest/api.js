import axios from 'axios';

const baseUrl = "http://localhost:5300/api/ExpenseControllers";
const baseUrl2 = "http://172.0.0.1:5300/api/Users";

async function getAllExpenses(pageNo, year, month) {
    try {
        const response = await axios.get(`${baseUrl}?pageNo=${pageNo}&year=${year}&month=${month}`);
        response.data.result.expenses.forEach(expense => {
            expense.date = new Date(expense.date);
        });
        return response.data.result;
    }
    catch (e) {
        return false;
    }
}

async function addExpenses(expense) {
    try {
        const response = await axios.post(baseUrl, expense);
        return response.data.statusCode == '201';
    }
    catch (e) {
        return false;
    }
}

async function deleteExpenses(id) {
    try {
        const response = await axios.delete(`${baseUrl}/${id}`);
        return response.data.statusCode == '200';
    }
    catch (e) {
        return false;
    }
}

async function updateExpenses(expense) {
    try {
        const response = await axios.put(`${baseUrl}/${expense.id}`, expense);
        return response.data.statusCode == '204';
    }
    catch (e) {
        return false;
    }
}

async function ValidateUser(user) {
    try {
        const response = await axios.post(baseUrl2, user);
        return response.data.isSuccess;
    }
    catch (e) {
        return false;
    }
}

export { getAllExpenses, addExpenses, deleteExpenses, updateExpenses, ValidateUser }; 