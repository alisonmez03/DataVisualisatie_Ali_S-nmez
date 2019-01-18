
// GROUPS POKEMON TYPE (id):  0 Water | 1: Grass | 2: Fire
// GROUPS POKEMON (r):  Attack power pokemon
var data = [
  {"id": 0, "name": "Squirtle", "r": 48 },
  {"id": 0, "name": "Wartortle", "r": 63 },
  {"id": 0, "name": "Blastoise", "r": 83 },
  {"id": 0, "name": "BlastoiseMega", "r": 103 },
  {"id": 0, "name": "Psyduck", "r": 52 },
  {"id": 0, "name": "Golduck", "r": 82 },
  {"id": 0, "name": "Poliwag", "r": 50 },
  {"id": 0, "name": "Poliwhirl", "r": 65 },

  {"id": 1, "name": "Bulbasaur", "r": 49 },
  {"id": 1, "name": "Ivysaur", "r": 62 },
  {"id": 1, "name": "Venusaur", "r": 82 },
  {"id": 1, "name": "VenusaurMega", "r": 100 },
  {"id": 1, "name": "Bellsprout", "r": 75 },
  {"id": 1, "name": "Weepinbell", "r": 90 },
  {"id": 1, "name": "Victreebel", "r": 105 },
  {"id": 1, "name": "Tangela", "r": 55 },

  {"id": 2, "name": "Charmander", "r": 52 },
  {"id": 2, "name": "Charmeleon", "r": 64 },
  {"id": 2, "name": "Charizard", "r": 84 },
  {"id": 2, "name": "Charizard X", "r": 130 },
  {"id": 2, "name": "Charizard Y", "r": 104 },
  {"id": 2, "name": "Vulpix", "r": 41 },
  {"id": 2, "name": "Ninetales", "r": 76 },
];

var width = window.innerWidth,
    height = 450;

var fill = d3.scale.category10();

var nodes = [], labels = [],
    foci = [{x: 0, y: 150}, {x: 350, y: 150}, {x: 200, y: 150}];

var svg = d3.select("body").append("svg")
    .attr("width", "100%")
    .attr("height", height)

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .charge(-400)
    .gravity(0.1)
    .friction(0.8)
    .size([width, height])
    .on("tick", tick);

var node = svg.selectAll("g");

var counter = 0;

function tick(e) {
  var k = .1 * e.alpha;

  // Push nodes toward their designated focus.
  nodes.forEach(function(o, i) {
    o.y += (foci[o.id].y - o.y) * k;
    o.x += (foci[o.id].x - o.x) * k;
  });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

}


var timer = setInterval(function(){

  if (nodes.length > data.length-1) { clearInterval(timer); return;}

  var item = data[counter];
  nodes.push({id: item.id, r: item.r /2, name: item.name});
  force.start();

  node = node.data(nodes);

  var n = node.enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .style('cursor', 'pointer')
      .on('mousedown', function() {
         var sel = d3.select(this);
         sel.moveToFront();
      })
      .call(force.drag);

  n.append("circle")
      .attr("r",  function(d) { return d.r; })
      .style("fill", function(d) { return fill(d.id); })

  n.append("text")
      .text(function(d){
          return d.name;
      })
      .style("font-size", function(d) {
          return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 16) + "px"; 
       })
      .attr("dy", ".35em")

  counter++;
}, 100);


d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
};

function resize() {
  width = window.innerWidth;
  force.size([width, height]);
  force.start();
}

d3.select(window).on('resize', resize);