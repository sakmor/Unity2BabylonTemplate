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
    var UpSound;
    var AdvancedTexture;
    var DeviceText, ScoreText, TargetText, DiffValueText, CameraDirText;
    var TargetVector3;
    var Score;
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
            var UpSound = new BABYLON.Sound("Music", "scenes/up.mp3", this.scene, null, { loop: false, autoplay: true });
            UpSound.play();
            // Start component function
            Score = 0;
            // GUI
            this.createGUI();
            this.deviceMotion();
            // 建立目標數值與文字
            TargetVector3 = new BABYLON.Vector3(30, 30, 30);
            TargetText.text = TargetVector3.toString();
        };
        GameMesterComponent.prototype.update = function () {
            // Update render loop function
            DeviceText.text = "陀螺儀 = X:" + OrientationX + " Y:" + OrientationY + " Z:" + OrientationZ + '\n' + "加速器 = X:" + MotionX + " Y:" + MotionY + " Z:" + MotionZ;
            //檢查數值是否正確
            this.TargetVector3Checker();
        };
        GameMesterComponent.prototype.TargetVector3Checker = function () {
            var valueDiff;
            var Orientation = new BABYLON.Vector3(OrientationX, OrientationY, OrientationZ);
            valueDiff = Math.round(BABYLON.Vector3.Distance(Orientation, TargetVector3));
            DiffValueText.text = "距離:" + valueDiff.toString() + '\n' + "分數:" + Score;
            if (valueDiff < 50) {
                Score += 1;
                ScoreText.text = Score.toString();
                var x = Math.floor(Math.random() * 128) - 0;
                var y = Math.floor(Math.random() * 128) - 0;
                var z = Math.floor(Math.random() * 128) - 0;
                TargetVector3 = new BABYLON.Vector3(x, y, z);
                TargetText.text = TargetVector3.toString();
                if (UpSound.isPlaying == false)
                    UpSound.play();
            }
        };
        GameMesterComponent.prototype.after = function () {
            // After render loop function
        };
        GameMesterComponent.prototype.destroy = function () {
            // Destroy component function
        };
        GameMesterComponent.prototype.createGUI = function () {
            AdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
            DeviceText = new BABYLON.GUI.TextBlock();
            DeviceText.color = "white";
            DeviceText.fontSize = 64;
            DeviceText.resizeToFit = true;
            DeviceText.outlineWidth = 5;
            DeviceText.outlineColor = "black";
            DeviceText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            DeviceText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
            AdvancedTexture.addControl(DeviceText);
            DeviceText.paddingBottom = 300;
            ScoreText = new BABYLON.GUI.TextBlock();
            ScoreText.color = "white";
            ScoreText.fontSize = 64;
            ScoreText.resizeToFit = true;
            ScoreText.outlineWidth = 5;
            ScoreText.outlineColor = "black";
            ScoreText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            ScoreText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            AdvancedTexture.addControl(ScoreText);
            ScoreText.text = Score.toString();
            TargetText = new BABYLON.GUI.TextBlock();
            TargetText.color = "white";
            TargetText.fontSize = 64;
            TargetText.resizeToFit = true;
            TargetText.outlineWidth = 5;
            TargetText.outlineColor = "green";
            TargetText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            TargetText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
            TargetText.paddingBottom = 500;
            AdvancedTexture.addControl(TargetText);
            TargetText.text = Score.toString();
            DiffValueText = new BABYLON.GUI.TextBlock();
            DiffValueText.color = "white";
            DiffValueText.fontSize = 64;
            DiffValueText.resizeToFit = true;
            DiffValueText.outlineWidth = 5;
            DiffValueText.outlineColor = "black";
            DiffValueText.horizontalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
            DiffValueText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
            AdvancedTexture.addControl(DiffValueText);
            CameraDirText = new BABYLON.GUI.TextBlock();
            CameraDirText.color = "white";
            CameraDirText.fontSize = 64;
            CameraDirText.resizeToFit = true;
            CameraDirText.outlineWidth = 5;
            CameraDirText.outlineColor = "black";
            CameraDirText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            CameraDirText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
            AdvancedTexture.addControl(CameraDirText);
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
