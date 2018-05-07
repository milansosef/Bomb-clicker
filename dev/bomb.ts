/// <reference path="./gameObject" />

class Bomb extends GameObject {
	private speed:number
        
    constructor() {
		super("bomb")
		
		this.speed = Math.floor(Math.random() * (6 - 3) + 3)
        this.posy = Math.floor(Math.random() * (1000 - window.innerHeight) - window.innerHeight)
        this.posx = Math.floor(Math.random() * window.innerWidth)
    }

    public update():void {
		super.update()
		if(this.posy >= window.innerHeight) {
			this.posy = Math.floor(Math.random() * (1000 - window.innerHeight) - window.innerHeight)
			this.posx = Math.floor(Math.random() * window.innerWidth)
			let game = Game.getInstance()
			game.destroyBuilding()
		}
		this.posy += this.speed
	}

	public removeMe() {
		this.element.remove()
	}
}