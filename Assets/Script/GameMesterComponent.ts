/* Babylon Scene Controller Template */

module PROJECT {
    var AdvancedTexture;
    var Text1;
    var OrientationX, OrientationY, OrientationZ;
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

            // GUI
            this.createGUI();
            this.deviceMotion();

        }

        protected update(): void {
            // Update render loop function
            Text1.text = "陀螺儀 = X:" + OrientationX + " Y:" + OrientationY + " Z:" + OrientationZ + '\n' + "加速器 = X:" + MotionX + " Y:" + MotionY + " Z:" + MotionZ;

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