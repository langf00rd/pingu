import { blogSchema } from "@/lib/schema";
import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  try {
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
      console.log(validation.data);

      const blogExists = await prisma.blog.findFirst({
        where: {
          sub_domain: {
            equals: validation.data.sub_domain,
          },
        },
      });
      console.log({ blogExists });
      if (blogExists) {
        res.status(400).json({ error: "Subdomain is taken" });
      } else {
        await prisma.blog.create({ data: { ...validation.data } });
        res.status(200).send({ message: "Blog created successfully!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}
