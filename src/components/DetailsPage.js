import Drawer from "@material-ui/core/Drawer";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    drawerBox: {
        width: 546

    },
    topColor: {
        backgroundColor: '#528CFC',
        height: 158
    },
    picuture: {
        position: 'absolute',
        width: 100,
        height: 100,
        top: 100,
        left: 0,
        right: 0,
        margin: 'auto'
    },
    topTextField: {
        marginTop: 70,
        color: '#252733',
        fontSize: 18,
        font: 'Mulish',
        textAlign: "center"

    },
    bottomTextField: {
        color: '#87888C',
        fontSize: 14,
        font: 'Mulish',
        textAlign: "center"
    }
}));

function DetailsSlider({ getingUserById, gettingDataUser, onClose }) {

    const [isOpen, setIsOpen] = useState(true);
    const [clickedRow, setClickedRow] = useState();


    const { id } = useParams(); //Use useprams to access URL in ReactRouter

    useEffect(() => {
        getingUserById(id).then(table => {
            return table.data.results //check if there is data with spefic id
                ? setClickedRow(gettingDataUser(table.data.results[0])) // return the first result
                : {}
        });
    }, [id]
    )
    if (!isOpen) {
        onClose();
    }

    const classes = useStyles();
    return <Drawer
        anchor="right"
        onClose={() => setIsOpen(false)}
        transitionDuration={1000}
        open={isOpen}
    >
        {clickedRow && <div className={classes.drawerBox}>
            <div className={classes.topColor} />
            <Avatar src={clickedRow.avatar} className={classes.picuture} />
            <div className={classes.topTextField}>{clickedRow.topTextField}</div>
            <div className={classes.bottomTextField}>{clickedRow.bottomTextField}</div>
        </div>}
    </Drawer>

}

export default DetailsSlider;