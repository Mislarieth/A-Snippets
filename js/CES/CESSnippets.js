/*
  CES is a component entity system for Javascript.
*/

/*
  Installation for browsers:
*/
<script type="text/javascript" src="./ces-browser.min.js"></script>

/*
Installation for Node:
*/
npm install ces
var CES = require('ces');

/*
  Creating a new world
*/
var world = new CES.World();


/*
  Defining a new component:
*/
var Position = CES.Component.extend({
    name: 'position',
    init: function (x, y) {
        this.x = x;
        this.y = y;
    }
});
var Velocity = CES.Component.extend({
    name: 'velocity',
    init: function (x,y) {
        this.x = x;
        this.y = y;
    },
    isAtRest: function () {
        return this.x == 0 && this.y==0;
    }
});

/*
  Defining a new system for that component.

  addedToWorld and removedFromWorld are called when added or removed
  from the world; good for init and destroy

  update is called when the function world.update(interval) is called

  world.entityAdded or world.entityRemoved is called whenever an entity
  with specified components are added/removed to/from the world or when
  an entity with both has either component added/removed
*/
var PhysicsSystem = CES.System.extend({
  addedToWorld: function(world) {
    world.entityAdded('position', 'velocity').add(function(entity) {

    });
    world.entityRemoved('position', 'velocity').add(function(entity) {

    });
  },
  removedFromWorld: function(world){

  },
  update: function (dt) {
       var entities, position, velocity;

       entities = this.world.getEntities('position', 'velocity');

       entities.forEach(function (entity) {
           position = entity.getComponent('position');
           velocity = entity.getComponent('velocity');
           position.x += velocity.x * dt;
           position.y += velocity.y * dt;
       });
   }
});

world.addSystem(new PhysicSystem());


/*
  Defining a new entity

  An entity is basically a container of one or more components
*/
var hero = new CES.Entity();
hero.addComponent(new Position(0, 0));
hero.addComponent(new Velocity(0, 0));
world.addEntity(hero);

/*
  Don't forget to update the world

  dt equals something like current-old
*/
world.update(dt);
