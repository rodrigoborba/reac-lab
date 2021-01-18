"use strict";
import React from "react";
// var __importStar = (this && this.__importStar) || function (mod) {
//     if (mod && mod.__esModule) return mod;
//     var result = {};
//     if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
//     result["default"] = mod;
//     return result;
// };
// Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
export default function Row(props: any) {
    return (React.createElement("div", null,
        React.createElement(core_1.Grid, { container: true, spacing: 4, style: { marginBottom: "10px" } }, props.children)));
}
// exports.default = Row;
//# sourceMappingURL=Row.js.map