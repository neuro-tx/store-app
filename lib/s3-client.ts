import "server-only";
import { S3Client } from "@aws-sdk/client-s3";

export const client = new S3Client({
  region: "auto",
  endpoint: process.env.AWS_ENDPOINT_URL_S3!,
  forcePathStyle: false,
});
