"use strict";
var Bomb = (function () {
    function Bomb(game) {
        var _this = this;
        this.game = game;
        this.element = document.createElement("bomb");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.element.addEventListener("click", function () { _this.bombClickHandler(_this); });
        this.speed = Math.floor(Math.random() * (6 - 3) + 3);
        this.posy = Math.floor(Math.random() * (1000 - window.innerHeight) - window.innerHeight);
        this.posx = Math.floor(Math.random() * window.innerWidth);
    }
    Bomb.prototype.update = function () {
        if (this.posy >= window.innerHeight) {
            this.posy = Math.floor(Math.random() * (1000 - window.innerHeight) - window.innerHeight);
            this.posx = Math.floor(Math.random() * window.innerWidth);
            this.game.destroyBuilding();
        }
        else {
            this.posy += this.speed;
        }
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
    };
    Bomb.prototype.bombClickHandler = function (bombClicked) {
        bombClicked.posy = Math.floor(Math.random() * (1000 - window.innerHeight) - window.innerHeight);
        bombClicked.posx = Math.floor(Math.random() * window.innerWidth);
        this.game.scorePoint();
    };
    return Bomb;
}());
var Car = (function () {
    function Car(game) {
        var _this = this;
        this.game = game;
        this.element = document.createElement("car");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.element.addEventListener("click", function () { _this.carClickHandler(); });
        this.speed = 5;
        this.posx = Math.floor(Math.random() * (-15000 - 4000) - 4000);
        this.posy = 550;
    }
    Car.prototype.update = function () {
        if (this.posx >= window.innerWidth) {
            this.posx = Math.floor(Math.random() * (-15000 - 4000) - 4000);
            this.speed = 5;
        }
        else {
            this.posx += this.speed;
            this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
        }
    };
    Car.prototype.carClickHandler = function () {
        this.game.resetBuilding();
        this.speed += 20;
    };
    return Car;
}());
var Game = (function () {
    function Game() {
        this.score = 0;
        this.destroyed = 0;
        this.bombArray = [];
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.statusbarPos = 0;
        this.createBombs();
        this.car = new Car(this);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.destroyed == 4) {
            console.log("Game over!");
        }
        else {
            this.car.update();
            for (var _i = 0, _a = this.bombArray; _i < _a.length; _i++) {
                var b = _a[_i];
                b.update();
            }
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Game.prototype.createBombs = function () {
        for (var i = 0; i < 4; i++) {
            this.bombArray.push(new Bomb(this));
        }
    };
    Game.prototype.destroyBuilding = function () {
        this.destroyed++;
        this.statusbarPos -= 72;
        this.statusbar.style.backgroundPositionX = this.statusbarPos + "px";
        console.log("buildings destroyed " + this.destroyed);
    };
    Game.prototype.resetBuilding = function () {
        this.destroyed = 0;
        this.statusbarPos = 0;
        this.statusbar.style.backgroundPositionX = this.statusbarPos + "px";
    };
    Game.prototype.scorePoint = function () {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    };
    return Game;
}());
window.addEventListener("load", function () {
    new Game();
});
//# sourceMappingURL=main.js.map