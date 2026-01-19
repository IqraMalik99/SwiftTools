"use client";

import { useState, useCallback ,use } from "react";
import Navbar from "../../components/Navbar";
import { tools } from "../../lib/tools";
import { convertFileImage } from "../../lib/api";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../lib/cropImage";
import Footer from "../../components/Footer";
export default function ToolDetailPage({ params }) {
  const { slug } = use(params);
  const detail = tools[slug];

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cropData, setCropData] = useState([]);
  const [cropWidth, setCropWidth] = useState(0);
  const [cropHeight, setCropHeight] = useState(0);

  const [watermarkType, setWatermarkType] = useState("text");
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkLogo, setWatermarkLogo] = useState(null);
  const [watermarkPosition, setWatermarkPosition] = useState("bottom-right");

  const [exifData, setExifData] = useState(null);

  if (!detail || detail.type !== "image") {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm bg-white">
        Image tool not found
      </div>
    );
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setSelectedFiles(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    setCropData(files.map(() => ({ crop: { x: 0, y: 0 }, zoom: 1 })));

    const img = new Image();
    img.src = urls[0];
    img.onload = () => {
      setCropWidth(img.width);
      setCropHeight(img.height);
    };

    if (slug === "exif-metadata-remover") {
      import("exifr").then(async (exifr) => {
        const data = await exifr.parse(files[0]);
        setExifData(data);
      });
    }
  };

  const onCropComplete = useCallback(
    (index) => (_, croppedAreaPixels) => {
      setCropData((prev) => {
        const newData = [...prev];
        newData[index].croppedAreaPixels = croppedAreaPixels;
        return newData;
      });
      if (index === 0 && croppedAreaPixels) {
        setCropWidth(Math.round(croppedAreaPixels.width));
        setCropHeight(Math.round(croppedAreaPixels.height));
      }
    },
    []
  );

  const handleConvert = async () => {
    if (!selectedFiles.length) return alert("Please select images");
    setLoading(true);
    try {
      const blobs = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        let finalFile = selectedFiles[i];
        if (
          ["image-cropper", "image-resizer", "bulk-image-resizer", "social-media-image-cropper"].includes(
            slug
          )
        ) {
          finalFile = await getCroppedImg(
            previewUrls[i],
            cropData[i].croppedAreaPixels,
            cropWidth,
            cropHeight,
            slug
          );
        }
        const result = await convertFileImage(finalFile, slug, cropWidth, cropHeight, {
          watermarkType,
          watermarkText,
          watermarkLogo,
          position: watermarkPosition,
        });
        if (result) blobs.push(result);
      }
      blobs.forEach((blob, i) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = selectedFiles[i].name;
        a.click();
        URL.revokeObjectURL(url);
      });
    } finally {
      setLoading(false);
    }
  };

  const showGridTools = ["image-resizer", "bulk-image-resizer", "image-cropper", "social-media-image-cropper"];

  return (
    <>
    <div className="text-black bg-linear-to-r from-[#f8f7ff] via-[#faf5f5] to-[#fffdf5] ">
      <div className="mx-auto max-w-md px-3 py-4 min-h-screen">
        <Navbar />

        {/* Header */}
        <div className="text-center mb-2 mt-24">
          <h1 className="text-lg md:text-2xl font-bold">{detail.title}</h1>
          <p className="text-[11px] md:text-sm text-gray-600">{detail.description}</p>
        </div>

        {/* Main Card */}
        <div className="rounded-xl p-3 shadow-sm bg-white">

          {/* Upload */}
          <label className="flex flex-col items-center cursor-pointer rounded-lg border border-dashed border-gray-300 bg-gray-50 p-2 text-xs space-y-1">
            <img src="/cloud-logo.png" alt="upload" className="w-24 h-24 md:w-40 md:h-40" />
            <span className="font-semibold text-sm md:text-xl text-center">Drag & drop your Images here</span>
            <span className="text-gray-500 text-[10px] md:text-xs">Supported: JPG, PNG, WebP</span>
            <input type="file" accept="image/*" hidden multiple onChange={handleFileChange} />
          </label>

          {/* EXIF Data */}
          {slug === "exif-metadata-remover" && exifData && (
            <div className="mt-2 rounded border border-gray-300 bg-white p-2 text-[10px] md:text-xs overflow-x-auto">
              <h2 className="font-semibold mb-1">EXIF Metadata:</h2>
              <table className="w-full text-left border-collapse text-[10px] md:text-[11px]">
                <tbody>
                  {Object.entries(exifData).map(([key, value]) => (
                    <tr key={key} className="border-b border-gray-200">
                      <td className="pr-1 font-medium text-gray-700">{key}</td>
                      <td>{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Width/Height Inputs */}
          {previewUrls.length > 0 && showGridTools.includes(slug) && (
            <div className="mt-2 flex justify-center gap-1">
              <input
                type="number"
                value={cropWidth}
                onChange={(e) => setCropWidth(+e.target.value)}
                className="w-12 px-1 py-0.5 text-[10px] rounded border border-gray-300"
                placeholder="W"
              />
              <input
                type="number"
                value={cropHeight}
                onChange={(e) => setCropHeight(+e.target.value)}
                className="w-12 px-1 py-0.5 text-[10px] rounded border border-gray-300"
                placeholder="H"
              />
            </div>
          )}

          {/* Cropper */}
          <div className="mt-2 grid grid-cols-2 gap-1 md:gap-2">
            {previewUrls.map((url, idx) => (
              <div key={idx} className="relative h-20 md:h-28 rounded-md overflow-hidden border border-gray-300">
                <Cropper
                  image={url}
                  crop={cropData[idx]?.crop}
                  zoom={cropData[idx]?.zoom}
                  aspect={slug === "social-media-image-cropper" ? 1 : cropWidth && cropHeight ? cropWidth / cropHeight : undefined}
                  onCropChange={(c) => setCropData((prev) => { const d = [...prev]; d[idx].crop = c; return d; })}
                  onZoomChange={(z) => setCropData((prev) => { const d = [...prev]; d[idx].zoom = z; return d; })}
                  onCropComplete={onCropComplete(idx)}
                  cropShape={slug === "social-media-image-cropper" ? "round" : "rect"}
                  showGrid={showGridTools.includes(slug)}
                />
              </div>
            ))}
          </div>

          {/* Watermark Options */}
          {slug === "watermark-adder" && (
            <div className="mt-2 rounded-lg border border-gray-300 bg-white p-2 text-xs">
              {/* Watermark UI goes here */}
            </div>
          )}

          {/* Selected Files Info */}
          {selectedFiles.length > 0 && (
            <div className="mt-2 space-y-1 overflow-x-auto">
              {selectedFiles.map((file, i) => (
                <div key={i} className="flex items-center gap-1 p-1 border border-gray-200 rounded bg-gray-50 text-[10px] md:text-xs">
                  <img src={previewUrls[i]} alt={file.name} className="w-8 h-8 md:w-10 md:h-10 object-cover rounded" />
                  <div className="flex flex-col truncate">
                    <span className="truncate">{file.name}</span>
                    <span className="text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Convert Button */}
          {selectedFiles.length > 0 && (
            <button
              onClick={handleConvert}
              disabled={loading}
               className="mt-4 w-full rounded-lg bg-black text-white py-2.5 text-sm font-semibold disabled:opacity-50 transition-colors"
            >
              {loading ? "Processing..." : "Convert"}
            </button>
          )}

        </div>
      </div>
   
       <Footer/>
    </div>
  </>
  );
}
