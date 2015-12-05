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


var gameBoard = d3.select('.container').append('svg:svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height);


var enemies = _(_.range(0, gameOptions.nEnemies))
                 .map(function(value, i){ 
                   return {
                            id: value,
                             x: Math.random()*100,
                             y: Math.random()*100,
                        height: 10,
                         width: 10,
                         color: 'MIDNIGHTBLUE'
                          };
                 });



gameBoard.selectAll('svg')
         .data(enemies)
         .enter()
         .append('svg:circle')
         .attr('r', function(d){return d.height})
         .attr('cx', function(d){return d.x})
         .attr('cy', function(d){return d.y})
         .attr('fill', function(d){return d.color})



// d3 select our svg
  // call data with our enemies
  // call enter
  // append circles/squares
  // set attr for height/width/fill
  // set attr for x,y and provide function that returns {}.x {}.y