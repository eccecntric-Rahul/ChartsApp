// pages/api/data.ts
import { NextApiRequest, NextApiResponse } from "next";

let historicalData = Array.from({ length: 100 }, (_, i) => ({
  timestamp: new Date(Date.now() - i * 1000 * 60).toISOString(),
  price: (Math.random() * 100 + 100).toFixed(2),
})).reverse();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = new Date().toISOString();
  const newPrice = (Math.random() * 100 + 100).toFixed(2);

  historicalData.push({ timestamp: now, price: newPrice });
  if (historicalData.length > 100) {
    historicalData.shift();
  }

  res.status(200).json(historicalData);
}
