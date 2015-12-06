var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0,
  prevCollision: false
};

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]), 
  y: d3.scale.linear().domain([0,100]).range([0,gameOptions.height]) 
};

var gameBoard = d3.select('.container').append('svg:svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height);

var createEnemies = function () {
  return _(_.range(0, gameOptions.nEnemies))
            .map(function(value, i){ 
              return {
                       id: value,
                       cx: axes.x(Math.random() * 100),
                       cy: axes.y(Math.random() * 100),
                        r: 10,
                    color: 'MIDNIGHTBLUE'
                     };
            });
};


var createPlayer = function(){
  var player = {
    height: 30,
    width: 30,
    fill: 'red',
    x: axes.x(50),
    y: axes.y(50),
  };

  var drag = d3.behavior.drag()
               .on('dragstart', function(){ this.setAttribute('fill', 'green') })
               .on('drag', function(){ this.setAttribute('x', d3.event.x - player.height/2); this.setAttribute('y', d3.event.y - player.height/2) })
               .on('dragend', function(){ this.setAttribute('fill', 'red')  })

  gameBoard.selectAll('.player')
           .data([player])
           .enter()
           .append('svg:rect')
           .attr('class', 'player')
           .attr('height', player.height)
           .attr('width', player.width)
           .attr('fill', player.fill)
           .attr('x', player.x)
           .attr('y', player.y) 
           .call(drag);
};



var render = function(enemyData){
  var enemies = gameBoard.selectAll('.enemy')
                         .data(enemyData, function(d){return d.id;});

  enemies.enter()
         .append('svg:g')
         .attr('transform', function(d) { return 'translate(' + d.cx + ',' + d.cy + ') scale(.23,.23)'; })
         .attr('class', 'enemy')
         .append('svg:path')
         .attr('class', 'spin')
         .attr('d', 'm 0,-60 l 20,40 l 40,20 l -40,20 l -20,40 l -20,-40 l -40,-20 l 40,-20 z')
         .attr('r', function(d){return d.r})
         .attr('cx', function(d){return d.cx})
         .attr('cy', function(d){return d.cy})
         .attr('fill', function(d){return d.color});

  enemies.transition()
         .attr('transform', function(d) { return 'translate(' + d.cx + ',' + d.cy + ') scale(.23,.23)'; })
         .duration(2000);

  enemies.exit()
         .remove();
};

var checkAllCollisions = function () {
  var enemies = gameBoard.selectAll('.enemy');
  var player = gameBoard.select('.player');
  var collision = false;

  var checkCollision = function (enemy) {
    var radiusSum = enemy.r + player.attr('width') / 2;
    var xDiff = Math.abs(enemy.cx - (Number(player.attr('x')) + 15)) +2;
    var yDiff = Math.abs(enemy.cy - (Number(player.attr('y')) + 15)) +2;
    
    if(xDiff < radiusSum && yDiff < radiusSum) {
      collision = true;
    }
  };
  
  enemies.each(checkCollision);

  if(collision){
    console.log('Collision!');
    
    if(collision != gameStats.prevCollision){
      gameStats.collisions++;  
      d3.selectAll('.collisions span').text(gameStats.collisions);
    }

    gameStats.bestScore = Math.max(gameStats.score, gameStats.bestScore);
    gameStats.score = 0;
    d3.selectAll('.current span').text(0);
    d3.selectAll('.high span').text(gameStats.bestScore);
  }
  gameStats.prevCollision = collision;
};

var gameTurn = function(){
  render(createEnemies());
  d3.selectAll('.current span').text(gameStats.score++);
};

createPlayer();
setInterval( gameTurn , 2000);
d3.timer(checkAllCollisions);
