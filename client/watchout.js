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
           .attr('height', player.height)
           .attr('width', player.width)
           .attr('fill', player.fill)
           .attr('x', player.x)
           .attr('y', player.y) 
           .call(drag)
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
createPlayer();


/*

TESTING STUFF


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
