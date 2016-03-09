import utils from '../utils'

export default class LightManager {
  constructor(game, lightRadius=240) {
    this.game = game
    this.lightRadius = lightRadius

    this.shadowTexture = game.add.bitmapData(game.canvas.width, game.canvas.height)
    this.shadowTexture.fixedToCamera = true

    this.lightSprite = game.add.image(0, 0, this.shadowTexture)
    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY
    this.lightSprite.fixedToCamera = true

    this.rayBitmap = this.game.add.bitmapData(this.game.width, this.game.height)
    this.rayBitmapImage = this.game.add.image(0, 0, this.rayBitmap)
    this.rayBitmapImage.visible = false
    this.rayBitmapImage.fixedToCamera = true

    this.walls = this.game.add.group()
    let x = this.game.world.width/2
    let y = this.game.world.height/2
    this.game.add.image(x, y, 'block', 0, this.walls).scale.setTo(3, 3)

    this.stageCorners = [
      new Phaser.Point(0, 0),
      new Phaser.Point(this.game.width, 0),
      new Phaser.Point(this.game.width, this.game.height),
      new Phaser.Point(0, this.game.height)
    ]
  }
  update(mouseX, mouseY) {
    this.shadowTexture.context.fillStyle = 'rgba(13, 13, 13, 1)'
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height)

    this.target = utils.getPositionOnCamera(this.game, this.game.player.sprite)
    this.center = [
      this.target.x,
      this.target.y,
    ]

    const corners = this.getCorners()
    const points = this.rayCast(corners)

    this.drawAura(points)
    this.drawFlashlight(mouseX, mouseY, points)

    this.shadowTexture.dirty = true

