
/* Babylon Scene Controller Template */

module PROJECT {
    var AdvancedTexture: BABYLON.GUI.AdvancedDynamicTexture;
    var Text1: BABYLON.GUI.TextBlock, Text2: BABYLON.GUI.TextBlock, GameTimeText: BABYLON.GUI.TextBlock, CountDownText: BABYLON.GUI.TextBlock;
    var ButtonStart: BABYLON.GUI.Button, ButtonMenu: BABYLON.GUI.Button;
    var OrientationX, OrientationY, OrientationZ;
    var MotionX, MotionY, MotionZ;
    var GameTime: number;
    var GameBeginTimeLong: number;
    var GameState: enumGameState;
    var TargetOrientationX, TargetOrientationY, TargetOrientationZ;

    enum enumGameState {
        GameMenu,
        GameCountDown,
        GamePlaying,
        GameTimesUp
    }

    export class GameMesterComponent extends BABYLON.MeshComponent {
        public constructor(owner: BABYLON.AbstractMesh, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
            super(owner, scene, tick, propertyBag);
        }

        protected ready(): void {
            // Scene execute when ready
        }

        protected start(): void {
            GameState = enumGameState.GameMenu;
            GameBeginTimeLong = 10;

            this.createGUI();
            this.deviceMotion();
            this.resetGame();
        }

        protected randomIntFromInterval(min, max): number // min and max included
        {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        protected update(): void {


            this.GameMenu();
            this.GameCounDown();
            this.GamePlaying();
            this.GameTimesUp();
        }
        private GameCounDown(): void {
            if (GameState != enumGameState.GameCountDown) return;
            Text1.isVisible = false;
        }

        private GameMenu(): void {
            if (GameState != enumGameState.GameMenu) return;
            this.textUpdate();
            GameTimeText.isVisible = false;
            Text1.isVisible = true;
            Text2.isVisible = false;

        }
        private GameTimesUp(): void {
            if (GameState != enumGameState.GameTimesUp) return;
            GameTimeText.text = "時間到!"
            Text2.isVisible = false;

        }
        private GamePlaying(): void {
            if (GameState != enumGameState.GamePlaying) return;
            Text2.isVisible = true;
            GameTimeText.isVisible = true;
            this.timeCountDown();


        }

        protected textUpdate(): void {
            var t: string = (GameTime * 0.001).toFixed(1);

            Text1.text =
                '\n' +
                "Gyroscope (" + OrientationX + " ," + OrientationY + " ," + OrientationZ + ")" +
                '\n' + "Accelerometer (" + MotionX + " ," + MotionY + " ," + MotionZ + ")";

            Text2.text =
                "Gyroscope (" + TargetOrientationX + " ," + TargetOrientationY + " ," + TargetOrientationZ + ")";

            if (GameTime == 0) { GameTimeText.isVisible = false; } else { GameTimeText.text = "遊戲時間：" + t; }
        }

        protected timeCountDown(): void {

            if (GameTime > 0) {
                GameTime -= this.engine.getDeltaTime();
                return;
            }
            GameTimeText.text = "時間到 !"
            GameState = enumGameState.GameTimesUp;

        }


        protected after(): void {
            // After render loop function
        }

        protected destroy(): void {
            // Destroy component function
        }

        protected resetGame(): void {
            GameTime = GameBeginTimeLong * 1000;
            TargetOrientationX = this.randomIntFromInterval(-360, 360);
            TargetOrientationY = this.randomIntFromInterval(-360, 360);
            TargetOrientationZ = this.randomIntFromInterval(-360, 360);
        }

        protected startCountdown(): void {
            GameState = enumGameState.GameCountDown;
            CountDownText.isVisible = true;
            Text1.isVisible = false;
            CountDownText.text = "3";
            var counter = 3

            var interval = setInterval(() => {
                counter--;
                CountDownText.text = counter.toString();
                if (counter == 0) {
                    CountDownText.text = " Start !"
                    CountDownText.color = "yellow";
                }
                if (counter < 0) {
                    clearInterval(interval);
                    CountDownText.isVisible = false;
                    GameState = enumGameState.GamePlaying;
                };
            }, 1000);
        };

        protected createGUI(): void {
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

            ButtonStart = BABYLON.GUI.Button.CreateSimpleButton("ButtonStart", "開始遊戲")
            ButtonStart.width = 0.2;
            ButtonStart.height = "40px";
            ButtonStart.color = "white";
            ButtonStart.background = "green";
            ButtonStart.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            ButtonStart.onPointerUpObservable.add(this.startCountdown);

            ButtonStart.fontFamily = "Microsoft JhengHei";
            AdvancedTexture.addControl(ButtonStart);

            ButtonMenu = BABYLON.GUI.Button.CreateSimpleButton("ButtonMenu", "返回目錄")
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

        }

        protected deviceMotion(): void {
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

        }
    }
}