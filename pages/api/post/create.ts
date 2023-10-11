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
      console.log(validation.error.issues);
      res.status(400).json({ error: validation.error.issues });
    } else {
      const exists = await prisma.post.findFirst({
        where: {
          id: validation.data.id,
        },
      });

      if (!exists) {
        console.log("creating...");
        const doc = await prisma.post.create({
          data: {
            ...validation.data,
            created_at: new Date().toISOString(),
            author: {
              id: user.id,
              email: user.emailAddresses[0].emailAddress,
              name: `${user.firstName} ${user.lastName ?? ""}`,
              photo: user.imageUrl,
            },
          },
        });
        res.status(200).json({ data: doc, message: "created!" });
      } else {
        console.log("updating...");
        const updatedPostData = {
          ...validation.data,
          updated_at: new Date().toISOString(),
          id: undefined,
          sub_domain: undefined,
        };
        const updatedDoc = await prisma.post.update({
          data: updatedPostData,
          where: {
            id: validation.data.id,
          },
        });
        res.status(200).json({ data: updatedDoc, message: "updated!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
