import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FileUpload = () => {
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);
  const [fileDragging, setFileDragging] = useState(null);
  const [fileDropping, setFileDropping] = useState(null);
  const fileInputRef = useRef(null); // Reference to the file input

  const humanFileSize = (size) => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      " " +
      ["B", "kB", "MB", "GB", "TB"][i]
    );
  };

  const remove = (index) => {
    let newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const drop = (e) => {
    e.preventDefault();
    let removed, add;
    let newFiles = [...files];

    removed = newFiles.splice(fileDragging, 1);
    newFiles.splice(fileDropping, 0, ...removed);

    setFiles(newFiles);
    setFileDropping(null);
    setFileDragging(null);
  };

  const dragenter = (e) => {
    let targetElem = e.target.closest("[draggable]");
    setFileDropping(targetElem.getAttribute("data-index"));
  };

  const dragstart = (e) => {
    setFileDragging(e.target.closest("[draggable]").getAttribute("data-index"));
    e.dataTransfer.effectAllowed = "move";
  };

  const loadFile = (file) => {
    const blobUrl = URL.createObjectURL(file);
    return blobUrl;
  };

  const addFiles = (e) => {
    const newFiles = [...files, ...Array.from(e.target.files)];
    setFiles(newFiles);
  };

  const triggerFileInputClick = () => {
    fileInputRef.current.click();
  };

  const uploadFiles = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    const token = localStorage.getItem("token");
    // formData.append("token", token);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Files uploaded successfully");
        navigate("/filelist");
      }
      console.log("Upload successful:", response.data);
    } catch (err) {
      console.error("Upload failed:", err);
      // Optionally, display an error message to the user
      alert(
        "Failed to upload files. Please check the console for more details."
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className=" p-7 rounded w-1/2 mx-auto bg-slate-400">
        <div className="relative flex flex-col p-4 text-gray-400 border border-gray-200 rounded">
          <div className="relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer">
            <input
              ref={fileInputRef}
              accept="*"
              type="file"
              multiple
              className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
              onChange={addFiles}
              onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.classList.add(
                  "border-blue-400",
                  "ring-4",
                  "ring-inset"
                );
              }}
              onDragLeave={(e) => {
                e.currentTarget.classList.remove(
                  "border-blue-400",
                  "ring-4",
                  "ring-inset"
                );
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.currentTarget.classList.remove(
                  "border-blue-400",
                  "ring-4",
                  "ring-inset"
                );
              }}
              // style={{ display: "none" }} // Hide the file input
            />

            <div className="flex flex-col items-center justify-center py-10  text-center">
              <svg
                className="w-6 h-6 mr-1 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="m-0 text-black">
                Drag your files here or click in this area.
              </p>
            </div>
          </div>

          {/* Upload Button */}
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            onClick={uploadFiles}
          >
            Upload Files
          </button>

          {files.length > 0 && (
            <div
              className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6"
              onDrop={drop}
              onDragOver={(e) => e.preventDefault()}
            >
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none"
                  style={{ paddingTop: "100%" }}
                  draggable="true"
                  data-index={index}
                  onDragStart={dragstart}
                  onDragEnd={() => setFileDragging(null)}
                >
                  <button
                    className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    <svg
                      className="w-4 h-4 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                  {/* Additional logic for displaying file types (audio, application, image, video) goes here */}
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                    <span className="w-full font-bold text-gray-900 truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-900">
                      {humanFileSize(file.size)}
                    </span>
                  </div>
                  <div
                    onDragEnter={dragenter}
                    onDragLeave={() => setFileDropping(null)}
                    className={
                      fileDropping === index && fileDragging !== index
                        ? "bg-blue-200 bg-opacity-80 absolute inset-0 z-40 transition-colors duration-300"
                        : ""
                    }
                  ></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
