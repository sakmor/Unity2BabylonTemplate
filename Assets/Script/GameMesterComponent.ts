/* Babylon Scene Controller Template */

module PROJECT {
    var AdvancedTexture;
    var Text1: BABYLON.GUI.TextBlock, Text2: BABYLON.GUI.TextBlock, TargetText: BABYLON.GUI.TextBlock, DiffValueText: BABYLON.GUI.TextBlock, CameraDirText: BABYLON.GUI.TextBlock;
    var TargetVector3: BABYLON.Vector3;
    var Score: number;
    var OrientationX: number, OrientationY: number, OrientationZ: number;
    var MotionX, MotionY, MotionZ;

    export class GameMesterComponent extends BABYLON.MeshComponent {
        public constructor(owner: BABYLON.AbstractMesh, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
            super(owner, scene, tick, propertyBag);
        }

        protected ready(): void {
            // Scene execute when ready
        }

        protected start(): void {
            // Start component function
            Score = 0;

            // GUI
            this.createGUI();
            this.deviceMotion();

            // 建立目標數值與文字
            TargetVector3 = new BABYLON.Vector3(30, 30, 30);
            TargetText.text = TargetVector3.toString();

        }

        protected update(): void {
            // Update render loop function
            Text1.text = "陀螺儀 = X:" + OrientationX + " Y:" + OrientationY + " Z:" + OrientationZ + '\n' + "加速器 = X:" + MotionX + " Y:" + MotionY + " Z:" + MotionZ;

            //檢查數值是否正確
            this.TargetVector3Checker();


        }

        protected TargetVector3Checker(): void {
            var valueDiff: number;
            valueDiff = 0;
            valueDiff += Math.abs(OrientationX - TargetVector3.x);
            valueDiff += Math.abs(OrientationY - TargetVector3.y);
            valueDiff += Math.abs(OrientationZ - TargetVector3.z);


            DiffValueText.text = valueDiff.toString();
            if (valueDiff < 20) {
                Score += 1;
                Text2.text = Score.toString();

                var x = Math.floor(Math.random() * 180) - 0;
                var y = Math.floor(Math.random() * 180) - 0;
                var z = Math.floor(Math.random() * 180) - 0;
                TargetVector3 = new BABYLON.Vector3(x, y, z);
                TargetText.text = TargetVector3.toString();
            }
        }
        protected after(): void {
            // After render loop function
        }

        protected destroy(): void {
            // Destroy component function
        }

        protected createGUI(): void {
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


            Text2 = new BABYLON.GUI.TextBlock();
            Text2.color = "white";
            Text2.fontSize = 64;
            Text2.resizeToFit = true;
            Text2.outlineWidth = 5;
            Text2.outlineColor = "black";
            Text2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
            Text2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
            AdvancedTexture.addControl(Text2);
            Text2.text = Score.toString();

            TargetText = new BABYLON.GUI.TextBlock();
            TargetText.color = "white";
            TargetText.fontSize = 64;
            TargetText.resizeToFit = true;
            TargetText.outlineWidth = 5;
            TargetText.outlineColor = "green";
            TargetText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            TargetText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
            AdvancedTexture.addControl(TargetText);
            TargetText.text = Score.toString();

            DiffValueText = new BABYLON.GUI.TextBlock();
            DiffValueText.color = "white";
            DiffValueText.fontSize = 64;
            DiffValueText.resizeToFit = true;
            DiffValueText.outlineWidth = 5;
            DiffValueText.outlineColor = "black";
            DiffValueText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
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