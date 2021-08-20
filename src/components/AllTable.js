import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import OneCellOfTable from "./OneCellOfTable";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AddUser from "../pages/AddUser";
import Adding from "../pages/Adding"
/* <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={filiteringNatKeys}
        getOptionLabel={(option) => option.fieldName}
        defaultValue={filtersNat[[1]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
      </div> */


const useStyles = makeStyles((theme) => ({
    tableHeader: {
        fontStyle: theme.table.header.fontStyle,
        fontWeight: theme.table.header.fontWeight,
        fontSize: theme.table.header.fontSize,
        color: theme.table.header.color,
        letterSpacing: 1
    },
    tableTitle: {
        float: 'left',
        marginLeft: 15,
        marginTop: 15,
        color: "#252733",
        fontWeight: 'bold',
        fontSize: 19,
    },
    tableFilters: {
        float: 'left',
        marginBottom: 30,
        paddingTop: 0,
        paddingLeft: 30,
        marginLeft: 10

    },
    filterField: {
        marginRight: 25,
        marginTop: 20

    },
    progress: {
        position: 'absolute',
        left: '50%',
        top: '50%',
    },

    alltable: {
        marginLeft: -50,
        marginTop: 1
    },
    users: {
        fontFamily: 'Mulish',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        letterSpacing: 0.3,
        color: '#252733',
        marginLeft: -35
    },
    btn: {
        marginLeft: -35,
        marginTop: 6,
        marginBottom: 14
    },
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));

function AllTable({ title, apiSchema, gettingAllData, gettingOneData, onClickRow }) {

    const classes = useStyles();
    const [nextPage, setNextPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    const [apiData, setApiData] = useState([]);
    const [filters, setFilters] = useState(apiSchema.filters);

    const [filtersKey, setFiltersKey] = useState(apiSchema.filiteringGender);
    const [filtersNat, setFiltersNat] = useState(apiSchema.filiteringNat);
    //onChange={(event) => filteredTableByFilterKeys(table.apiKey, event.target.value)}
    const [gender, setGender] = React.useState('');
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        gettingAllData(nextPage, rowsPerPage, filtersKey).then(response => {
            setApiData(response.data.results.map(gettingOneData));
        });
    }, [nextPage, rowsPerPage, filtersKey]);

    const handleChange = (event) => {
        console.log(event)
        setGender(event.target.value);
        filteredTableByFilterKeys(filtersKey.apiKey, gender)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const filiteringNatKeys = [
        { fieldName: "FR", apiKey: "nat" },
        { fieldName: "IE", apiKey: "nat" },
        { fieldName: "DE", apiKey: "nat" }
    ]



    const handleChangePage = (newPage) => {
        setNextPage(newPage);
    };

    const handleChangeRowsPerPage = (event, rowsPerPage) => {

        setRowsPerPage(rowsPerPage.props.value)
    };

    const filteredTableByFilterKeys = (apiKey, targetSearch) => {
        filtersKey.map(table => table.apiKey === apiKey
            ? (table.targetSearch = targetSearch)
            : {}
        );

        let filterTimer = setTimeout(() => setFiltersKey([...filtersKey]), 1000);
    };

    const [showAddUser, setShowAddUser] = useState(false)


    const addUser = (newUser) => {
        setApiData([...apiData, newUser])

    }

    return (
        <div>
            <div>
                <p className={classes.users}>Users</p>

                <Adding addUser={addUser} />
            </div>

            <TableContainer component={Paper} className={classes.alltable}>
                <div className={classes.tableTitle}>
                    {title}
                </div>
                <div className={classes.tableFilters}>
                    {filters.map(t => <TextField
                        className={classes.filterField}
                        label={t.name}
                        variant="outlined"
                        onChange={(e) => filteredTableByFilterKeys(t.apiKey, e.target.value)} />)}
                </div>
                <div className={classes.tableFilters}>
                    <div >
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-controlled-open-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={gender}
                                onChange={e => handleChange(e)}
                            >

                                <MenuItem value={'male'} >male</MenuItem>
                                <MenuItem value={'female'} >female</MenuItem>)

                            </Select>
                        </FormControl>
                    </div>

                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={filiteringNatKeys}
                        getOptionLabel={(option) => option.fieldName}
                        //defaultValue={[filiteringNatKeys[1]]}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="filterNat"
                                placeholder="select nat"
                                onChange={(event) => filteredTableByFilterKeys('nat', event.target.value)}
                            />
                        )}
                    />



                </div>


                <Table>
                    <TableHead>
                        <TableRow>
                            {apiSchema.fieldsOfHeader.map(table => <TableCell>
                                <div className={classes.tableHeader}>{table.title}</div>
                            </TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apiData.map((row) => (
                            <TableRow
                                hover={true}
                                onClick={() => onClickRow(row.id)}
                            >
                                {apiSchema.fieldsOfHeader.map(oneField => <TableCell>
                                    <OneCellOfTable
                                        thumbnail={row[oneField.fieldOfHeader].thumbnail}
                                        topTextField={row[oneField.fieldOfHeader].topTextField}
                                        bottomTextField={row[oneField.fieldOfHeader].bottomTextField}
                                    />
                                </TableCell>)}
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={100}
                                rowsPerPage={rowsPerPage}
                                page={nextPage}
                                rowsPerPageOptions={[8, 10, 15, 20]}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                onChangePage={(event, newVal) => handleChangePage(newVal)}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AllTable;