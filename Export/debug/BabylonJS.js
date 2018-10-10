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
    var Text1, GameTimeText, Button, CountDownText;
    var OrientationX, OrientationY, OrientationZ;
    var MotionX, MotionY, MotionZ;
    var GameTime;
    var IsGamePlaying;
    var GameBeginTimeLong;
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
            IsGamePlaying = false;
            GameBeginTimeLong = 10;
            this.resetGame();
            this.createGUI();
            this.deviceMotion();
        };
        GameMesterComponent.prototype.update = function () {
            this.textUpdate();
            this.timeCountDown();
        };
        GameMesterComponent.prototype.textUpdate = function () {
            var t = (GameTime * 0.001).toFixed(1);
            Text1.text =
                '\n' +
                    "Gyroscope (" + OrientationX + " ," + OrientationY + " ," + OrientationZ + ")" +
                    '\n' + "Accelerometer (" + MotionX + " ," + MotionY + " ," + MotionZ + ")";
            if (GameTime == 0) {
                GameTimeText.isVisible = false;
            }
            else {
                GameTimeText.text = "遊戲時間：" + t;
            }
        };
        GameMesterComponent.prototype.timeCountDown = function () {
            if (GameTime <= 0) {
                GameTimeText.text = "時間到 !";
                IsGamePlaying = false;
                return;
            }
            if (IsGamePlaying == false) {
                this.resetGame();
                return;
            }
            GameTime -= this.engine.getDeltaTime();
        };
        GameMesterComponent.prototype.after = function () {
            // After render loop function
        };
        GameMesterComponent.prototype.destroy = function () {
            // Destroy component function
        };
        GameMesterComponent.prototype.resetGame = function () {
            GameTime = GameBeginTimeLong * 1000;
        };
        GameMesterComponent.prototype.buttonDownFunction = function () {
            console.log("buttonDownFunction");
            if (IsGamePlaying)
                this.resetGame();
        };
        GameMesterComponent.prototype.startCountdown = function () {
            CountDownText.isVisible = true;
            CountDownText.text = "3";
            var counter = 3;
            var interval = setInterval(function () {
                counter--;
                CountDownText.text = counter.toString();
                if (counter == 0) {
                    CountDownText.text = " Start !";
                    CountDownText.color = "yellow";
                }
                if (counter < 0) {
                    // The code here will run when
                    // the timer has reached zero.
                    clearInterval(interval);
                    CountDownText.isVisible = false;
                    IsGamePlaying = true;
                }
                ;
            }, 1000);
        };
        ;
        GameMesterComponent.prototype.createGUI = function () {
            AdvancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI");
            Text1 = new BABYLON.GUI.TextBlock();
            Text1.color = "white";
            Text1.fontSize = 48;
            Text1.resizeToFit = true;
            Text1.outlineWidth = 5;
            Text1.outlineColor = "black";
            Text1.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            Text1.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            Text1.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            Text1.paddingBottom = 320;
            Text1.fontFamily = "Microsoft JhengHei";
            AdvancedTexture.addControl(Text1);
            GameTimeText = new BABYLON.GUI.TextBlock();
            GameTimeText.color = "white";
            GameTimeText.fontSize = 64;
            GameTimeText.resizeToFit = true;
            GameTimeText.outlineWidth = 5;
            GameTimeText.outlineColor = "black";
            GameTimeText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            GameTimeText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            GameTimeText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            GameTimeText.fontFamily = "Microsoft JhengHei";
            AdvancedTexture.addControl(GameTimeText);
            CountDownText = new BABYLON.GUI.TextBlock();
            CountDownText.color = "red";
            CountDownText.fontSize = 420;
            CountDownText.fontFamily = "fantasy";
            CountDownText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            CountDownText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            CountDownText.outlineWidth = 20;
            CountDownText.outlineColor = "white";
            CountDownText.shadowBlur = 50;
            CountDownText.shadowOffsetX = 10;
            CountDownText.shadowOffsetY = 10;
            CountDownText.isVisible = false;
            CountDownText.text = '3';
            AdvancedTexture.addControl(CountDownText);
            Button = BABYLON.GUI.Button.CreateSimpleButton("Button", "開始遊戲");
            Button.width = 0.2;
            Button.height = "40px";
            Button.color = "white";
            Button.background = "green";
            Button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            Button.onPointerUpObservable.add(this.startCountdown);
            Button.onPointerUpObservable.add(this.resetGame);
            Button.fontFamily = "Microsoft JhengHei";
            AdvancedTexture.addControl(Button);
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
