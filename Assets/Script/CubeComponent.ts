/* Babylon Mesh Component Template */

module PROJECT {
	export class CubeComponent extends BABYLON.MeshComponent {
		public constructor(owner: BABYLON.AbstractMesh, scene: BABYLON.Scene, tick: boolean = true, propertyBag: any = {}) {
			super(owner, scene, tick, propertyBag);
		}

		protected ready(): void {
			// Scene execute when ready
			console.log(this.getProperty('hello'));
		}

		protected start(): void {
			// Start component function

		}

		protected update(): void {
			// Update render loop function
			this.mesh.position.y += 0.1
		}

		protected after(): void {
			// After render loop function
		}

		protected destroy(): void {
			// Destroy component function
		}
	}
}