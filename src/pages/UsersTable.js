import AllTable from "../components/AllTable";
import { dataOfOneUser, apiSchemaOfUsers } from "./SchemaOfApi";
import React, { Suspense } from "react";
import { useHistory, Route, Switch } from "react-router-dom";
import axios from "axios";

const Page2UserDetails = React.lazy(() => import('./Page2UserDetails'));


//const AllTableComponent = React.lazy(() => import('../components/AllTable'));

//const renderLoader = () => <p>Loading</p>;
//   <Suspense fallback={<div>Loading...</div>}></Suspense>



function UsersTable() {
    const history = useHistory();
    const getAllUsersData = (page, rowsPerPage, filters) => {
        let filterKeys = "";
        filters.map(table =>
            table.targetSearch ?
                (filterKeys = filterKeys + `&${table.apiKey}=${table.targetSearch}`) //& ampersand  character to send a value of a property with it
                : {}
        );

        return axios.get(`https://randomuser.me/api?results=${rowsPerPage}${filterKeys}&nextPage=${page}`);
    };


    const moveToUserInfoDrawer = (id) => {
        history.push(`/users/${id}`);
    };
    // Fragments return multiple elements and let you group a list of children without adding extra nodes to the DOM.
    return (
        <React.Fragment>

            <AllTable
                title={"All Users"}
                apiSchema={apiSchemaOfUsers}
                gettingAllData={getAllUsersData}
                gettingOneData={dataOfOneUser}
                rowsPerPage={8}
                onClickRow={moveToUserInfoDrawer}
            />

            <Switch>
                <Route path="/users/:id" component={Page2UserDetails} />
            </Switch>
        </React.Fragment>

    );

}

export default UsersTable;