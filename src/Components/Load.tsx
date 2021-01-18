import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    root: {
        position: 'absolute',
        zIndex: 1600,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        height: '100%',
        width: '100%',
    },
    title: {
        color: '#ffffff',
        fontSize: '1.5em',
    },
    
})

export default function Load() {
    const classes = useStyles();

    return (
        React.createElement("div", { className: classes.root },
        React.createElement("div",
            React.createElement(CircularProgress, null),
            React.createElement("p", { className: classes.title }, "Carregando...")))
    );

}