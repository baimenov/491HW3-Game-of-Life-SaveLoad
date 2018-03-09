var socket = io.connect("http://24.16.255.56:8888");

function Grid(game) {
	this.game = game;
	this.matrix = new Array(100);
	this.nextMatrix = new Array(100);
	this.loaded = false;
	this.dim = 100;
	
	for (var i = 0; i < this.matrix.length; i++) {
		this.matrix[i] = new Array(100);
		this.nextMatrix[i] = new Array(100);
	}
	for (var i = 0; i < this.matrix.length; i++) {
		for (var j = 0; j < this.matrix[i].length; j++) {
			this.matrix[i][j] = new Cell(this.game, i, j, 10);
			this.nextMatrix[i][j] = 0;
			this.game.addEntity(this.matrix[i][j]);
		}
	}
	Entity.call(this, game, 0, 0);
}

Grid.prototype = new Entity();
Grid.prototype.constructor = Grid;

var makeSpaceShip = function() {
	 var ss = new Array(11);
	for (var i = 0; i < ss.length; i++) {
		ss[i] = new Array(20);
	}
	for (var i = 0; i < 6; i++) {
		for (var j = 0; j < ss[i].length; j++) {
			if ((i === 0 && (j === 1 || j === 4)) ||
				(i === 1 && j === 0) ||
				(i === 2 && (j === 0 || j ===4)) ||
				(i === 3 && ((j >= 0 && j <= 3) || (j === 13 || j === 14))) ||
				(i === 4 && (j === 6 || j === 7 || j === 8 || j === 14 || j === 15)) ||
				(i === 5 && (j === 6 || j === 7 || j === 9 || j === 10 || j === 17 || j === 18 || j === 19))) {
				ss[i][j] = 1;
				ss[10 - i][j] = 1;
			} else {
				ss[i][j] = 0;
				ss[10 - i][j] = 0;
			}
		}
	}
	return ss;
}

Grid.prototype.update = function() {
	if (this.loaded) {
		for (var i = 0; i < this.matrix.length; i++) {
			for (var j = 0; j < this.matrix[i].length; j++) {
				var me = this.matrix[i][j];
				var neighs = this.countAliveNeighbors(me);
				if (neighs < 2 || neighs > 3) {
					this.nextMatrix[i][j] = 0;
				} else if ((me.isAlive === 1 && (neighs === 2 || neighs === 3)) ||
							me.isAlive === 0 && neighs === 3) {
					this.nextMatrix[i][j] = 1;
				}
			}
		}
		for (var i = 0; i < this.matrix.length; i++) {
			for (var j = 0; j < this.matrix[i].length; j++) {
				this.matrix[i][j].isAlive = this.nextMatrix[i][j];
			}
		}
	} else {
		if (this.game.click) {
			var x = Math.floor(this.game.click.x / 10);
			var y = Math.floor(this.game.click.y / 10);
			this.matrix[x][y].isAlive = this.matrix[x][y].isAlive === 1 ? 0 : 1;
			this.game.click = null;
		}
	}
}

Grid.prototype.draw = function(ctx) {
	for (var i = 0; i <= this.matrix.length; i++) {
		ctx.beginPath();
		ctx.lineWidth = 0.1;
		ctx.moveTo(i * 10, 0);
		ctx.lineTo(i * 10, 1000);
		ctx.stroke();
		ctx.moveTo(0, i * 10);
		ctx.lineTo(1000, i * 10);
		ctx.stroke();
	}
}

Grid.prototype.clear = function() {
	for (var i = 0; i < this.matrix.length; i++) {
		for (var j = 0; j < this.matrix[0].length; j++) {
			this.matrix[i][j].isAlive = 0;
			this.nextMatrix[i][j] = 0;
		}
	}
}

