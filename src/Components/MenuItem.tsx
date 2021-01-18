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
// var React = __importStar(require("react"));
// var react_router_dom_1 = require("react-router-dom");
// var ListItem_1 = __importDefault(require("@material-ui/core/ListItem"));
// var ListItemIcon_1 = __importDefault(require("@material-ui/core/ListItemIcon"));
// var core_1 = require("@material-ui/core");
// var ArrowRightOutlined_1 = __importDefault(require("@material-ui/icons/ArrowRightOutlined"));

import React from 'react';
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core"
import { ArrowRightOutlined } from "@material-ui/icons"

export default function MenuItem(props: any) {
    return (React.createElement(Link, { to: props.to, style: { textDecoration: 'none' }, "aria-label": props.primary },
        React.createElement(ListItem, { button: true },
            React.createElement(ListItemIcon, null, props.children || React.createElement(ArrowRightOutlined, null)),
            React.createElement(Typography, { variant: "inherit", noWrap: true, style: { fontFamily: 'Lato' } }, props.primary)))
    );
}
// exports.default = (MenuItem);
//# sourceMappingURL=MenuItem.js.map