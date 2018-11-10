"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Shape = /** @class */ (function () {
    function Shape(x, y) {
        this.x = x;
        this.y = y;
    }
    Shape.prototype.move = function (x, y) {
        this.x += x;
        this.y += y;
    };
    return Shape;
}());
exports.Shape = Shape;
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(x, y, r) {
        var _this = _super.call(this, x, y) || this;
        _this.r = r;
        return _this;
    }
    Circle.prototype.area = function () {
        return this.r * 2 * Math.PI;
    };
    return Circle;
}(Shape));
exports.Circle = Circle;
