import dotenv from "dotenv";
dotenv.config();

import {
  TextractClient,
  AnalyzeDocumentCommand,
} from "@aws-sdk/client-textract";

const client = new TextractClient({
  region: process.env.AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const command = new AnalyzeDocumentCommand({
  Document: {
    S3Object: {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Name: "some-key",
    },
  },
  FeatureTypes: ["FORMS"],
});

async function analyzeDocument() {
  try {
    const response = await client.send(command);
    console.log("Document analyzed successfully:", response);
  } catch (error) {
    console.error("Error analyzing document:", error);
  }
}

// Call the function to analyze the document
analyzeDocument();
