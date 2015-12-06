// start slingin' some d3 here.

var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
  padding: 20
};

var gameStats = {
  score: 0,
  bestScore: 0,
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
         .append('svg:circle')
         .attr('class', 'enemy')
         .attr('r', function(d){return d.r})
         .attr('cx', function(d){return d.cx})
         .attr('cy', function(d){return d.cy})
         .attr('fill', function(d){return d.color});

  enemies.transition()
         .attr('cx', function(d){return d.cx})
         .attr('cy', function(d){return d.cy})
         .duration(2000);

  enemies.exit()
         .remove();

};

var checkAllCollisions = function () {
  var enemies = gameBoard.selectAll('.enemy');
  var player = gameBoard.select('.player');

  var checkCollision = function (enemy) {
    var radiusSum = enemy.r + player.attr('width') / 2;

    var xDiff = Math.abs(enemy.cx - (Number(player.attr('x')) + 15)) +2;
    var yDiff = Math.abs(enemy.cy - (Number(player.attr('y')) + 15)) +2;
    
    if(xDiff < radiusSum && yDiff < radiusSum){
      console.log('Collision!');
      gameStats.bestScore = Math.max(gameStats.score, gameStats.bestScore);
      gameStats.score = 0;
      d3.selectAll('.current span').text(0);
    }
  };
  
  enemies.each(checkCollision);

};


var gameTurn = function(){
 render(createEnemies());
 d3.selectAll('.current span').text(gameStats.score++);
};

d3.timer(checkAllCollisions);
setInterval( gameTurn , 2000);
createPlayer();


/*
















TESTING STUFF


<path d= transform="translate(50,120) scale(.23,.23)" style="stroke: rgb(0, 0, 255); fill: red;"></path>

var shuriken = gameBoard.selectAll('.star')
                .data([1])
                .enter()
                .append('svg:path')
                .attr('d', 'm 0,-60 l 20,40 l 40,20 l -40,20 l -20,40 l -20,-40 l -40,-20 l 40,-20 z')
                .attr('transform', 'translate(50,120) scale(.23,.23)')
                .attr('fill', 'red')


gameBoard.selectAll('.test')
          .data([1])
          .enter()
          .append('rect')
          .attr('height',30)
          .attr('width',30)
          .attr('fill','white')
          .attr('class','test')
          .attr('x',50)
          .attr('y',50)
          .call(drag)

gameBoard.selectAll('.test').  ...


var drag = d3.behavior.drag()  
             .on('dragstart', function(d) { this.setAttribute('fill', 'red'); })
             .on('drag', function(d) {     this.setAttribute('x', d3.event.x)
                                           this.setAttribute('y', d3.event.y); })
             .on('dragend', function(e) { this.setAttribute('fill', 'black'); });


var circle = box.selectAll('.test')  
                .data([{ x:  , y: axes.y(Math.random()*100)}])
                .enter()
                .append('svg:circle')
                .attr('class', 'draggableCircle')
                .attr('cx', function(d) { return d.x; })
                .attr('cy', function(d) { return d.y; })
                .attr('r', function(d) { return d.r; })
                
                .style('fill', 'black');




*/
