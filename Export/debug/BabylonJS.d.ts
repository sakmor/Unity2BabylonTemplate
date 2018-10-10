declare module PROJECT {
    class GameMesterComponent extends BABYLON.MeshComponent {
        constructor(owner: BABYLON.AbstractMesh, scene: BABYLON.Scene, tick?: boolean, propertyBag?: any);
        protected ready(): void;
        protected start(): void;
        protected update(): void;
        private textUpdate;
        protected timeCountDown(): void;
        protected after(): void;
        protected destroy(): void;
        protected resetGame(): void;
        protected buttonDownFunction(): void;
        protected startCountdown(): void;
        protected createGUI(): void;
        protected deviceMotion(): void;
    }
}
