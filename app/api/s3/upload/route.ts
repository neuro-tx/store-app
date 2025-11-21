import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import z from "zod";
import { client } from "@/lib/s3-client";

const fileUploadSchema = z.object({
  fileName: z.string().min(1),
  contentType: z.string().min(1),
  size: z.number(),
  dirName: z.string()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validate = fileUploadSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json({ error: "invalid file data" }, { status: 400 });
    }

    const { fileName, size, contentType ,dirName } = validate.data;
    const key = `${dirName}/${size}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      ContentType: contentType,
    });

    const url = await getSignedUrl(client, command, {
      expiresIn: 360,
    });

    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.t3.storage.dev/${key}`;

    return NextResponse.json({ url, key, publicUrl }, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "falid to genrate a presigned url" },
      { status: 500 }
    );
  }
}
