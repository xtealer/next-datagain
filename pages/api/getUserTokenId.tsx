// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { firebaseAdmin } from "../../helpers/firebaseAdmin";

type Data = {
  id?: string;
  token?: string;
  msg?: string;
};

const getUserTokenId = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const reqData = req.body as any;

  if (typeof reqData?.id !== "string") {
    return res.status(422).send({ msg: "Something has failed" } as any);
  }

  const token = await admin.auth(firebaseAdmin).createCustomToken(reqData.id);

  res.status(200).send({ id: reqData.id, token });
};

export default getUserTokenId;
