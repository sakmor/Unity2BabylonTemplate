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
/* Babylon Mesh Component Template */
var PROJECT;
/* Babylon Mesh Component Template */
(function (PROJECT) {
    var CubeComponent = /** @class */ (function (_super) {
        __extends(CubeComponent, _super);
        function CubeComponent(owner, scene, tick, propertyBag) {
            if (tick === void 0) { tick = true; }
            if (propertyBag === void 0) { propertyBag = {}; }
            return _super.call(this, owner, scene, tick, propertyBag) || this;
        }
        CubeComponent.prototype.ready = function () {
            // Scene execute when ready
            console.log(this.getProperty('hello'));
        };
        CubeComponent.prototype.start = function () {
            // Start component function
        };
        CubeComponent.prototype.update = function () {
            // Update render loop function
            this.mesh.position.y += 0.1;
        };
        CubeComponent.prototype.after = function () {
            // After render loop function
        };
        CubeComponent.prototype.destroy = function () {
            // Destroy component function
        };
        return CubeComponent;
    }(BABYLON.MeshComponent));
    PROJECT.CubeComponent = CubeComponent;
})(PROJECT || (PROJECT = {}));
