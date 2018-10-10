
/* Babylon Scene Controller Template */

module PROJECT {
    var AdvancedTexture: BABYLON.GUI.AdvancedDynamicTexture;
    var Text1: BABYLON.GUI.TextBlock, GameTimeText: BABYLON.GUI.TextBlock, Button: BABYLON.GUI.Button, CountDownText: BABYLON.GUI.TextBlock;
    var OrientationX, OrientationY, OrientationZ;
    var MotionX, MotionY, MotionZ;
    var GameTime: number;
    var IsGamePlaying: boolean;
    var GameBeginTimeLong: number;

    export class GameMesterComponent extends BABYLON.MeshComponent {
        public constructor(owner: BABYLON.AbstractMesh, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
            super(owner, scene, tick, propertyBag);
        }

        protected ready(): void {
            // Scene execute when ready
        }

        protected start(): void {
            IsGamePlaying = false;
            GameBeginTimeLong = 10;
            this.resetGame();
            this.createGUI();
            this.deviceMotion();

        }

        protected update(): void {

            this.textUpdate();
            this.timeCountDown();
        }

        private textUpdate(): void {
            var t: string = (GameTime * 0.001).toFixed(1);

            Text1.text =
                '\n' +
                "Gyroscope (" + OrientationX + " ," + OrientationY + " ," + OrientationZ + ")" +
                '\n' + "Accelerometer (" + MotionX + " ," + MotionY + " ," + MotionZ + ")";

            if (GameTime == 0) { GameTimeText.isVisible = false; } else { GameTimeText.text = "遊戲時間：" + t; }
        }

        protected timeCountDown(): void {
            if (GameTime <= 0) {
                GameTimeText.text = "時間到 !"
                IsGamePlaying = false;
                return;
            }
            if (IsGamePlaying == false) { this.resetGame(); return; }
            GameTime -= this.engine.getDeltaTime();
        }

        protected after(): void {
            // After render loop function
        }

        protected destroy(): void {
            // Destroy component function
        }

        protected resetGame(): void {
            GameTime = GameBeginTimeLong * 1000;

        }
        protected buttonDownFunction(): void {
            console.log("buttonDownFunction");

            if (IsGamePlaying) this.resetGame();

        }
        protected startCountdown(): void {
            CountDownText.isVisible = true;
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

                    // The code here will run when
                    // the timer has reached zero.

                    clearInterval(interval);
                    CountDownText.isVisible = false;
                    IsGamePlaying = true;
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

            Button = BABYLON.GUI.Button.CreateSimpleButton("Button", "開始遊戲")
            Button.width = 0.2;
            Button.height = "40px";
            Button.color = "white";
            Button.background = "green";
            Button.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            Button.onPointerUpObservable.add(this.startCountdown);
            Button.onPointerUpObservable.add(this.resetGame);

            Button.fontFamily = "Microsoft JhengHei";
            AdvancedTexture.addControl(Button);

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