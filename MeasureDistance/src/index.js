import Obniz from "obniz";
import dotenv from "dotenv";
import {createCanvas} from "canvas"

dotenv.config();

const OBNIZ_ID = process.env.OBNIZ_ID;

const main = async () => {
  if (OBNIZ_ID == null) return;

  const obniz = new Obniz(OBNIZ_ID);

  const connected = await obniz.connectWait({ timeout: 1000 });

  if (connected) {
    const led = obniz.wired("LED", {anode:10, cathode:11});
    const hcsr04 = obniz.wired("HC-SR04", {gnd:0, echo:1, trigger:2, vcc:3});

    // const alertTime = 1000 * 60 * 60 // 1 hour
    const alertTime = 1000 // 1 hour
    const seating = 1000 // 1m
    let startTime = 0

    while(true) {
      let avg = 0;
      let count = 0;
      const times = 10;
      let min = 0
      let max = 0

      // 距離を測定
      for (let i=0; i<times; i++) { 
        const val = await hcsr04.measureWait();
        if (val) {
          count++;
          avg += val;
        }

        // 最小値と最大値を取得
        if(i == 0) {
          min = val;
          max = val;
        }
        if(val < min) {
          min = val;
        }
        if(val > max) {
          max = val;
        }
      }

      // 最小値と最大値を除いた平均値を取得
      avg = (avg - min - max) / (count - 2);
      
      obniz.display.clear();
      const canvas = createCanvas(128, 64);
      const ctx = canvas.getContext('2d');
      ctx.font = "60px Avenir";
      ctx.fillStyle = "white";

      // 着席判定
      if(avg < seating) {
        ctx.fillText('着席', 4, 56);
        const now = new Date().getTime()
        startTime = startTime == 0 ? now : startTime

        if(now - startTime > alertTime) {
          led.on();
        }
      } else {
        ctx.fillText('離席', 4, 56);
        startTime = 0
        led.off();
      }
      obniz.display.draw(ctx);

      await obniz.wait(200);
    }
  }
};

main();
