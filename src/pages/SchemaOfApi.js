import moment from 'moment';

export const dataOfOneUser = (user) => {

    return {
        id: user.login.uuid,
        gender: user.gender,
        user: {
            topTextField: `${user.name.first} ${user.name.last}`,
            bottomTextField: `${user.location.street.number} ${user.location.street.name} ${user.location.city}, ${user.location.state} ${user.location.postcode}`,
            thumbnail: user.picture.thumbnail
        },
        contactInformation: {
            topTextField: user.email,
            bottomTextField: user.phone,
        },
        registrationDate: {
            topTextField: moment(user.registered.date).format("MMM DD, yy"),
            bottomTextField: moment(user.registered.date).format("LT")
        },
        countryAndPostCode: {
            topTextField: user.location.country,
            bottomTextField: user.location.city,
        }

    }
};


export const apiSchemaOfUsers = {
    fieldsOfHeader: [
        { fieldOfHeader: 'user', title: 'User' },
        { fieldOfHeader: 'contactInformation', title: 'Contact Information' },
        { fieldOfHeader: 'registrationDate', title: 'Registration Date' },
        { fieldOfHeader: 'countryAndPostCode', title: 'Country/Post Code' },
    ],
    filiteringGender: [
        { fieldName: "male", apiKey: "gender" },
        { fieldName: "female", apiKey: "gender" }
    ],
    filiteringNat: [
        { fieldName: "FR", apiKey: "nat" },
        { fieldName: "IE", apiKey: "nat" },
        { fieldName: "DE", apiKey: "nat" }
    ],
    filters: [
        { name: "Gender", apiKey: "gender" },
        { name: "Nationality", apiKey: "nat" }
    ],
    

}

export const filteringSchemaOfUsers = {
    filteringKeys: {

        filiteringNat: [
            { fieldName: "FR", apiKey: "nat" },
            { fieldName: "IE", apiKey: "nat" },
            { fieldName: "DE", apiKey: "nat" }
        ],

    }
}