    if (this.rayBitmapImage.visible) {
      this.drawRayCast(points)
      this.rayBitmap.dirty = true
    }
  }
  drawRayCast(points) {
    this.rayBitmap.context.clearRect(0, 0, this.game.width, this.game.height)
    this.rayBitmap.context.beginPath()
    this.rayBitmap.context.strokeStyle = 'rgba(255, 255, 255, 0.3)'
    this.rayBitmap.context.fillStyle = 'rgba(255, 255, 255, 0.3)'
    this.rayBitmap.context.moveTo(points[0].x, points[0].y)
    for(var k = 0; k < points.length; k++) {
      this.rayBitmap.context.moveTo(this.target.x, this.target.y)
      this.rayBitmap.context.lineTo(points[k].x, points[k].y)
      this.rayBitmap.context.fillRect(points[k].x-2, points[k].y-2, 4, 4)
    }
    this.rayBitmap.context.stroke()
  }
  drawAura(points) {
    const ctx = this.shadowTexture.context
    const { width, height, player, physics } = this.game
    const flicker = this.game.rnd.integerInRange(0, this.lightRadius / 10)
    const innerRadius = this.lightRadius * 0.05
    const outerRadius = this.lightRadius + flicker
    const gradient = ctx.createRadialGradient(...this.center, innerRadius, ...this.center, outerRadius)
    gradient.addColorStop(0, `rgba(${this.getLight(3)}, 0.9)`)
    gradient.addColorStop(0.5, `rgba(${this.getLight(3)}, 0.5)`)
    gradient.addColorStop(1, `rgba(${this.getLight(3)}, 0.0)`)

    const pointsWithStageCorners = this.stageCorners.map(corner => {
      let ray = new Phaser.Line(this.target.x, this.target.y, corner.x, corner.y)
      let intersect = this.getWallIntersection(ray)
      return intersect ? null : corner
    }).filter(r => r !== null)

    points = this.sortPoints(points.concat(pointsWithStageCorners))

    ctx.beginPath()
    ctx.fillStyle = gradient
    ctx.moveTo(points[0].x, points[0].y)
    points.forEach(point => ctx.lineTo(point.x, point.y))
    ctx.closePath()
    ctx.fill()
  }
  drawFlashlight(mouseX, mouseY, points) {
    const ctx = this.shadowTexture.context
    const { width, height, player, physics } = this.game

    const angle = physics.arcade.angleToPointer(player.sprite) - 0.5
    const angle2 = physics.arcade.angleToPointer(player.sprite) + 0.5
    const point1x = mouseX + Math.cos(angle) * 5000
    const point1y = mouseY + Math.sin(angle) * 5000
    const point2x = mouseX + Math.cos(angle2) * 5000
    const point2y = mouseY + Math.sin(angle2) * 5000

    const centerPoint = new Phaser.Point(...this.center)
    const point1 = new Phaser.Point(point1x, point1y)
    const point2 = new Phaser.Point(point2x, point2y)

    const StageCorners = this.stageCorners.map(corner => {
      let ray = new Phaser.Line(this.target.x, this.target.y, corner.x, corner.y)
      let intersect = this.getWallIntersection(ray)
      return intersect ? null : corner
    }).filter(r => r !== null)

    // const line1 = new Phaser.Line(...this.center, point1x, point1y)
    // const line2 = new Phaser.Line(...this.center, point2x, point2y)
    // const int1 = this.getWallIntersection(line1)
    // const int2 = this.getWallIntersection(line2)
    let newPoints = this.rayCast([point1, point2])

    const poly = new Phaser.Polygon(...this.center, point1x, point1y, point2x, point2y)
    let filteredPoints = [...points, ...StageCorners].filter(p => poly.contains(p.x,p.y))
    newPoints = this.sortPoints([...newPoints, ...filteredPoints])

    const innerRadius = this.lightRadius * 0.5
    const outerRadius = this.lightRadius + 100
    const gradient = ctx.createRadialGradient(...this.center, innerRadius, ...this.center, outerRadius)
    gradient.addColorStop(0, `rgba(${this.getLight(4)}, 1)`)
    gradient.addColorStop(1, `rgba(${this.getLight(4)}, 0.2)`)

    ctx.beginPath()
    ctx.fillStyle = gradient

    ctx.moveTo(centerPoint.x, centerPoint.y)
    newPoints.forEach(point => ctx.lineTo(point.x, point.y))

    ctx.closePath()
    ctx.fill()
  }
  getCorners() {
    // find all the corners visible on the screen and get them into a single array of x,y point pairs
    // right now its just the one block
    let corners = []

    this.walls.forEach((wall) => {
      let wallPos = utils.getPositionOnCamera(this.game, wall)
      corners = corners.concat([
        new Phaser.Point(wallPos.x+0.1, wallPos.y+0.1),
        new Phaser.Point(wallPos.x-0.1, wallPos.y-0.1),

        new Phaser.Point(wallPos.x-0.1 + wall.width, wallPos.y+0.1),
        new Phaser.Point(wallPos.x+0.1 + wall.width, wallPos.y-0.1),

        new Phaser.Point(wallPos.x-0.1 + wall.width, wallPos.y-0.1 + wall.height),
        new Phaser.Point(wallPos.x+0.1 + wall.width, wallPos.y+0.1 + wall.height),

        new Phaser.Point(wallPos.x+0.1, wallPos.y-0.1 + wall.height),
        new Phaser.Point(wallPos.x-0.1, wallPos.y+0.1 + wall.height)
      ])
    })
    return corners
  }
  rayCast(input) {
    let t = this.target
    let w = this.game.width
    let h = this.game.height
    let points = []

    input.forEach(c => {
      let slope = (c.y - t.y) / (c.x - t.x)
      let b = t.y - slope * t.x
      let end = null

      if (c.x === t.x) {
        // Vertical lines
        let point = c.y <= t.y ? [t.x, 0] : [t.x, h]
        end = new Phaser.Point(...point)
      } else if (c.y === t.y) {
        // Horizontal lines
        let point = c.x <= t.x ? [0, t.y] : [w, t.y]
        end = new Phaser.Point(...point)
      } else {
        // Find the point where the line crosses the stage edge
        let left = new Phaser.Point(0, b)
        let right = new Phaser.Point(w, slope * w + b)
        let top = new Phaser.Point(-b / slope, 0)
        let bottom = new Phaser.Point((h - b) / slope, h)

        // Get the actual intersection point
        if (c.y <= t.y && c.x >= t.x) {
          end = (top.x >= 0 && top.x <= w) ? top : right
        } else if (c.y <= t.y && c.x <= t.x) {
          end = (top.x >= 0 && top.x <= w) ? top : left
        } else if (c.y >= t.y && c.x >= t.x) {
          end = (bottom.x >= 0 && bottom.x <= w) ? bottom : right
        } else if (c.y >= t.y && c.x <= t.x) {
          end = (bottom.x >= 0 && bottom.x <= w) ? bottom : left
        }
      }

      let ray = new Phaser.Line(t.x, t.y, end.x, end.y)
      let intersect = this.getWallIntersection(ray)
      points.push(intersect ? intersect : ray.end)
    })

    return points
  }
  sortPoints(points) {
    let t = this.target
    return points.sort(function(a, b) {
      if (a.x - t.x >= 0 && b.x - t.x < 0)
        return 1
      if (a.x - t.x < 0 && b.x - t.x >= 0)
        return -1
      if (a.x - t.x === 0 && b.x - t.x === 0) {
        if (a.y - t.y >= 0 || b.y - t.y >= 0)
          return 1
        return -1
      }

      let det = (a.x - t.x) * (b.y - t.y) - (b.x - t.x) * (a.y - t.y)
      if (det < 0) return 1
      if (det > 0) return -1

      let d1 = (a.x - t.x) * (a.x - t.x) + (a.y - t.y) * (a.y - t.y)
      let d2 = (b.x - t.x) * (b.x - t.x) + (b.y - t.y) * (b.y - t.y)
      return 1
    })
  }
  getWallIntersection(ray) {
    let distanceToWall = Number.POSITIVE_INFINITY
    let closestIntersection = null

    this.walls.forEach(wall => {
      let wallPos = utils.getPositionOnCamera(this.game, wall)
      let lines = [
        new Phaser.Line(wallPos.x, wallPos.y, wallPos.x + wall.width, wallPos.y),
        new Phaser.Line(wallPos.x, wallPos.y, wallPos.x, wallPos.y + wall.height),
        new Phaser.Line(wallPos.x + wall.width, wallPos.y, wallPos.x + wall.width, wallPos.y + wall.height),
        new Phaser.Line(wallPos.x, wallPos.y + wall.height, wallPos.x + wall.width, wallPos.y + wall.height)
      ]

      lines.forEach(line => {
        let intersect = Phaser.Line.intersects(ray, line)
        if (intersect) {
          let distance = this.game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y)
          if (distance < distanceToWall) {
            distanceToWall = distance
            closestIntersection = intersect
          }
        }
      })
    })

    return closestIntersection
  }
  getLight(level) {
    return `${24 * level}, ${23 * level}, ${22 * level}`
  }
}
