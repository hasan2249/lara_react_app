import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 200,
    },
    title: {
        color: "#2560ff",
        textAlign: "center",
    },
}));

export default function Cat() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography className={classes.title} variant="h3">
                        Welcome to Admin Dashboard
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}
