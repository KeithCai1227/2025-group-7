// AiTank.js

class AiTank extends Tank {
  constructor(locX, locY, initialDirection, difficultyLevel, index, playerTank) {
    super(locX, locY, initialDirection, difficultyLevel, index);
    // 存放AI的额外属性
    this.playerTank = playerTank; // 用于侦测和射击玩家
    this.detectionRange = 250;    // 侦测范围
    this.randomMoveCooldown = 0;  // 用于控制随机巡逻方向的时机
    this.randomMoveDuration = 60; // 随机巡逻方向持续帧数
    this.randomMoveDir = 0;       // 当前随机方向
  }

  update() {
    // 先保留父类的移动/碰撞逻辑
    super.update();
    if (this.getLife() <= 0) return; // AI 死亡则不执行

    // 计算与玩家坦克的距离
    let dx = this.playerTank.tankSprite.x - this.tankSprite.x;
    let dy = this.playerTank.tankSprite.y - this.tankSprite.y;
    let distToPlayer = Math.sqrt(dx * dx + dy * dy);

    // 在侦测范围内 -> 停止巡逻、面向玩家并射击
    if (distToPlayer <= this.detectionRange) {
      this.engagePlayer(dx, dy);
    } else {
      // 玩家离开 -> 执行随机巡逻
      this.randomPatrol();
    }
  }

  engagePlayer(dx, dy) {
    // 朝向玩家
    let angleToPlayer = Math.atan2(dy, dx);
    this.tankSprite.rotation = angleToPlayer;
    this.tankSprite.speed = 0; // 暂停移动或保持微量速度均可

    // 发射子弹
    if (this.canFire()) {
      let bullet = this.fire();
      // 将该子弹加入 GameState 的 projectileList
      if (typeof tankGame !== 'undefined') {
        tankGame.addProjectile(bullet);
      }
    }
  }

  randomPatrol() {
    this.randomMoveCooldown--;
    if (this.randomMoveCooldown <= 0) {
      this.randomMoveCooldown = this.randomMoveDuration;
      this.randomMoveDir = Math.random() * Math.PI * 2;
    }
    this.tankSprite.rotation = this.randomMoveDir;
    // 这里的 spdFactor 来源于 Tank 的属性，可在 Tank.js 中查看其用途
    this.tankSprite.speed = 1 * this.spdFactor;
  }
}
