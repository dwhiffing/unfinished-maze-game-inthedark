export default class InputManager {
  constructor(game) {
    this.game = game
    this.keys = game.input.keyboard.addKeys({
      space: Phaser.KeyCode.SPACEBAR,
    })
    this.bindings = {}
  }
  bind(key, callback) {
    this.bindings[key] = callback
  }
  update() {
    Object.keys(this.bindings).forEach(key => {
      if (this.keys[key] && this.keys[key].justDown) {
        this.bindings[key](this.game)
      }
    })
  }
}
