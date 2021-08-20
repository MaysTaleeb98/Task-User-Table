import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    imges: {
        float: 'left',
        marginRight: 20
    },
    topTextField: {
        color: theme.primaryText.color,
        fontSize: theme.primaryText.size,
        fontWeight: 600,
        letterSpacing: 1,
    },
    bottomTextField: {
        color: theme.secondaryText.color,
        fontSize: theme.secondaryText.size,
    }
}));

function OneCellOfTable({ thumbnail, topTextField, bottomTextField }) {

    const classes = useStyles();

    return <div className={classes.cell}>
        {thumbnail ? <Avatar src={thumbnail} className={classes.imges} /> : ""}
        <div className={classes.topTextField}>{topTextField}</div>
        <div className={classes.bottomTextField}>{bottomTextField}</div>
    </div>
}

export default OneCellOfTable;