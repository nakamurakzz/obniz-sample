import Obniz from "obniz"

export class ObnizEntity {
  private static instance: ObnizEntity
  obnizClient: Obniz
  connection: boolean = false
  motor: any = null
  hcsr04: any = null
  isForwarding: boolean = true
  
  private constructor() {
    console.log("obniz constructor")
    const obnizId = process.env.OBNIZ_ID

    if(!obnizId) throw new Error("OBNIZ_ID is not set");    
    this.obnizClient = new Obniz(obnizId)
  }

  static getInstance() {
    if (ObnizEntity.instance) {
        return ObnizEntity.instance
    }
    ObnizEntity.instance = new ObnizEntity()
    return ObnizEntity.instance
  }

  async connect() {
    const isConnect = await this.obnizClient.connectWait({ timeout: 10 })
    console.log(isConnect)
    this.obnizClient.display?.clear()
    this.obnizClient.display?.print("connected")
    console.log("obniz connected")
    this.connection = true
    this.motor = this.obnizClient.wired("DCMotor", {forward:9, back:10});
    this.motor.power(35);
    console.log("motor set")

    this.hcsr04 = this.obnizClient.wired("HC-SR04", {gnd:0, echo:1, trigger:2, vcc:3});
    console.log("sensor set")
  }

  async close() {
    await this.obnizClient.closeWait()
    this.connection = false
  }

  async reconnect() {
    await this.obnizClient.closeWait()
    await this.connect()
  }

  private async autoStop() {
    while (true) {
      // 後退している場合はループ停止
      if(!this.isForwarding) return

      const distance = await this.hcsr04.measureWait();
      if(distance==undefined) continue
      console.log({distance})
      this.obnizClient.wait(200)

      // 1m以下の場合は停止
      if(distance < 500){
        this.stopCar()
        await this.motor.move(false)
        this.stopCar()
        return;
      }
    }
  }

  public async move(isForward: boolean) {
    if (!this.connection) {
      await this.reconnect()
    }
    if(this.isForwarding != isForward){
      this.motor.stop()
    }
    await this.motor.move(isForward);
    this.isForwarding = isForward
    
    this.autoStop()

    return
  }

  public async stopCar() {
    if (!this.connection) {
      await this.reconnect()
    }
    this.motor.stop();
    return
  }  
}

export const obnizEntity = ObnizEntity.getInstance()