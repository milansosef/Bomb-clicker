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
    function GameObject(e) {
        this.element = document.createElement(e);
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        this.posy = 0;
        this.posx = 0;
    }
    GameObject.prototype.getRect = function () {
        return this.element.getBoundingClientRect();
    };
    GameObject.prototype.update = function () {
        this.element.style.transform = "translate(" + this.posx + "px, " + this.posy + "px)";
    };
    return GameObject;
}());
var Bomb = (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        var _this = _super.call(this, "bomb") || this;
        _this.speed = Math.floor(Math.random() * (6 - 3) + 3);
        _this.posy = Math.floor(Math.random() * (1000 - window.innerHeight) - window.innerHeight);
        _this.posx = Math.floor(Math.random() * window.innerWidth);
        return _this;
    }
    Bomb.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.posy >= window.innerHeight) {
            this.posy = Math.floor(Math.random() * (1000 - window.innerHeight) - window.innerHeight);
            this.posx = Math.floor(Math.random() * window.innerWidth);
            var game = Game.getInstance();
            game.destroyBuilding();
        }
        this.posy += this.speed;
    };
    Bomb.prototype.removeMe = function () {
        this.element.remove();
    };
    return Bomb;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        var _this = _super.call(this, "Car") || this;
        _this.leftSpeed = 0;
        _this.rightSpeed = 0;
        _this.posx = 0;
        _this.posy = 550;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Car.prototype.update = function () {
        _super.prototype.update.call(this);
        this.posx += this.rightSpeed;
        this.posx -= this.leftSpeed;
    };
    Car.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 87:
                this.leftSpeed = 5;
                break;
            case 83:
                this.rightSpeed = 5;
                break;
        }
    };
    Car.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 87:
                this.leftSpeed = 0;
                break;
            case 83:
                this.rightSpeed = 0;
                break;
        }
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
        this.car.update();
        for (var _i = 0, _a = this.bombArray; _i < _a.length; _i++) {
            var b = _a[_i];
            b.update();
        }
        this.checkBombHitCar();
        if (this.destroyed == 4) {
            console.log("Game over!");
        }
        else {
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Game.prototype.createBombs = function () {
        for (var i = 0; i < 4; i++) {
            this.bombArray.push(new Bomb());
        }
    };
    Game.prototype.checkBombHitCar = function () {
        var carRect = this.car.getRect();
        for (var _i = 0, _a = this.bombArray; _i < _a.length; _i++) {
            var b = _a[_i];
            var bombRect = b.getRect();
            if (Util.checkCollision(bombRect, carRect)) {
                this.scorePoint();
                var i = this.bombArray.indexOf(b);
                this.bombArray.splice(i, 1);
                b.removeMe();
                this.bombArray.push(new Bomb());
            }
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
    Util.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Util;
}());
//# sourceMappingURL=main.js.map