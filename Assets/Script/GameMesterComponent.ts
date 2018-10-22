/* Babylon Scene Controller Template */

module PROJECT {
	var UpSound: BABYLON.Sound;
	var AdvancedTexture;
	var DeviceText: BABYLON.GUI.TextBlock, ScoreText: BABYLON.GUI.TextBlock, TargetText: BABYLON.GUI.TextBlock, DiffValueText: BABYLON.GUI.TextBlock, CameraDirText: BABYLON.GUI.TextBlock;
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

		}

		protected update(): void {
			// Update render loop function
			DeviceText.text = "陀螺儀 = X:" + OrientationX + " Y:" + OrientationY + " Z:" + OrientationZ + '\n' + "加速器 = X:" + MotionX + " Y:" + MotionY + " Z:" + MotionZ;

			//檢查數值是否正確
			this.TargetVector3Checker();


		}

		protected TargetVector3Checker(): void {
			var valueDiff: number;
			var Orientation = new BABYLON.Vector3(OrientationX, OrientationY, OrientationZ);
			valueDiff = Math.round(BABYLON.Vector3.Distance(Orientation, TargetVector3));

			DiffValueText.text = "距離:" + valueDiff.toString() + '\n' + "分數:" + Score;
			if (valueDiff < 25) {
				Score += 1;
				ScoreText.text = Score.toString();

				var x = Math.floor(Math.random() * 128) - 0;
				var y = Math.floor(Math.random() * 128) - 0;
				var z = Math.floor(Math.random() * 128) - 0;
				TargetVector3 = new BABYLON.Vector3(x, y, z);
				TargetText.text = TargetVector3.toString();
				UpSound.play();
				// navigator.vibrate(1000);
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