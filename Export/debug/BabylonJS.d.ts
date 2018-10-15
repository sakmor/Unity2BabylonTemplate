declare module PROJECT {
    class GameMesterComponent extends BABYLON.MeshComponent {
        constructor(owner: BABYLON.AbstractMesh, scene: BABYLON.Scene, tick?: boolean, propertyBag?: any);
        protected ready(): void;
        protected start(): void;
        protected randomIntFromInterval(min: any, max: any): number;
        protected update(): void;
        private GameCounDown;
        private GameMenu;
        private GameTimesUp;
        private GamePlaying;
        protected textUpdate(): void;
        protected timeCountDown(): void;
        protected after(): void;
        protected destroy(): void;
        protected resetGame(): void;
        protected startCountdown(): void;
        protected createGUI(): void;
        protected deviceMotion(): void;
    }
}
