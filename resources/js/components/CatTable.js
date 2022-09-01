import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { fetchData } from "../api/FetchData";
import Typography from "@material-ui/core/Typography";
import { RepeatRounded } from "@material-ui/icons";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function AcccessibleTable(props) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="caption table">
                <caption>A basic table example with a caption</caption>
                <TableHead>
                    <TableRow>
                        {props.header.map((text, key) => {
                            return (
                                <TableCell align="right" key={key}>
                                    <Typography variant="h5">{text}</Typography>
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row, key) => {
                        return (
                            <TableRow key={row.key}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">
                                    {row.discount}
                                </TableCell>
                                <TableCell align="right">{row.level}</TableCell>
                                <TableCell align="right">
                                    {row.created_at}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
