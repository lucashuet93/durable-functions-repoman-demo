export const isValidNumber = (value: string): boolean => {
    return !isNaN(Number(value));
}

export const isValidPhoneNumber = (phoneNumber: string): boolean => {
    const phoneNumberRegex: RegExp = /^\d{10}$/;
    if (phoneNumber.match(phoneNumberRegex)) {
        return true;
    } else {
        return false;
    }
}

export const isValidEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(emailRegex)) {
        return true;
    } else {
        return false;
    }
}