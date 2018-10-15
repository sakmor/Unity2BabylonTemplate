window.project = true;

// Project Shader Store


// Browser Window Services

//////////////////////////////////////////////
// Babylon Toolkit - Browser Window Services
//////////////////////////////////////////////

/** Firelight Audio Shims */
window.firelightAudio = 0;
window.firelightDebug = false;
if (window.firelightAudio === 1 || window.firelightAudio === 2) {
	var fmodjs = "scripts/fmodstudio.js";
	if (window.firelightDebug === true) {
		fmodjs = ("scripts/" + (window.firelightAudio === 1) ? "fmodstudioL.js" : "fmodL.js");
	} else {
		fmodjs = ("scripts/" + (window.firelightAudio === 1) ? "fmodstudio.js" : "fmod.js");
	}
	var script2 = document.createElement('script');
	script2.setAttribute("type","text/javascript");
	script2.setAttribute("src", fmodjs);
	if (document.head != null) {
		document.head.appendChild(script2);
	} else if (document.body != null) {
		document.body.appendChild(script2);
	}
}

/** Windows Launch Mode */
window.preferredLaunchMode = 0;
if (typeof Windows !== "undefined" && typeof Windows.UI !== "undefined" && typeof Windows.UI.ViewManagement !== "undefined" &&typeof Windows.UI.ViewManagement.ApplicationView !== "undefined") {
	Windows.UI.ViewManagement.ApplicationView.preferredLaunchWindowingMode = (window.preferredLaunchMode === 1) ? Windows.UI.ViewManagement.ApplicationViewWindowingMode.fullScreen : Windows.UI.ViewManagement.ApplicationViewWindowingMode.auto;
}

/** Xbox Full Screen Shims */
document.querySelector('style').textContent += "@media (max-height: 1080px) { @-ms-viewport { height: 1080px; } }";

/** Xbox Live Plugin Shims */
window.xboxLiveServices = false;
window.isXboxLivePluginEnabled = function() {
	var isXboxLive = (typeof Windows !== "undefined" && typeof Microsoft !== "undefined" && typeof Microsoft.Xbox !== "undefined" && typeof Microsoft.Xbox.Services !== "undefined");
	var hasToolkit = (typeof BabylonToolkit !== "undefined" && typeof BabylonToolkit.XboxLive !== "undefined" && typeof BabylonToolkit.XboxLive.Plugin !== "undefined");
	return (window.xboxLiveServices === true && isXboxLive === true && hasToolkit === true);
}

/** Generic Promise Shims */
window.createGenericPromise = function(resolveRejectHandler) {
	return new Promise(resolveRejectHandler);
}
window.resolveGenericPromise = function(resolveObject) {
    return Promise.resolve(resolveObject);
}


