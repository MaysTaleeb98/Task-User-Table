import DetailsPage from "../components/DetailsPage";
import { dataOfOneUser } from "./SchemaOfApi";
import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Page2UserDetails() {
    const history = useHistory();

    const getUserData = (user) => {
        user = dataOfOneUser(user);

        return {
            avatar: user.user.thumbnail,
            topTextField: user.user.topTextField,
            bottomTextField: user.user.bottomTextField,
        }
    };

    const getUserById = (id) => {
        return axios.get(`https://randomuser.me/api?id=${id}`);
    };


    return <React.Fragment>
        <Link to="/users/:id">
            <DetailsPage
                getingUserById={getUserById}
                gettingDataUser={getUserData}
                onClose={() => history.push("/users")

                }
            />

        </Link>



    </React.Fragment>



}

