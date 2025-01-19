import { useState, useEffect } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import PropTypes from "prop-types";

GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const PreviewGenerator = ({ file, onPreviewGenerated }) => {
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

  useEffect(() => {
    const generatePreview = async () => {
      if (!file) return;

      try {
        // Load the PDF
        const pdf = await getDocument(URL.createObjectURL(file)).promise;
        const page = await pdf.getPage(1); // Get the first page
        const viewport = page.getViewport({ scale: 1 });

        // Create a canvas and render the page
        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext("2d");
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        // Generate the preview image
        const previewUrl = canvas.toDataURL();
        //console.log("Preview generated:", previewUrl);
        onPreviewGenerated(previewUrl); // Pass the preview back to the parent
      } catch (error) {
        console.error("Error generating PDF preview:", error);
      }
    };

    generatePreview();
  }, [file, onPreviewGenerated]);

  return null;
};

PreviewGenerator.propTypes = {
    file: PropTypes.instanceOf(File).isRequired,
    onPreviewGenerated: PropTypes.func.isRequired,
  };

export default PreviewGenerator;