Grid.prototype.makeGosper = function() {
	for (var i = 0; i < this.matrix.length; i++) {
		for (var j = 0; j < this.matrix[i].length; j++) {
			if (i === 11) {
				if (j === 50) {
					this.matrix[j][i].isAlive = 1;
				} else {
					this.matrix[j][i].isAlive = 0;
				}
			} else if (i === 12) {
				if (j === 48 || j === 50) {
					this.matrix[j][i].isAlive = 1;
				} else {
					this.matrix[j][i].isAlive = 0;
				}
			} else if (i === 13) {
				if (j === 47 || j === 46 || j === 39
					|| j === 38 || j === 60 || j === 61) {
					this.matrix[j][i].isAlive = 1;
				} else {
					this.matrix[j][i].isAlive = 0;
				}
			} else if (i === 14) {
				if (j === 61 || j === 60 || j === 47 || j === 46
					|| j === 41 || j === 37) {
					this.matrix[j][i].isAlive = 1;
				} else {
					this.matrix[j][i].isAlive = 0;
				}
			} else if (i === 15) {
				if (j === 47 || j === 46 || j === 42 || j === 36
					|| j === 27 || j === 26) {
					this.matrix[j][i].isAlive = 1;
				} else {
					this.matrix[j][i].isAlive = 0;
				}
			} else if (i === 16) {
				if (j === 50 || j === 48 ||  j === 43 || j === 42
					|| j === 40 || j === 36 || j === 27 || j === 26) {
					this.matrix[j][i].isAlive = 1;
				} else {
					this.matrix[j][i].isAlive = 0;
				}
			} else if (i === 17) {
				if (j === 50 || j === 42 || j === 36) {
					this.matrix[j][i].isAlive = 1;
				} else {
					this.matrix[j][i].isAlive = 0;
				}
			} else if (i === 18) {
				if (j === 41 || j === 37) {
					this.matrix[j][i].isAlive = 1;
				} else {
					this.matrix[j][i].isAlive = 0;
				}
			} else if (i === 19) {
				if (j === 38 || j === 39) {
					this.matrix[j][i].isAlive = 1;
				} else {
					this.matrix[j][i].isAlive = 0;
				}
			} else {
				this.matrix[j][i].isAlive = 0;
			}
			this.nextMatrix[j][i] = this.matrix[j][i].isAlive;
		}
	}
}

Grid.prototype.randomize = function() {
	for (var i = 0; i < this.matrix.length; i++) {
		for (var j = 0; j < this.matrix[i].length; j++) {
			var next = Math.random();
			this.matrix[i][j].isAlive = next < 0.3 ? 1 : 0;
			this.nextMatrix[i][j] = this.matrix[i][j].isAlive;
		}
	}
}

