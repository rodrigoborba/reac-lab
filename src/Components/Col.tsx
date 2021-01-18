// "use strict";
import React from "react";
import Grid from '@material-ui/core/Grid';
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

export default function Col(props: any) {
    return (React.createElement(Grid, { item: true, xs: 12, sm: props.sm, style: { minWidth: '200px' } }, props.children));
}
// exports.default = Col;
//# sourceMappingURL=Col.js.map