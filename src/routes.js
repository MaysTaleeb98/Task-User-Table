import React from "react";
import '@fontsource/roboto';
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import { Route, Switch } from 'react-router';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import UsersTable from "./pages/UsersTableRouter";
import { MainTheme } from "./Theme";
import Drawer from './pages/DrawerTable'
import Ideas from "./pages/Ideas"
import Box from '@material-ui/core/Box';
import Overview from "./pages/overview";
import Tickets from "./pages/Tickets"
import Page2UserDetails from "./pages/Page2UserDetails";

export default function RouterDrawer() {


    const useStyles = makeStyles((theme) => ({
        root: {
            width: "95%",
            margin: "0 auto",
            marginTop: 10,
        }
    }));

    const classes = useStyles();

    return (
        <ThemeProvider theme={MainTheme}>
            <Router>
                <Box display="flex" flexDirection="row">
                    <Box winWidth={300}>
                        <Drawer
                        />
                    </Box>
                    <Box>
                        <Switch>

                            <Route path="/overview" render={() => <Overview />}>
                            </Route>
                            <Route path="/tickets" render={() => <Tickets />}>
                            </Route>
                            <Route path="/ideas" render={() => <Ideas />}>
                            </Route>
                            <Route path="/users" render={() => <UsersTable />} >
                            </Route>

                            <Route path="/">
                                <Redirect to="/users" />
                            </Route>

                        </Switch>
                    </Box>

                </Box>
            </Router>


        </ThemeProvider>
    );
}

