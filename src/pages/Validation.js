

export const validateName = (name) => {
    if (isNaN(name)) {
        return true
    } else
        return false
}

export const validateEmail = (email) => {
    if ((/$^|.+@.+..+/).test(email)) {
        return true
    } else
        return false
}

export const validateDate = (date) => {
    const regex=new RegExp("([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})");
    let dateOk=regex.test(date);

    if (dateOk) {
        return true
    } else
        return false
}


export const validateAge = (age) => {
    if (age >= 18 ) {
        return true
    } else {
        return false
    }
       
}

export const validateCountry = (country) => {
    if (country == "Palestine" || country == "Jordan") {
        return true
    } else
        return false
}