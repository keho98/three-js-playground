EYEO.VisualizationMain = function( resources, scene, camera, controls, picker, renderer, gui ){

  //  rotate scene so z is up
  //  when adding new meshes, add to container
  var container = new THREE.Object3D();
  var mesh = null;
  var pLight = null;
  var lightX = 0, lightY = 0;
  scene.add( container );
  container.rotation.x = Math.PI / 2 * 3;

  this.setup = function(){

    pLight = new THREE.PointLight( 0xffffff, .5, 10000 );
    pLight.position.set( 500, 500, 500 );
    scene.add( pLight );

    var geo = new THREE.TorusKnotGeometry(100,40,64,8, 2,3)
    var material = new THREE.MeshPhongMaterial({
      color: 0x77100f
    });
    mesh = new THREE.Mesh(geo, material);
    container.add(mesh);

    var geometry = new THREE.CubeGeometry(100,50,50);
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    container.add(cube);

    //  center the view
    controls.center.set( 310, 0, 70 );

  }

  var lastUpdateTime = Date.now();
  //  use this function to animate
  this.update = function(){
    if( Date.now() - lastUpdateTime > 20) {
      lightX++;
      lightY++;
      if(lightX > 500) {
        lightX = 0;
        lightY = 0;
      }
      pLight.position.set(lightX, lightY, 500);
      lastUpdateTime = Date.now();
    }
  }

  //  example of picking a mesh
  this.onClick = function( e ){
    var s = picker.pick( e.clientX, e.clientY, container );
    if( s ){
      console.log( s.id );
    }
  }

  var mouseX = 0;
  var mouseY = 0;

  this.onMouseMove = function( e ){
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

}
