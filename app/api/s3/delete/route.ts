import { client } from "@/lib/s3-client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { key } = await req.json();

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    });

    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.t3.storage.dev/${key}`;

    await client.send(command);

    return NextResponse.json(
      { publicUrl },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "falid to delete the files" },
      { status: 500 }
    );
  }
}
