import { s3Uploadv2 } from "../../services/s3Service.js";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../index.js";
import { Document } from "../../models/Docs.js";
import { User } from "../../models/User.js";
import { PDFDocument } from "pdf-lib";

export const mergeAndUploadPdf = async (req, res) => {
  try {
    const connection = AppDataSource;
    const documentRepository = connection.getRepository(Document);
    const userRepository = connection.getRepository(User);
    const files = req.files;

    const token = req.header("Authorization").split(" ")[1];
    // const topicArn = process.env.SNS_TOPIC_ARN;

    const userId = jwt.verify(token, "secretKey").user.id;

    const user = await userRepository.findOneBy({ id: userId });
    const userEmail = user.email;

    const mergedPdfBytes = await mergePdfFiles(files);

    const result = await s3Uploadv2(
      [{ buffer: mergedPdfBytes, originalname: "merged.pdf" }],
      userId,
      userEmail
    );

    for (const fileUrl of result) {
      await documentRepository.save({
        url: fileUrl,
        userId: userId,
      });
    }

    res.json({ status: "PDFs merged and uploaded successfully", result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const mergePdfFiles = async (files) => {
  const pdfDocs = await Promise.all(
    files.map(async (file) => {
      const pdfDoc = await PDFDocument.load(file.buffer);
      return pdfDoc;
    })
  );

  const mergedPdfDoc = await PDFDocument.create();
  for (const pdfDoc of pdfDocs) {
    const pages = await mergedPdfDoc.copyPages(pdfDoc, pdfDoc.getPageIndices());
    for (const page of pages) {
      mergedPdfDoc.addPage(page);
    }
  }

  return mergedPdfDoc.save();
};
