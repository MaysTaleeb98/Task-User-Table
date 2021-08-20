import React from "react";
import '@fontsource/roboto';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import UsersTable from "./UsersTable";

function App() {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: "95%",
            margin: "0 auto",
            marginTop: 10,
        }
    }));

    const classes = useStyles();

    return (
        <ThemeProvider >
            <div className={classes.root}>
                <Router>
                    <React.Suspense fallback="Loading...">
                        <Switch>

                            <Route path="/users">
                                <UsersTable />
                            </Route>

                        </Switch>
                    </React.Suspense>
                </Router>
            </div>
        </ThemeProvider>
    );
}

export default App;