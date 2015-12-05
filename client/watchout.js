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
                        x: axes.x(Math.random()*100),
                        y: axes.y(Math.random()*100),
                   height: 10,
                    color: 'MIDNIGHTBLUE'
                     };
            });
 
};


var render = function(enemyData){

  var enemies = gameBoard.selectAll('.enemy')
                         .data(enemyData, function(d){return d.id;});

  enemies.enter()
         .append('svg:circle')
         .attr('class', 'enemy')
         .attr('r', function(d){return d.height})
         .attr('cx', function(d){return d.x})
         .attr('cy', function(d){return d.y})
         .attr('fill', function(d){return d.color});

  enemies.transition()
         .attr('cx', function(d){return d.x})
         .attr('cy', function(d){return d.y})
         .duration(2000);

  enemies.exit()
         .remove();

};


setInterval( function(){ render(createEnemies()) } , 2000);





// d3 select our svg
  // call data with our enemies
  // call enter
  // append circles/squares
  // set attr for height/width/fill
  // set attr for x,y and provide function that returns {}.x {}.y