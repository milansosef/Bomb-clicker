class Game {
	private static instance: Game
    private score:number = 0
    private destroyed:number = 0
    private textfield:HTMLElement
	private statusbar:HTMLElement
	private statusbarPos:number
	private bombArray:Array<Bomb> = []
	public car:Car
    
    private constructor() {
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement
		this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement
		this.statusbarPos = 0
		
		this.createBombs()
		this.car = new Car()

        this.gameLoop()
	}
	
	public static getInstance() {
		if (! Game.instance) {
			Game.instance = new Game()
		}
		return Game.instance
	}
    
    // timer for bombs
    private gameLoop():void {
		this.car.update()
		for (let b of this.bombArray) {
			b.update()
		}
		this.checkBombHitCar()
		
		if(this.destroyed == 4) {
			console.log("Game over!")
		} else {
			requestAnimationFrame(() => this.gameLoop())
		}
	}
	
	private createBombs():void {
		for(let i = 0; i < 4; i++) {
			this.bombArray.push(new Bomb())
		}
	}

	private checkBombHitCar() {
		let carRect = this.car.getRect()
		for (let b of this.bombArray) {
			let bombRect = b.getRect()
			if(Util.checkCollision(bombRect, carRect)) {
				this.scorePoint()

				let i = this.bombArray.indexOf(b)
				this.bombArray.splice(i, 1)
				b.removeMe()

				this.bombArray.push(new Bomb())
			}
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
	Game.getInstance()
});