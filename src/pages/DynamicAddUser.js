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
import { validateName } from "./DynamicValidation"
import { validateEmail } from "./DynamicValidation"
import { validateAge } from "./DynamicValidation"
import { validateCountry } from "./DynamicValidation"
import { isrequired } from "./DynamicValidation"


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
        '& div .MuiInput-underline-134:after': {
            borderColor: "#730099",
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
        marginLeft: 20
    }

}));

export default function AddNewUser({ addUser }) {


    const [open, setOpen] = useState(false);


    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});

    const [allvalidatedFields, setAllvalidatedFields] = useState(false)


    const onSubmit = () => {
        const user = {
            user: {
                topTextField: formValues.name,
                bottomTextField: `9777 Rue de L'Abbé-Carton Saint-Étienne , Rhône 17963`,
                thumbnail: "https://randomuser.me/api/portraits/thumb/women/23.jpg"

            },
            contactInformation: {
                topTextField: formValues.email,
                bottomTextField: "01-43-39-72-27",
            },
            registrationDate: {
                topTextField: moment("2014-03-28T05:40:08.369Z").format("MMM DD, yy"),
                bottomTextField: moment("2014-03-28T05:40:08.369Z").format("LT")
            },
            countryAndPostCode: {
                topTextField: formValues.country,
                bottomTextField: 'Saint-Étienne',
            }
        }
        submitValidations(formValues.name, formValues.age, formValues.email, formValues.country);

        if(!Object.values(errors).filter((item) => !item === "").length && Object.values(formValues).length >= 4){
           // setAllvalidatedFields(true)
           addUser(user)
           setFormValues({});
           setOpen(false);
        }else{
            setAllvalidatedFields(true)
        }
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const submitValidations = (name, age, email, country) => {
        if (!name) {
            setErrors((state) => ({
                ...state,
                nameRequired: validateInput("required", name)
            }))
        }

        if (!age) {
            setErrors((state) => ({
                ...state,
                ageRequired: validateInput("required", age)
            }))
        }
        if (!email) {
            setErrors((state) => ({
                ...state,
                emailRequired: validateInput("required", email)
            }))
        }
        if (!country) {
            setErrors((state) => ({
                ...state,
                countryRequired: validateInput("required", country)
            }))
        }
    }

    const validateInput = (name, value) => {
        return validationRules[name](value);
    };


    const validationRules = React.useMemo(() => ({
        name: (value) => validateName(value),
        age: (value) => validateAge(value),
        email: (value) => validateEmail(value),
        country: (value) => validateCountry(value),
        required: (value) => isrequired(value)
    }), []);

    const handleChange = (e) => {
        if (!validateInput(e.target.name, e.target.value)) {
            setFormValues((state) => ({
                ...state,
                [e.target.name]: e.target.value
            }));
            setErrors((state) => ({
                ...state,
                [e.target.name]: "",
                //[`${e.target.name}Required`]: "",

            }))
        } else {
            setErrors((state) => ({
                ...state,
                [e.target.name]: validateInput(e.target.name, e.target.value),
               // [`${e.target.name}Required`]: ""
            }))
        }
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
                                Recheck Your Info ... there is Empty or Incorrect entry!
                            </DialogContentText>}
                        <TextField
                            className={classes.root}
                            autoFocus
                            margin="dense"
                            id="name"
                            error={errors.nameRequired || errors.name ? true : false}
                            helperText={errors.nameRequired ? errors.nameRequired : errors.name}
                            //className={classes.formInputs}
                            label="Name"
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}



                        />
                        <TextField
                            className={classes.root}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            error={errors.emailRequired || errors.email ? true : false}
                            helperText={errors.emailRequired ? errors.emailRequired : errors.email}
                            type="text"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}

                        />
                        <TextField
                            className={classes.root}
                            autoFocus
                            margin="dense"
                            id="name"
                            error={errors.ageRequired || errors.age ? true : false}
                            helperText={errors.ageRequired ? errors.ageRequired : errors.age}
                            label="Age"
                            type="number"
                            name="age"
                            value={formValues.age}
                            onChange={handleChange}
                        />
                        <TextField
                            className={classes.root}
                            autoFocus
                            margin="dense"
                            id="name"
                            error={errors.countryRequired || errors.country ? true : false}
                            helperText={errors.countryRequired ? errors.countryRequired : errors.country}
                            label="Country"
                            type="text"
                            name="country"
                            value={formValues.country}
                            onChange={handleChange}


                        />
                    </DialogContent>
                    <DialogActions>
                        <Button className={classes.titleAdd} onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button className={classes.titleAdd} onClick={onSubmit} color="primary">
                            Add User
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        </div>
    );
}
