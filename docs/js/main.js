"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(element) {
        this.element = document.createElement(element);
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
    }
    return GameObject;
}());
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        var _this = _super.call(this, "bomb") || this;
        _this.game = Game.getInstance();
        _this.element.addEventListener("click", function () { _this.bombClickHandler(_this); });
        _this.speed = Math.floor(Math.random() * (6 - 3) + 3);
        _this.posy = Math.floor(Math.random() * (1000 - window.innerHeight) - window.innerHeight);
        _this.posx = Math.floor(Math.random() * window.innerWidth);
        return _this;
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
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this, "Car") || this;
        _this.game = Game.getInstance();
        _this.element.addEventListener("click", function () { _this.carClickHandler(); });
        _this.speed = 5;
        _this.posx = Math.floor(Math.random() * (-15000 - 4000) - 4000);
        _this.posy = 550;
        return _this;
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
}(GameObject));
var Game = (function () {
    function Game() {
        this.score = 0;
        this.destroyed = 0;
        this.bombArray = [];
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.statusbarPos = 0;
        this.createBombs();
        this.car = new Car();
        this.gameLoop();
    }
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
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
            this.bombArray.push(new Bomb());
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
    Game.getInstance();
});
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function () {
        console.log("Static method uitgevoerd");
    };
    return Util;
}());
//# sourceMappingURL=main.js.map