import { blogSchema } from "@/lib/schema";
import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const validation = blogSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ error: validation.error.issues });
  } else {
    await prisma.blog.create({ data: { ...validation.data } });
    res.status(200).send({ message: "created!" });
  }
}
