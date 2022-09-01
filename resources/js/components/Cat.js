import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { postDataToAPI } from "../api/PostData";
import { fetchData } from "../api/FetchData";
import Button from "@material-ui/core/Button";
import CatTable from "./CatTable";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 20,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    title: {
        color: "#2560ff",
        textAlign: "center",
    },
    titleTable: {
        color: "#ff0038",
        textAlign: "center",
    },
}));

function createData(title, discount, level, created_at) {
    return { title, discount, level, created_at };
}

export default function Cat() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        title: "",
        category_id: null,
        discount: 0,
    });

    const [sending, setSending] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [chose, setChose] = React.useState(true);
    const [message, setMessage] = React.useState("");
    const [subCategoris, setSubCategoris] = React.useState([]);

    const header = ["title", "discount", "level", "created_at"];

    useEffect(() => {
        fetchData("api/category").then((list) => {
            let data = list.data.map((obj) => {
                return createData(
                    obj.title,
                    obj.disount,
                    obj.level,
                    obj.created_at
                );
            });
            setSubCategoris(list.data);
            setSending(false);
        });
    }, [sending]);

    const handleChange = (event) => {
        const name = event.target.name;
        if (name == "category_id") {
            setChose(false);
        }
        setState({
            ...state,
            [name]: event.target.value,
        });
        console.log(name);
        console.log(event.target.value);
    };

    const submit = (event) => {
        setSending(true);
        postDataToAPI(`/api/category`, state)
            .then((response) => response.json())
            .then((list) => {
                let data = list.message;
                setMessage(data);
                console.log(list);
                setSuccess(true);
            })
            .catch((e) => console.log(e));
        setChose(true);
        event.preventDefault();
    };

    return (
        <div className={classes.root}>
            {console.log(1)}
            <form
                className={classes.root}
                onSubmit={submit}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="h3">
                            Categories
                        </Typography>
                    </Grid>
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <TextField
                                    id="standard-basic"
                                    label="title"
                                    name="title"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    type="number"
                                    id="standard-basic"
                                    onChange={handleChange}
                                    label="discount"
                                    name="discount"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl
                                    fullWidth="true"
                                    variant="filled"
                                    className={classes.formControl}
                                >
                                    <InputLabel htmlFor="filled-age-native-simple">
                                        Subcategory of
                                    </InputLabel>
                                    <Select
                                        native
                                        value={state.age}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: "category_id",
                                            id: "filled-age-native-simple",
                                        }}
                                    >
                                        <option
                                            aria-label="None"
                                            value=""
                                            selected={chose}
                                        />
                                        {subCategoris.map((value, key) => {
                                            return (
                                                <option
                                                    key={key}
                                                    value={value.id}
                                                >
                                                    {value.title}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={1}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Create
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                {sending && <CircularProgress />}
                            </Grid>
                            <Grid item xs={9}>
                                {success && (
                                    <Typography variant="h5">
                                        {message}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </form>
            <Grid item xs={12}>
                <Typography className={classes.titleTable} variant="h5">
                    Categories table
                </Typography>
            </Grid>
            <CatTable rows={subCategoris} header={header} />
        </div>
    );
}
