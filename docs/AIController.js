class AIController {
    /**
     * @param {Tank}      tank        受控坦克
     * @param {GameState} gameState   用来取全局信息 & 调用 addProjectile
     * @param {Tank}      targetTank  主要追踪的目标（这里就是玩家 1）
     * @param {Number}    level       0 = HARD, 1 = EASY，对应 GameState.HARD/EASY
     */
    constructor(tank, gameState, targetTank, level = GameState.EASY) {
      this.tank        = tank;
      this.gameState   = gameState;
      this.targetTank  = targetTank;
      this.level       = level;
      this.lastFireMS  = 0;
      this.fireCD      = level === GameState.HARD ? 1000 : 2000;   // 难度影响射速
      this.turnStep    = level === GameState.HARD ? 3   : 1.5;  // 难度影响转向
      this.safeDistSq  = 150 * 150;
    }
  
    update () {
      if (this.gameState.getIsGameOver()) return;
  
      // === 1. 转向玩家 ===
      const ang = atan2(
        this.targetTank.tankSprite.y - this.tank.tankSprite.y,
        this.targetTank.tankSprite.x - this.tank.tankSprite.x
      );
      const diff = (((ang - this.tank.tankSprite.rotation + 540) % 360) - 180);
  
      if (abs(diff) > this.turnStep) {
        this.tank.move(diff > 0 ? Tank.RIGHT_DIRECTION : Tank.LEFT_DIRECTION);
        return;                        // 先把炮口对准
      }
  
      // === 2. 机动 ===
      const dx = this.targetTank.tankSprite.x - this.tank.tankSprite.x;
      const dy = this.targetTank.tankSprite.y - this.tank.tankSprite.y;
      const distSq = dx * dx + dy * dy;
  
      if (distSq > this.safeDistSq) {
        this.tank.move(Tank.UP_DIRECTION);       // 追过去
      } else if (distSq < this.safeDistSq / 4) {
        this.tank.move(Tank.DOWN_DIRECTION);     // 太近就倒车
      } else {
        this.tank.move(Tank.NO_DIRECTION);
      }
  
      // === 3. 开火 ===
      if (this.tank.canFire() && millis() - this.lastFireMS > this.fireCD) {
        this.gameState.addProjectile(this.tank.fire(), this.tank);
        this.lastFireMS = millis();
      }
    }
  }
  