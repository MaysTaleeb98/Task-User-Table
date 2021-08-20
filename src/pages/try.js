import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import DialogContentText from '@material-ui/core/DialogContentText';
import { validateName } from "./Validation"
import { validateEmail } from "./Validation"
import { validateAge } from "./Validation"
import { validateCountry } from "./Validation"

const useStyles = makeStyles((theme) => ({
    btnAdd: {
        marginLeft: -50,
        marginBottom: 30,
        color: "#730099",
        borderColor: "#f9e6ff",
        background: "#f9e6ff",
        fontSize: 18
    },

    root: {
        '& label.Mui-focused': {
            color: "#730099",
            fontSize: 23
        },
        '&  .MuiDialog-paperScrollPaper-66': {
            background: "#f9e6ff",
            with: 1000
        },
        '& div .MuiInput-underline-134:after' :{
            borderColor: "#730099" ,
            color: "#730099"
        }

    },
    titleAdd: {
        color: "#4B0082",
        fontSize: 16
    },
    errMsg: {
        color: "red",
        fontSize: 20,
        marginLeft: 80
    }

}));

export default function AddNewUser({ addUser }) {


    const [open, setOpen] = useState(false);

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [country, setCountry] = useState('')

    const [notvalidatedName, isNotvalidatedName] = useState(true)
    const [validatedEmail, isValidatedEmail] = useState(true)
    const [validatedAge, isValidatedAge] = useState(true)
    const [validatedCountry, isValidatedCountry] = useState(true);

    const [nameError, setNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [ageError, setAgeError] = useState(null);
    const [countryError, setCountryError] = useState(null);

    const [allvalidatedFields, setAllvalidatedFields] = useState(false)


    const onSubmit = () => {

        const newUser = {

            user: {
                topTextField: name,
                bottomTextField: `9777 Rue de L'Abbé-Carton Saint-Étienne , Rhône 17963`,
                thumbnail: "https://randomuser.me/api/portraits/thumb/women/23.jpg"

            },
            contactInformation: {
                topTextField: email,
                bottomTextField: "01-43-39-72-27",
            },
            registrationDate: {
                topTextField: moment("2014-03-28T05:40:08.369Z").format("MMM DD, yy"),
                bottomTextField: moment("2014-03-28T05:40:08.369Z").format("LT")
            },
            countryAndPostCode: {
                topTextField: country,
                bottomTextField: 'Saint-Étienne',
            }
        }
        addUser(newUser)

        setName('')
        setEmail('')
        setAge('')
        setCountry('')
        setOpen(false);

    }

    //alert(" Recheck Your Info ... there is Error !!!! ")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handelName = (e) => {
        console.log({ name });

        if (e.target.value === "") {
            setNameError('name is required');
            isNotvalidatedName(false)
            return;
        } else {
            setNameError(null);
            isNotvalidatedName(true)
        }

        if (!validateName(e.target.value)) {
            setNameError('Name should be a string!');
            isNotvalidatedName(false)
            return;
        } else {
            setNameError(null);
            isNotvalidatedName(true)
        }

        // validateName(name) ? isNotvalidatedName(true) : isNotvalidatedName(false)
        // console.log(notvalidatedName)
    }

    const handelEmail = (e) => {
        if (e.target.value === "") {
            setEmailError('Email is required');
            isValidatedEmail(false)
            return;
        } else {
            setEmailError(null);
            isValidatedEmail(true)
        }

        if (!validateEmail(e.target.value)) {
            setEmailError('Incorrect Email!');
            isValidatedEmail(false)
            return;
        } else {
            setEmailError(null);
            isValidatedEmail(true)
        }

        //validateEmail(email) ? isValidatedEmail(true) : isValidatedEmail(false)
        //console.log(validatedEmail)
    }

    const handelAge = (e) => {
        if (e.target.value === "") {
            setAgeError('Age is required');
            isValidatedAge(false)
            return;
        } else {
            setAgeError(null);
            isValidatedAge(true)
        }

        if (!validateAge(e.target.value)) {
            setAgeError('Age must be greater than 18!');
            isValidatedAge(false)
            return;
        } else {
            setAgeError(null);
            isValidatedAge(true)
        }
        //validateAge(e.target.value) ? isValidatedAge(true) : isValidatedAge(false)
        //console.log(validatedAge)
    }

    const handelCountry = (e) => {

        if (e.target.value === "") {
            setCountryError('Country is required');
            isValidatedCountry(false)
            return;
        } else {
            setCountryError(null);
            isValidatedCountry(true)
        }

        if (!validateCountry(e.target.value)) {
            setCountryError('Country must be Palestine or Jordan!');
            isValidatedCountry(false)
            return;
        } else {
            setCountryError(null);
            isValidatedCountry(true)
        }
        // validateCountry(e.target.value) ? isValidatedCountry(true) : isValidatedCountry(false)
        // console.log(validatedCountry)
    }

    const handelOnSubmit = () => {
        ((notvalidatedName) & (validatedEmail) & (validatedAge) & (validatedCountry)) ? onSubmit() : setAllvalidatedFields(true)
    }
    const classes = useStyles();
    return (
        <div>
            <Button className={classes.btnAdd} variant="outlined" color="primary" onClick={handleClickOpen}>
                Click To Add New User
            </Button>
            <div className={classes.boxAdd} >
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className={classes.root}>
                    <DialogTitle className={classes.titleAdd} id="form-dialog-title">Add New User</DialogTitle>
                    <DialogContent>
                        {allvalidatedFields &&
                            <DialogContentText className={classes.errMsg}>
                                Recheck Your Info ... there is Incorrect entry!
                            </DialogContentText>}
                        <TextField
                            className={classes.root}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                handelName(e)
                            }
                            }
                            error={Boolean(nameError)}
                            helperText={nameError}


                            
                        />
                        <TextField
                            className={classes.root}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                handelEmail(e)
                            }}
                            error={Boolean(emailError)}
                            helperText={emailError}

                        />
                        <TextField
                            className={classes.root}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Age"
                            type="number"
                            fullWidth
                            value={age}
                            onChange={(e) => {
                                setAge(e.target.value)
                                handelAge(e)
                            }}
                            error={Boolean(ageError)}
                            helperText={ageError}
                        />
                        <TextField
                            className={classes.root}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Country"
                            type="text"
                            fullWidth
                            value={country}
                            onChange={(e) => {
                                setCountry(e.target.value)
                                handelCountry(e)
                            }}

                            error={Boolean(countryError)}
                            helperText={countryError}

                        />
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.titleAdd} onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button className={classes.titleAdd} onClick={handelOnSubmit} color="primary">
                            Add User
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        </div>
    );
}
