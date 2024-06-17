const NameValidate = (enteredName) => {
    if (enteredName !== undefined && enteredName.length > 0 && enteredName.length <= 20) {
        return true;
    }
    return false;
}

const PriceValidate = (enteredPrice) => {
    if (enteredPrice !== undefined && enteredPrice > 0 && enteredPrice<= 999999) {
        return true;
    }
    return false;
}

const DateValidate = (enteredDate) => {
    if (enteredDate !== undefined && enteredDate.length > 0) {
        const date = new Date(enteredDate);
        if (date.getFullYear() <= 2024 && date.getFullYear() >= 2020) {
            return true;
        }
    }
    return false;
}

const FormateDate = (dateString) => {
    dateString = new Date(dateString);
    const year = dateString.getFullYear();
    const month = String(dateString.getMonth() + 1).padStart(2, '0');
    const day = String(dateString.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

//const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const EmailValidate = (enteredEmail) => {
    if (enteredEmail.length >= 2) {
        return true;
    }
    return false;
    //   if(enteredEmail && enteredEmail.match(isValidEmail)){
    //     return true;
    //   }else{
    //     return false;
    //   }
}

export { NameValidate, DateValidate, PriceValidate, FormateDate, EmailValidate };