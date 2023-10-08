import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  console.log(userId);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    const user = await clerkClient.users.getUser(userId);
    const blogs = await prisma.blog.findMany({
      where: {
        owner: {
          equals: user.emailAddresses[0].emailAddress,
        },
      },
    });
    res.status(200).json({ data: blogs });
  } catch (error) {
    res.status(500).json(error);
  }
}
