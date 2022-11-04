// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {obnizEntity} from "../../lib/Obniz"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if(req.method == "GET") {
    await obnizEntity.connect()
    res.status(200).json({ name: 'John Doe' })
    return
  } 
  else if(req.method === 'POST') {
    const { command } = req.body
    switch (command) {
      case "start":
        await obnizEntity.move(true)
        break;
      case "reverse":
        await obnizEntity.move(false)
        break;
      case "stop":
        await obnizEntity.stopCar()
        break;
      case "close":
        await obnizEntity.close()
        break;
      default:
        break;
    }
    res.status(200).json({})
    return
  }
}
