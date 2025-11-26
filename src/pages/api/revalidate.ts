import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) { //index 페이지 요청을 받았을 떄 재생성 해주는 코드
  try {
    await res.revalidate(`/`)
    return res.json({ revalidate: true })
  } catch (err) {
    console.error(err);
    res.status(500).send("Revalidation Failed")
  }


}