Grid.prototype.countAliveNeighbors = function(me) {
	var result = 0;
	if (me.x === 0 && me.y === 0) {
		result += (this.matrix[me.x + 1][me.y + 1].isAlive +
					this.matrix[me.x + 1][me.y].isAlive + 
					this.matrix[me.x][me.y + 1].isAlive);

	} else if (me.x === this.dim - 1 && me.y === 0) {
		result += (this.matrix[me.x - 1][me.y].isAlive +
					this.matrix[me.x - 1][me.y + 1].isAlive +
					this.matrix[me.x][me.y + 1].isAlive);
	} else if (me.x === this.dim - 1 && me.y === this.dim - 1) {
		result += (this.matrix[me.x][me.y - 1].isAlive +
					this.matrix[me.x - 1][me.y - 1].isAlive +
					this.matrix[me.x - 1][me.y].isAlive);
	} else if (me.x === 0 && me.y === this.dim - 1) {
		result += (this.matrix[me.x][me.y - 1].isAlive +
					this.matrix[me.x + 1][me.y - 1].isAlive +
					this.matrix[me.x + 1][me.y].isAlive);
	} else if (me.x === 0) {
		result += (this.matrix[me.x][me.y - 1].isAlive +
					this.matrix[me.x + 1][me.y - 1].isAlive +
					this.matrix[me.x + 1][me.y].isAlive +
					this.matrix[me.x + 1][me.y + 1].isAlive + 
					this.matrix[me.x][me.y + 1].isAlive);
	} else if (me.x === this.dim - 1) {
		result += (this.matrix[me.x][me.y - 1].isAlive +
					this.matrix[me.x - 1][me.y - 1].isAlive +
					this.matrix[me.x - 1][me.y].isAlive +
					this.matrix[me.x - 1][me.y + 1].isAlive + 
					this.matrix[me.x][me.y + 1].isAlive);
	} else if (me.y === 0) {
		result += (this.matrix[me.x + 1][me.y].isAlive +
					this.matrix[me.x + 1][me.y + 1].isAlive +
					this.matrix[me.x][me.y + 1].isAlive +
					this.matrix[me.x - 1][me.y + 1].isAlive + 
					this.matrix[me.x - 1][me.y].isAlive);
	} else if (me.y === this.dim - 1) {
		result += (this.matrix[me.x + 1][me.y].isAlive +
					this.matrix[me.x + 1][me.y -1].isAlive +
					this.matrix[me.x][me.y - 1].isAlive +
					this.matrix[me.x - 1][me.y - 1].isAlive + 
					this.matrix[me.x - 1][me.y].isAlive);
	} else {
		
		result += (this.matrix[me.x + 1][me.y].isAlive +
					this.matrix[me.x + 1][me.y - 1].isAlive +
					this.matrix[me.x][me.y - 1].isAlive +
					this.matrix[me.x - 1][me.y - 1].isAlive + 
					this.matrix[me.x - 1][me.y].isAlive +
					this.matrix[me.x - 1][me.y + 1].isAlive +
					this.matrix[me.x][me.y + 1].isAlive +
					this.matrix[me.x + 1][me.y + 1].isAlive);
	}
	return result;
}

Grid.prototype.placeSetup = function(arr, x, y) {
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr[0].length; j++) {
			this.matrix[j + x][i + y].isAlive = arr[i][j];
		}
	}
}

Grid.prototype.returnCopy = function() {
	var arr = [];
	for (var i = 0 ; i < 100; i++) {
		arr.push(new Array(100));
	}
	for (var i = 0; i < 100; i++) {
		for (var j = 0; j < 100; j++) {
			arr[j][i] = this.matrix[i][j].isAlive;
		}
	}
	return arr;
}

function Cell(game, x, y, width) {
	//1 = alive = black
	//0 = dead  = white
	this.isAlive = 0;
	this.width = width;
	Entity.call(this, game, x, y);
}

Cell.prototype = new Entity();
Cell.prototype.constructor = Cell;

Cell.prototype.update = function() {

}

Cell.prototype.draw = function(ctx) {
	ctx.fillStyle = this.isAlive === 1 ? "black" : "white";

	ctx.fillRect(this.x * this.width, this.y * this.width, this.width, this.width);
	Entity.prototype.draw.call(this, ctx);
}

var makeCube = function(n) {
	if (n === '' || n < 1 || n > 100) {
		n = 40;
	}
	var cube = [];
	for (var i = 0; i < n; i++) {
		cube.push(new Array(n));
	}
	for (var i = 0; i < cube.length; i++) {
		for (var j = 0; j < n; j++) {
			cube[i][j] = 1;
		}
	}
	return cube;
}

//16x55
var gpa = function() {
	var result = ['11110100101000010000001110111101111011100111101111',
				  '10000100101000010000010000100101000010010011000110',
				  '10000100101000010000010000100101000010010011000110',
				  '11110100101000010000010000111101111010010011000110',
				  '10000100101000010000010000110001000010010011000110',
				  '10000100101000010000010000101001000010010011000110',
				  '10000111101111011110001110100101111011100111100110',
				  '00000000000000000000000000000000000000000000000000',
				  '00000000000000000000000000000000000000000000000000',
				  '11110100001111011110011101111000000000000000000000',
				  '10010100001000010010100001000000000000000000000000',
				  '10010100001000010010100001000000000000000000000000',
				  '11110100001111011110011001111000000000000000000000',
				  '10000100001000010010000101000000000000000000000000',
				  '10000100001000010010000101000000000000000000000000',
				  '10000111101111010010111001111000000000000000000000'];

	var arr = new Array(result.length);
	for (var i = 0; i < result.length; i++) {
		arr[i] = new Array(result[i].length);
	}
	for (var i = 0; i < result.length; i++) {
		for (var j = 0; j < result[i].length; j++) {
			arr[i][j] = result[i].charAt(j) === '1' ? 1 : 0;
		}
	}
	return arr;
}

