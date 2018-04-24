class Car {
    private game:Game
	private element: HTMLElement
	private speed:number
    private posx:number
    private posy:number
        
    constructor(game:Game) {
		this.game = game;
        this.element = document.createElement("car")
        let foreground = document.getElementsByTagName("foreground")[0]
		foreground.appendChild(this.element);
		
		this.element.addEventListener("click", () => {this.carClickHandler()})
		
		this.speed = 5
        this.posx = Math.floor(Math.random() * (-15000 - 4000) - 4000)
        this.posy = 550
    }

    public update():void {
		if(this.posx >= window.innerWidth){
			this.posx = Math.floor(Math.random() * (-15000 - 4000) - 4000)
			this.speed = 5
		} else {
			this.posx += this.speed
			this.element.style.transform = `translate(${this.posx}px, ${this.posy}px)`
		}
	}
	
	private carClickHandler():void {
		this.game.resetBuilding()
		this.speed += 20 
	}

}