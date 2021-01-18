import React from "react";
// "use strict";
// var __importStar = (this && this.__importStar) || function (mod) {
//     if (mod && mod.__esModule) return mod;
//     var result = {};
//     if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
//     result["default"] = mod;
//     return result;
// };
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// var React = __importStar(require("react"));
// var Grid_1 = __importDefault(require("@material-ui/core/Grid"));
import Grid from '@material-ui/core/Grid';
// var Button_1 = __importDefault(require("@material-ui/core/Button"));
import Button from '@material-ui/core/Button'
// var ArrowBack_1 = __importDefault(require("@material-ui/icons/ArrowBack"));
import ArrowBack from "@material-ui/icons/ArrowBack"
// var Hidden_1 = __importDefault(require("@material-ui/core/Hidden"));
import Hidden from "@material-ui/core/Hidden"

var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var useStyles = styles_1.makeStyles(function (theme: any) {
    return styles_1.createStyles({
        root: {
            flexGrow: 1,
        },
        left: {
            float: 'left',
            color: 'gray',
        },
        labelButton: {
            marginRight: '10px',
            color: 'gray'
        },
        labelButton2: {
            color: 'gray',
            padding: 0,
        },
        title: {
            marginLeft: -60,
        },
        title2: {
            marginLeft: -100,
        },
        paper: {
            backgroundColor: '#fff',
            padding: "16px",
        },
    });
});
export default function Page(props: any) {
    var classes = useStyles({});
    return (React.createElement("div", { className: classes.root },
        React.createElement(Grid, { item: true, xs: 12 },
            React.createElement("div", { className: classes.paper },
                // React.createElement(Hidden, { only: ['sm', 'xs'] },
                //     React.createElement(Button, { className: classes.left, onClick: props.history.goBack, disabled: props.disabled || false },
                //         React.createElement(ArrowBack, { className: classes.labelButton }),
                //         "Voltar")),

                null),

                React.createElement(Hidden, { only: ['md', 'lg', 'xl'] }),
                React.createElement(core_1.Typography, { variant: "h6", align: 'center', noWrap: true, color: "textSecondary" },
                    React.createElement(Hidden, { only: ['sm', 'xs'] },
                        React.createElement("span", { className: classes.title2 }, props.pagetitle)),
                    React.createElement(Hidden, { only: ['md', 'lg', 'xl'] },
                        React.createElement("span", { className: classes.title }, props.pagetitle)))),
            React.createElement("div", { className: classes.paper }, props.children)));
}
// exports.default = Page;
//# sourceMappingURL=Page.js.map