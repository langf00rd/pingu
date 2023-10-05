import { blogSchema } from "@/lib/schema";
import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const user = await clerkClient.users.getUser(userId);
  req.body.owner = user.emailAddresses[0].emailAddress;
  const validation = blogSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ error: validation.error.issues });
  } else {
    const blogExists = await prisma.blog.findFirst({
      where: {
        subdomain: {
          equals: validation.data.subdomain,
        },
      },
    });
    if (!blogExists) {
      await prisma.blog.create({ data: { ...validation.data } });
      res.status(200).send({ message: "Blog created successfully!" });
    } else res.status(400).send({ error: "Subdomain is taken" });
  }
}