// BabylonJS.ts
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
    var Text1, Text2, GameTimeText, CountDownText;
    var ButtonStart, ButtonMenu;
    var OrientationX, OrientationY, OrientationZ;
    var MotionX, MotionY, MotionZ;
    var GameTime;
    var GameBeginTimeLong;
    var GameState;
    var TargetOrientationX, TargetOrientationY, TargetOrientationZ;
    var enumGameState;
    (function (enumGameState) {
        enumGameState[enumGameState["GameMenu"] = 0] = "GameMenu";
        enumGameState[enumGameState["GameCountDown"] = 1] = "GameCountDown";
        enumGameState[enumGameState["GamePlaying"] = 2] = "GamePlaying";
        enumGameState[enumGameState["GameTimesUp"] = 3] = "GameTimesUp";
    })(enumGameState || (enumGameState = {}));
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
            GameState = enumGameState.GameMenu;
            GameBeginTimeLong = 10;
            this.createGUI();
            this.deviceMotion();
            this.resetGame();
        };
        GameMesterComponent.prototype.randomIntFromInterval = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };
        GameMesterComponent.prototype.update = function () {
            this.GameMenu();
            this.GameCounDown();
            this.GamePlaying();
            this.GameTimesUp();
        };
        GameMesterComponent.prototype.GameCounDown = function () {
            if (GameState != enumGameState.GameCountDown)
                return;
            Text1.isVisible = false;
        };
        GameMesterComponent.prototype.GameMenu = function () {
            if (GameState != enumGameState.GameMenu)
                return;
            this.textUpdate();
            GameTimeText.isVisible = false;
            Text1.isVisible = true;
            Text2.isVisible = false;
        };
        GameMesterComponent.prototype.GameTimesUp = function () {
            if (GameState != enumGameState.GameTimesUp)
                return;
            GameTimeText.text = "時間到!";
            Text2.isVisible = false;
        };
        GameMesterComponent.prototype.GamePlaying = function () {
            if (GameState != enumGameState.GamePlaying)
                return;
            Text2.isVisible = true;
            GameTimeText.isVisible = true;
            this.timeCountDown();
        };
        GameMesterComponent.prototype.textUpdate = function () {
            var t = (GameTime * 0.001).toFixed(1);
            Text1.text =
                '\n' +
                    "Gyroscope (" + OrientationX + " ," + OrientationY + " ," + OrientationZ + ")" +
                    '\n' + "Accelerometer (" + MotionX + " ," + MotionY + " ," + MotionZ + ")";
            Text2.text =
                "Gyroscope (" + TargetOrientationX + " ," + TargetOrientationY + " ," + TargetOrientationZ + ")";
            if (GameTime == 0) {
                GameTimeText.isVisible = false;
            }
            else {
                GameTimeText.text = "遊戲時間：" + t;
            }
        };
        GameMesterComponent.prototype.timeCountDown = function () {
            if (GameTime > 0) {
                GameTime -= this.engine.getDeltaTime();
                return;
            }
            GameTimeText.text = "時間到 !";
            GameState = enumGameState.GameTimesUp;
        };
        GameMesterComponent.prototype.after = function () {
            // After render loop function
        };
        GameMesterComponent.prototype.destroy = function () {
            // Destroy component function
        };
        GameMesterComponent.prototype.resetGame = function () {
            GameTime = GameBeginTimeLong * 1000;
            TargetOrientationX = this.randomIntFromInterval(-360, 360);
            TargetOrientationY = this.randomIntFromInterval(-360, 360);
            TargetOrientationZ = this.randomIntFromInterval(-360, 360);
        };
        GameMesterComponent.prototype.startCountdown = function () {
            GameState = enumGameState.GameCountDown;
            CountDownText.isVisible = true;
            Text1.isVisible = false;
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
                    clearInterval(interval);
                    CountDownText.isVisible = false;
                    GameState = enumGameState.GamePlaying;
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
            Text2 = new BABYLON.GUI.TextBlock();
            Text2.color = "red";
            Text2.fontSize = 48;
            Text2.resizeToFit = true;
            Text2.outlineWidth = 5;
            Text2.outlineColor = "white";
            Text2.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            Text2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            Text2.verticalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            Text2.paddingBottom = 300;
            Text2.fontFamily = "Microsoft JhengHei";
            AdvancedTexture.addControl(Text2);
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
            ButtonStart = BABYLON.GUI.Button.CreateSimpleButton("ButtonStart", "開始遊戲");
            ButtonStart.width = 0.2;
            ButtonStart.height = "40px";
            ButtonStart.color = "white";
            ButtonStart.background = "green";
            ButtonStart.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            ButtonStart.onPointerUpObservable.add(this.startCountdown);
            ButtonStart.fontFamily = "Microsoft JhengHei";
            AdvancedTexture.addControl(ButtonStart);
            ButtonMenu = BABYLON.GUI.Button.CreateSimpleButton("ButtonMenu", "返回目錄");
            ButtonMenu.width = 0.2;
            ButtonMenu.height = "40px";
            ButtonMenu.color = "white";
            ButtonMenu.background = "green";
            ButtonMenu.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            ButtonMenu.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            ButtonMenu.onPointerUpObservable.add(function () {
                GameState = enumGameState.GameMenu;
            });
            ButtonStart.fontFamily = "Microsoft JhengHei";
            AdvancedTexture.addControl(ButtonMenu);
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


