import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { postDataToAPI } from "../api/PostData";
import { fetchData } from "../api/FetchData";
import ItemTable from "./ItemTable";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 20,
    },
    title: {
        color: "#2560ff",
        textAlign: "center",
    },
}));

function createData(
    name,
    description,
    discount,
    category_id,
    price,
    created_at
) {
    return { name, description, discount, category_id, price, created_at };
}

export default function Item() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        name: "",
        description: "",
        category_id: null,
        discount: 0,
        price: 0,
    });

    const [sending, setSending] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [chose, setChose] = React.useState(true);
    const [message, setMessage] = React.useState("");
    const [subCategoris, setSubCategoris] = React.useState([]);
    const [items, setItems] = React.useState([]);

    const header = [
        "name",
        "description",
        "discount",
        "category_id",
        "price",
        "created_at",
    ];

    useEffect(() => {
        fetchData("api/category").then((list) => {
            setSubCategoris(list.data);
        });
    }, []);

    useEffect(() => {
        fetchData("api/item").then((list) => {
            let data = list.data.map((obj) => {
                return createData(
                    obj.name,
                    obj.description,
                    obj.discount,
                    obj.category_id,
                    obj.price,
                    obj.created_at
                );
            });
            setItems(data);
            setSending(false);
            console.log(data);
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
    };

    const submit = (event) => {
        setSending(true);
        postDataToAPI(`/api/item`, state)
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
            <form
                className={classes.root}
                onSubmit={submit}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="h3">
                            Item
                        </Typography>
                    </Grid>
                    <div className={classes.root}>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <TextField
                                    id="standard-basic"
                                    label="name"
                                    name="name"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="standard-basic"
                                    onChange={handleChange}
                                    label="discount"
                                    name="discount"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="standard-basic"
                                    onChange={handleChange}
                                    label="price"
                                    name="price"
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="description"
                                    name="description"
                                    multiline
                                    defaultValue=""
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl
                                    variant="filled"
                                    fullWidth="true"
                                    className={classes.formControl}
                                >
                                    <InputLabel htmlFor="filled-age-native-simple">
                                        category
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
                                            value="-1"
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
                            <Grid item xs={4}>
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
            <ItemTable rows={items} header={header} />
        </div>
    );
}
