import { postSchema } from "@/lib/schema";
import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await clerkClient.users.getUser(userId);
    const validation = postSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({ error: validation.error.issues });
    } else {
      const exists = await prisma.post.findFirst({
        where: {
          id: validation.data.id,
        },
      });

      console.log(validation.data);

      if (!exists) {
        console.log("creating...");
        const postDoc = await prisma.post.create({
          data: {
            ...validation.data,
            owner: user.emailAddresses[0].emailAddress,
          },
        });
        res.status(200).json({ data: postDoc });
      } else {
        console.log("updating...");

        const postDataWithoutID = {
          ...validation.data,
          owner: user.emailAddresses[0].emailAddress,
          id: undefined,
          subdomain: undefined,
        };

        const updated = await prisma.post.update({
          data: postDataWithoutID,
          where: {
            id: validation.data.id,
          },
        });
        res.status(200).json({ data: updated, message: "updated!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
