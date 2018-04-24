class Game {
    private score:number = 0
    private destroyed:number = 0
    private textfield:HTMLElement
	private statusbar:HTMLElement
	private statusbarPos:number
	private bombArray:Array<Bomb> = []
	private car:Car
    
    constructor() {
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement
		this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement
		this.statusbarPos = 0
		
		this.createBombs()
		this.car = new Car(this)

        this.gameLoop()
    }
    
    // timer for bombs
    private gameLoop():void {
		// console.log("updating the game")
		if(this.destroyed == 4) {
			console.log("Game over!")
		} else {
			this.car.update()
			for (let b of this.bombArray) {
				b.update()
			}
			requestAnimationFrame(() => this.gameLoop())
		}
	}
	
	private createBombs():void {
		for(let i = 0; i < 4; i++) {
			this.bombArray.push(new Bomb(this))
		}
	}

    public destroyBuilding(){
		this.destroyed ++
		this.statusbarPos -= 72
		this.statusbar.style.backgroundPositionX = this.statusbarPos + "px"

        console.log("buildings destroyed " + this.destroyed)
	}
	
	public resetBuilding():void {
		this.destroyed = 0
		this.statusbarPos = 0
		this.statusbar.style.backgroundPositionX = this.statusbarPos + "px"
	}
       
    public scorePoint() {
        this.score ++
        this.textfield.innerHTML = "Score: " + this.score
    }
} 

window.addEventListener("load", () => {
    new Game();
});