"use strict";

import React from "react";

var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var useStyles = styles_1.makeStyles(function (theme: any) {
    return styles_1.createStyles({
        subtitle: {
            textTransform: 'uppercase',
            marginLeft: '2px',
        },
        fieldset: {
            color: theme.palette.text.secondary,
            margin: "16px",
            marginTop: "32px",
        },
        topo: {
            borderBottom: '1px solid #e0e0e0',
            marginBottom: '-20px',
            marginLeft: '1%',
            marginRight: '1%',
        },
        wrap: {
            borderLeft: '5px solid',
            borderColor: theme.palette.primary.main,
            boxShadow: '1px 1px 5px lightgrey',
            padding: '10px 0 10px 0',
            marginBottom: '20px',
        },
    });
});
export default function Fieldset(props: any) {
    var classes = useStyles({});
    return (React.createElement("div", { className: classes.wrap },
        React.createElement("div", { className: classes.topo },
            React.createElement(core_1.Typography, { variant: "subtitle1", align: "left", color: "textSecondary", className: classes.subtitle, noWrap: true }, props.subtitle)),
        React.createElement("div", { className: classes.fieldset }, props.children)));
}