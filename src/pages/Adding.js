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
import { getFieldFromHeaderElem } from '@material-ui/data-grid';

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
        fontSize: 17,
        marginLeft: 42
    }

}));

export default function AddNewUser({ addUser }) {


    const [open, setOpen] = useState(false);

    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});

    const [allvalidatedFields, setAllvalidatedFields] = useState(false)


    const onSubmit = () => {

        console.log('@on Submit');

        const newUser = {

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
    
        submitValidations();


        if (Object.values(formValues).length >= 4 && !Object.values(errors).filter((value) => !value === "").length ) {
            addUser(newUser)
            setFormValues({});
            setOpen(false);
        } else {
            setAllvalidatedFields(true)
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  
    const submitValidations = () => {

        console.log(formValues);

        Object.entries(validationRules).map(([name, validationCallback]) =>  {
            const value = formValues[name];

            setErrors((state) => ({
                ...state,
                [`${name}`]: validationCallback(value)
            }))
        
        });

    }


    const validationRules = React.useMemo(() => ({
        name: (value) => validateName(value),
        age: (value) => validateAge(value),
        email: (value) => validateEmail(value),
        country: (value) => validateCountry(value),
    }), []);


    const validateInput = (name, value) => {
        return validationRules[name](value);
    };

    const handleChange = (e) => {
        if (!validateInput(e.target.name, e.target.value)) {
            setFormValues((state) => ({
                ...state,
                [e.target.name]: e.target.value
            }));
            setErrors((state) => ({
                ...state,
                [e.target.name]: "",
                

            }))
        } else {
            setErrors((state) => ({
                ...state,
                [e.target.name]: validateInput(e.target.name, e.target.value),
                
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
                                Recheck Your Info ... There is Empty or Incorrect entry!
                            </DialogContentText>}
                        <TextField
                            className={classes.root}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            error={errors.name ? true : false}
                            helperText={ errors.name}
                        />
                        <TextField
                            className={classes.root}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            error={errors.email ? true : false}
                            helperText={errors.email}
                        />

                        <TextField
                            className={classes.root}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Age"
                            type="number"
                            fullWidth
                            name="age"
                            value={formValues.age}
                            onChange={handleChange}
                            error={ errors.age ? true : false}
                            helperText={errors.age}
                        />
                        <TextField
                            className={classes.root}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Country"
                            type="text"
                            fullWidth
                            name="country"
                            value={formValues.country}
                            onChange={handleChange}
                            error={ errors.country ? true : false}
                            helperText={ errors.country}

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
