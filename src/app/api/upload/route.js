import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
  const data = await req.formData();
  console.log(data);

  if (data.get("files")) {
    const file = data.get("files");

    const s3Client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    const ext = file.name.split(".").splice(-1)[0];
    const newFileName = uniqid() + "." + ext;
    console.log(newFileName);

    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: "homeato",
        Key: newFileName,
        ACL: "public-read",
        ContentType: file.type,
        Body: buffer,
      })
    );
    return Response.json("https://homeato.s3.amazonaws.com/" + newFileName);
  }
}
