// // import express from "express";
// // import cloudinary from "../utils/cloudinary";
// // import { upload } from "../middleware/multer";
// // import { MulterRequest } from "../types/express";

// // const router = express.Router();

// // router.post("/upload", upload.single("file"), async (req: MulterRequest, res) => {
// //   try {

// //     const file = req.file;

// //     const stream = cloudinary.uploader.upload_stream(
// //       { folder: "tweets" },
// //       (error, result) => {

// //         if (error) return res.status(500).json(error);

// //         return res.json({
// //           url: result?.secure_url,
// //         });
// //       }
// //     );

// //     stream.end(file.buffer);

// //   } catch (err) {
// //     res.status(500).json({ error: "upload failed" });
// //   }
// // });

// // export default router;
// import express, { Request, Response } from "express";
// import cloudinary from "../utils/cloudinary";
// import { upload } from "../middleware/multer";

// const router = express.Router();

// router.post(
//   "/upload",
//   upload.single("file"),
//   async (req: Request, res: Response) => {
//     try {

//       const file = (req as any).file;

//       if (!file) {
//         return res.status(400).json({
//           error: "file missing"
//         });
//       }

//       const stream = cloudinary.uploader.upload_stream(
//         { folder: "tweets" },

//         (
//           error: any,
//           result: any
//         ) => {

//           if (error) {
//             return res.status(500).json(error);
//           }

//           return res.json({
//             url: result.secure_url,
//           });

//         }
//       );

//       stream.end(file.buffer);

//     } catch (err) {

//       res.status(500).json({
//         error: "upload failed"
//       });

//     }
//   }
// );

// export default router;
import express, { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import { upload } from "../middleware/multer";

const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const file = (req as any).file;

      // ✅ Validate file exists
      if (!file) {
        console.log("No file in request"); // Debug
        return res.status(400).json({
          error: "No file provided",
        });
      }

      console.log("File received:", file.originalname); // Debug

      // ✅ Validate file type
      if (!file.mimetype.startsWith("image/")) {
        return res.status(400).json({
          error: "Only image files allowed",
        });
      }

      // ✅ Use async/await instead of callback
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { 
            folder: "tweets",
            resource_type: "auto",
          },
          (error: any, result: any) => {
            if (error) {
              console.error("Cloudinary error:", error);
              reject(error);
            } else {
              console.log("Upload success:", result.secure_url); // Debug
              resolve(result);
            }
          }
        );

        stream.on("error", (error) => {
          console.error("Stream error:", error);
          reject(error);
        });

        stream.end(file.buffer);
      });

      // ✅ Send proper response
      return res.status(200).json({
        url: (result as any).secure_url,
        success: true,
      });

    } catch (err) {
      console.error("Upload route error:", err);
      return res.status(500).json({
        error: "Upload failed",
        details: (err as any).message,
      });
    }
  }
);

export default router;