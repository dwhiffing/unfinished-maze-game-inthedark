import TileGroup from '../entities/tileGroup'

let tileSize, tileBuffer, line, lineGroup, displacementFilter, count=0, shadowTexture

export default {
  create(game) {
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.stage.backgroundColor = "#235934"
    game.world.setBounds(0, 0, 2000, 2000)

    game.canvas.addEventListener('mousedown', () => game.input.mouse.requestPointerLock())

    game.camera.x = game.world.width/2
    game.camera.y = game.world.height/2

    game.input.addMoveCallback((pointer, x, y) => {
      if (game.input.mouse.locked) {
        game.camera.x += game.input.mouse.event.webkitMovementX
        game.camera.y += game.input.mouse.event.webkitMovementY
      }
    }, this)

    let tileGroup = new TileGroup(game)

    lineGroup = game.add.group()
    line = game.add.sprite(game.width/2, game.height/2, 'cross')
    game.physics.enable(line)
    line.anchor.setTo(0.5, 0.5)
    line.fixedToCamera = true
    lineGroup.add(line)

    let displacementSprite = this.game.add.sprite(-600,-600,"displacement")
    displacementFilter = new PIXI.DisplacementFilter(displacementSprite.texture);
    displacementFilter.scale.x = 20;
    displacementFilter.scale.y = 20;
    game.tileGroup.filters = [displacementFilter]

    shadowTexture = game.add.bitmapData(game.world.width, game.world.height);
    let lightSprite = game.add.image(0, 0, shadowTexture);
    lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    let shadowTexture2 = game.add.bitmapData(game.world.width, game.world.height);
    let lightSprite2 = game.add.image(0, 0, shadowTexture);
    lightSprite2.blendMode = Phaser.blendModes.MULTIPLY;

    let shadowTexture3 = game.add.bitmapData(game.world.width, game.world.height);
    let lightSprite3 = game.add.image(0, 0, shadowTexture);
    lightSprite3.blendMode = Phaser.blendModes.MULTIPLY;

    game.lightRadius = 200
  },

  update(game) {
    count++
    displacementFilter.offset.x = count*5
    displacementFilter.offset.y = count*5
    game.physics.arcade.overlap(
      line, game.tileGroup,
      (p, e) => {e.kill()}, null, this
    )

    var radius = game.lightRadius+game.rnd.integerInRange(0,10)
    shadowTexture.context.fillStyle = 'rgb(100, 100, 100)';
    shadowTexture.context.fillRect(0, 0, game.world.width, game.world.height);

    var gradient = shadowTexture.context.createRadialGradient(
        line.x, line.y, game.lightRadius * 0.4,
        line.x, line.y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    // Draw circle of light
    shadowTexture.context.beginPath();
    shadowTexture.context.fillStyle = gradient;
    var size = this.game.rnd.realInRange(0.9, 1.0);
    shadowTexture.context.arc(line.x, line.y, radius, 0, Math.PI*2);
    shadowTexture.context.fill();

    // This just tells the engine it should update the texture cache
    shadowTexture.dirty = true;
  },

  render(game) {
    // game.tileGroup
    //   .forEach(e => game.debug.body(e))
  }
}
