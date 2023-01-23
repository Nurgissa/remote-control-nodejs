import { mouse, Region, screen } from "@nut-tree/nut-js";
import Jimp, { MIME_PNG } from "jimp";

export async function screenHandler() {
  const { x, y } = await mouse.getPosition();
  let prompt = "";
  try {
    const image = await screen.grabRegion(
      new Region(x - 100, y - 100, 200, 200)
    );
    const buffer = await image.toRGB();
    const jimp = new Jimp(buffer);
    const dataImage = (await jimp.getBase64Async(MIME_PNG)).replace(
      "data:image/png;base64,",
      ""
    );

    prompt = `prnt_scrn ${dataImage}`;
  } catch (e) {
    console.error(`Cannot capture screenshot. ${e}`);
  }
  return prompt;
}
