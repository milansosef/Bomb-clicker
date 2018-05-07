/// <reference path="./gameObject" />

class Bomb extends GameObject {
	private game:Game;
	private speed:number
    private posy:number
    private posx:number
        
    constructor() {
		super("bomb")
		this.game = Game.getInstance()
		
		this.element.addEventListener("click", () => {this.bombClickHandler(this)})
		
		this.speed = Math.floor(Math.random() * (6 - 3) + 3)
        this.posy = Math.floor(Math.random() * (1000 - window.innerHeight) - window.innerHeight)
        this.posx = Math.floor(Math.random() * window.innerWidth)
    }

    public update():void {
		if(this.posy >= window.innerHeight) {
			this.posy = Math.floor(Math.random() * (1000 - window.innerHeight) - window.innerHeight)
			this.posx = Math.floor(Math.random() * window.innerWidth)
			this.game.destroyBuilding()
		} else {
			this.posy += this.speed
		}
		this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
	}
	
	private bombClickHandler(bombClicked:any):void {
		bombClicked.posy = Math.floor(Math.random() * (1000 - window.innerHeight) - window.innerHeight)
		bombClicked.posx = Math.floor(Math.random() * window.innerWidth)

		this.game.scorePoint()
	}
}