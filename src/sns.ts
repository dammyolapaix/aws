import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

const client = new SNSClient({
  region: process.env.AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const command = new PublishCommand({
  Message: "Testing SDK",
  PhoneNumber: "+125***********",
});

export async function publish() {
  try {
    const response = await client.send(command);

    console.log("SMS sent:", response);
  } catch (error) {
    console.error("Error sending sms:", error);
  }
}
