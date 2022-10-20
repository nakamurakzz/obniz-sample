import Obniz from "obniz";
import dotenv from "dotenv";

dotenv.config();

const OBNIZ_ID = process.env.OBNIZ_ID;

const main = async () => {
  if (OBNIZ_ID == null) return;

  const obniz = new Obniz(OBNIZ_ID ?? "");
  const connected = await obniz.connectWait({ timeout: 1000 });

  if (connected) {
    obniz.display.clear();
    obniz.display.print("Hello World");
  }
};

main();
