
export const validateName = (name) => {
    
    if (!Boolean(name)) {
        return "Name is required"
    }
    else if (isNaN(name)) {
        return ""
    } else {
        return "Name must be string!!"
    }
}

export const validateEmail = (email) => {
    if (!Boolean(email)) {
        return "Email is required"
    }
    else if ((/$^|.+@.+..+/).test(email)) {
        return ""
    } else {
        return "Email is not correct!"

    }

}

export const validateAge = (age) => {
    if (!Boolean(age)) {
        return "Age is required"
    } else if (age < 18) {
        return "Age must be greater than 18!"
    } else {
        return ""
    }

}

const VALID_COUNTRIES = ['Palestine', 'Jordan', 'Lebanon'];

export const validateCountry = (country) => {
    if (!Boolean(country)) {
        return "Country is required"

    }else if (VALID_COUNTRIES.includes(country)) {
        return ""
    } else {
        return `Country must be on of the follwing countries ${VALID_COUNTRIES.join(', ')}` 
    }
}