var AM = new AssetManager();
AM.queueDownload("./img/ezPepe.jpg");

AM.downloadAll(function() {
	var canvas = document.getElementById('gameWorld');
	var startButton = document.getElementById("startButton");
	var clearButton = document.getElementById("clearButton");
	var gosperButton = document.getElementById("gosperButton");
	var randomButton = document.getElementById("randomButton");
	var spaceshipButton = document.getElementById("spaceshipButton");
	var cubeButton = document.getElementById("cubeButton");
	var lennyButton = document.getElementById("gpaButton");
	var saveButton = document.getElementById("saveButton");
	var loadButton = document.getElementById("loadButton");
	//var pauseButton = document.getElementById("pauseButton");



	socket.on("connect", function() {
		console.log("Socket connected!");
	});
	socket.on("disconnect", function () {
		console.log("Socket disconnected.")
	});
	socket.on("reconnect", function () {
		console.log("Socket reconnected.")
	});



	var sps = makeSpaceShip();

	var pls = gpa();

    var ctx = canvas.getContext('2d');

    var gameEngine = new GameEngine();
    var grid = new Grid(gameEngine, null);

    saveButton.addEventListener("click", function() {
    	var copy = grid.returnCopy();
		socket.emit("save", {
			matrix: copy,
			studentname: "Alisher Baimenov",
			statename : "name"
		});
	});

	loadButton.addEventListener("click", function() {
		socket.emit("load", {
			studentname: "Alisher Baimenov",
			statename: "name"
		});

		socket.on("load", function(obj) {
			grid.loaded = false;
			grid.clear();
			grid.placeSetup(obj.matrix, 0, 0);
		});
	});

    startButton.addEventListener("click", function () {
    	grid.loaded = grid.loaded ? false : true;
    	//startButton.disabled = true;
	}, false);

	clearButton.addEventListener("click", function() {
		grid.loaded = false;
		grid.clear();
		startButton.disabled = false;
	}, false);

	gosperButton.addEventListener("click", function() {
		grid.loaded = false;
		grid.makeGosper();
		startButton.disabled = false;
	}, false);

	randomButton.addEventListener("click", function() {
		grid.loaded = false;
		grid.randomize();
		startButton.disabled = false;
	}, false);

	spaceshipButton.addEventListener("click", function() {
		grid.loaded = false;
		grid.clear();
		grid.placeSetup(sps, 80, 20);
		grid.placeSetup(sps, 75, 35);
		grid.placeSetup(sps, 70, 50);
		grid.placeSetup(sps, 75, 65);
		grid.placeSetup(sps, 80, 80);
		startButton.disabled = false;
	}, false);

	cubeButton.addEventListener("click", function() {
		grid.loaded = false;
		grid.clear();
		var cub = makeCube(document.getElementById("cubeInput").value);
		var cubeSize = document.getElementById("cubeInput").value;
		if (cubeSize < 1 || cubeSize > 100 || cubeSize === '') {
			cubeSize = 40;
			document.getElementById("cubeInput").value = '40';
		}
		var starting = Math.floor((100 - cubeSize) / 2);
		grid.placeSetup(cub, starting, starting);
		startButton.disabled = false;
	}, false);

	lennyButton.addEventListener("click", function() {
		grid.loaded = false;
		grid.clear();
		grid.placeSetup(pls, 20, 20);
		startButton.disabled = false;
	}, false);

	/*pauseButton.addEventListener("click", function() {
		grid.loaded = grid.loaded ? false : true;
	});*/

    gameEngine.addEntity(grid);

  	console.log("Time to populate");
    gameEngine.init(ctx);
    gameEngine.start();
});