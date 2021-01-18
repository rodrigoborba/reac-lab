"use strict";
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
import React from 'react'
// var react_1 = require("react");
import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/icons/Menu"
import Paper from "@material-ui/core/Paper"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { Theme } from '@material-ui/core/styles'
var styles_1 = require("@material-ui/core/styles");
var drawerWidth = 240;
var useStyles = styles_1.makeStyles(function (theme: Theme) {
    var _a, _b, _c, _d, _e;
    return styles_1.createStyles({
        root: {
            display: 'flex',
        },
        // drawer: (_a = {},
        //     _a[theme.breakpoints.up('md')] = {
        //         width: drawerWidth,
        //         flexShrink: 0,
        //     },
        //     _a),
        // appBar: (_b = {
        //     marginLeft: drawerWidth
        // },
            // _b[theme.breakpoints.up('md')] = {
            //     width: "calc(100% - " + drawerWidth + "px)",
            // },
            // _b.backgroundColor = theme.palette.common.white,
            // _b.color = theme.palette.primary.main,
            // _b.boxShadow = 'none',
            // _b),
        // menuButton: (_c = {
        //     marginRight: theme.spacing(2)
        // },
        //     _c[theme.breakpoints.up('md')] = {
        //         display: 'none',
        //     },
        //     _c),
        // toolbar: theme.mixins.toolbar,
        // drawerPaper: {
        //     width: drawerWidth,
        // },
        // content: {
        //     flexGrow: 1,
        //     padding: theme.spacing(3),
        // },
        // versao: {
        //     color: theme.palette.common.white,
        //     fontSize: '0.7em',
        //     fontFamily: 'Lato',
        // },
        // paper: {
        //     padding: "8px",
        //     textAlign: 'center',
        //     color: theme.palette.text.secondary,
        //     boxShadow: 'none',
        //     borderRadius: '0',
        //     backgroundColor: 'inherit'
        // },
        // toolbarButtons: {
        //     marginLeft: "auto",
        // },
        // title: {
        //     width: '100%',
        // },
        // color: {
        //     color: 'darkgray',
        // },
        // sectionDesktop: (_d = {
        //     display: 'none',
        //     color: 'gray'
        // },
        //     _d[theme.breakpoints.up('md')] = {
        //         display: 'flex',
        //     },
        //     _d),
        // sectionMobile: (_e = {
        //     display: 'flex',
        //     color: 'gray'
        // },
        //     _e[theme.breakpoints.up('md')] = {
        //         display: 'none',
        //     },
        //     _e),
    });
});
function ResponsiveDrawer(props: any) {
    var container = props.container;
    var classes = useStyles({});
    var theme = styles_1.useTheme();
    var _a = React.useState(false), mobileOpen = _a[0], setMobileOpen = _a[1];
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }
    var drawer = (React.createElement("div", null,
        React.createElement("div", { className: classes.toolbar },
            React.createElement(Logo, null)),
        React.createElement(Divider, null),
        props.children,
        React.createElement(Divider, null),
        React.createElement(Paper, { className: classes.paper },
            React.createElement("span", { className: classes.versao },
                "Vers\u00E3o: ",
                props.version))));
    return (React.createElement("div", { className: classes.root },
        React.createElement(CssBaseline, null),
        React.createElement(AppBar, { position: "fixed", className: classes.appBar },
            React.createElement(Toolbar, null,
                React.createElement(IconButton, { color: "inherit", "aria-label": "open drawer", edge: "start", onClick: handleDrawerToggle, className: classes.menuButton },
                    React.createElement(Menu, null)),
                React.createElement(Typography, { variant: "h6", noWrap: true, className: classes.title }, props.system),
                props.search,
                props.user,
                props.out)),
        React.createElement("nav", { className: classes.drawer, "aria-label": "mailbox folders" },
            React.createElement(Hidden, { smUp: true, implementation: "css" },
                React.createElement(Drawer, {
                    container: container, variant: "temporary", anchor: theme.direction === 'rtl' ? 'right' : 'left', open: mobileOpen, onClose: handleDrawerToggle, classes: {
                        paper: classes.drawerPaper,
                    }, ModalProps: {
                        keepMounted: true,
                    }
                }, drawer)),
            React.createElement(Hidden, { xsDown: true, implementation: "css" },
                React.createElement(Drawer, {
                    classes: {
                        paper: classes.drawerPaper,
                    }, variant: "permanent", open: true
                }, drawer)))));
}
// exports.default = ResponsiveDrawer;
var useStyles2 = styles_1.makeStyles(function (theme: any) {
    return styles_1.createStyles({
        root: {},
        logo: {
            width: '55%',
            marginLeft: '8%',
            marginTop: '4%',
        },
    });
});
export default function Logo(props: any) {
    var classes = useStyles2({});
    return (React.createElement("div")
    );
}
// exports.Logo = Logo;
//# sourceMappingURL=Header.js.map