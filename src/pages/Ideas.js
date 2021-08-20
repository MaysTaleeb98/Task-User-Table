import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export default function Ideas() {

  const useStyles = makeStyles((theme) => ({

    toolbarr: {
      paddingLeft: 10,
      paddingTop: 30

    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  return (


    <Typography paragraph className={classes.toolbarr} >
      Ideas
    </Typography>

  );
}