
import React from "react";
import PermanentDrawerLeft from '../components/Drawer'
import CameraIcon from '@material-ui/icons/Camera';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import PersonIcon from '@material-ui/icons/Person';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';

export default function DrawerTable() {

    const linkesOfDrawer = [
        { ref: "/overview", label: "Overview", icon: <CameraIcon /> },
        { ref: "/tickets", label: "Tickets", icon: <ConfirmationNumberIcon /> },
        { ref: "/ideas", label: "Ideas", icon: <WbIncandescentIcon /> },
        { ref: "/users", label: "User", icon: <PersonIcon /> }

    ]

    return (<PermanentDrawerLeft links={linkesOfDrawer} />);
}
