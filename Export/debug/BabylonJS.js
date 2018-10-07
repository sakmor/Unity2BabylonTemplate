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
/* Babylon Scene Controller Template */
var PROJECT;
/* Babylon Scene Controller Template */
(function (PROJECT) {
    var AdvancedTexture;
    var Text1;
    var OrientationX, OrientationY, OrientationZ;
    var MotionX, MotionY, MotionZ;
    var GameMesterComponent = /** @class */ (function (_super) {
        __extends(GameMesterComponent, _super);
        function GameMesterComponent(owner, scene, tick, propertyBag) {
            if (tick === void 0) { tick = true; }
            if (propertyBag === void 0) { propertyBag = {}; }
            return _super.call(this, owner, scene, tick, propertyBag) || this;
        }
        GameMesterComponent.prototype.ready = function () {
            // Scene execute when ready
        };
        GameMesterComponent.prototype.start = function () {
            // Start component function
            // GUI
            this.createGUI();
            this.deviceMotion();
        };
        GameMesterComponent.prototype.update = function () {
            // Update render loop function
            Text1.text = "陀螺儀 = X:" + OrientationX + " Y:" + OrientationY + " Z:" + OrientationZ + '\n' + "加速器 = X:" + MotionX + " Y:" + MotionY + " Z:" + MotionZ;
        };
        GameMesterComponent.prototype.after = function () {
            // After render loop function
        };
        GameMesterComponent.prototype.destroy = function () {
            // Destroy component function
        };
        GameMesterComponent.prototype.createGUI = function () {
            AdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
            Text1 = new BABYLON.GUI.TextBlock();
            Text1.color = "white";
            Text1.fontSize = 64;
            Text1.resizeToFit = true;
            Text1.outlineWidth = 5;
            Text1.outlineColor = "black";
            Text1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            Text1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            AdvancedTexture.addControl(Text1);
        };
        GameMesterComponent.prototype.deviceMotion = function () {
            window.addEventListener("deviceorientation", function (event) {
                OrientationX = Math.round(event.beta);
                OrientationY = Math.round(event.gamma);
                OrientationZ = Math.round(event.alpha);
            }, true);
            window.addEventListener("devicemotion", function (event) {
                MotionX = Math.round(event.acceleration.x);
                MotionY = Math.round(event.acceleration.y);
                MotionZ = Math.round(event.acceleration.z);
            }, true);
        };
        return GameMesterComponent;
    }(BABYLON.MeshComponent));
    PROJECT.GameMesterComponent = GameMesterComponent;
})(PROJECT || (PROJECT = {}));
