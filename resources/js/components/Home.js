import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Cat from "./Cat";
import Item from "./Item";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    link: {
        textDecoration: "none",
    },
    container: {
        boxShadow: "0 3px 5px 2px rgba(37, 96, 255, .3)",
        marginTop: 30,
    },
    marginTop: {
        marginTop: 30,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        boxShadow: "0 3px 5px 2px rgba(37, 96, 255, .3)",
        color: "#2560ff",
        textAlign: "center",
    },
}));

function Home() {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="lg">
                <Typography className={classes.title} variant="h1">
                    Welcome To React Resturant
                </Typography>
                <BrowserRouter>
                    <Grid
                        container
                        className={classes.marginTop}
                        justifyContent="center"
                        spacing={1}
                    >
                        <Grid item>
                            <Link className={classes.link} to="/home">
                                <Button variant="contained" color="primary">
                                    Item
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link className={classes.link} to="/cat">
                                <Button variant="contained" color="secondary">
                                    Category
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                    <Grid
                        className={classes.container}
                        container
                        justifyContent="center"
                        spacing={1}
                    >
                        <Routes>
                            <Route path="/home" element={<Item />}></Route>
                            <Route path="/cat" element={<Cat />}></Route>
                        </Routes>
                    </Grid>
                </BrowserRouter>
            </Container>
        </>
    );
}

export default Home;
