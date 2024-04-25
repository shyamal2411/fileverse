import React, { useState, useRef, useEffect } from "react";
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleFileAction = async (url) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}${url}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const action =
          url === "/api/upload" ? "Files uploaded" : "Files merged";
        toast.success(`${action} successfully`);
        navigate("/filelist");
      }
      console.log(`${url} successful:`, response.data);
    } catch (err) {
      console.error(`${url} failed:`, err);
      alert(
        `Failed to ${
          url.includes("upload") ? "upload" : "merge"
        } files. Please check the console for more details.`
      );
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const newFiles = [...files];
    const removedFile = newFiles[fileDragging];
    newFiles[fileDragging] = newFiles[fileDropping];
    newFiles[fileDropping] = removedFile;
    setFiles(newFiles);
    setFileDropping(null);
    setFileDragging(null);
  };

  // Function to handle file drag
  const handleFileDrag = (index) => {
    setFileDropping(index);
  };

  // Function to add files
  const addFiles = (e) => {
    const newFiles = [...files, ...Array.from(e.target.files)];
    setFiles(newFiles);
  };

  // Function to remove a file
  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="flex items-center justify-center h-screen    ">
      <div className=" p-7 rounded w-[35%] mx-auto bg-slate-300">
        <div className="relative flex flex-col p-4 text-gray-400 border border-gray-600 rounded">
          <div className="relative flex flex-col text-gray-400 border border-gray-600 border-dashed rounded cursor-pointer">
            {/* File input */}
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
              onDrop={handleFileDrop}
            />
            {/* Drag and drop area content */}
            <div className="flex flex-col items-center justify-center py-10  text-center">
              <svg
                className="w-12 h-12 mb-3 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Add an appropriate icon for drag and drop area */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="m-0 text-gray-600 text-sm">
                Drag and drop your files here
                <br />
                or click to browse
              </p>
            </div>
          </div>

          {/* Upload and merge buttons */}
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleFileAction("/api/upload")}
            >
              Upload Files
            </button>
            <button
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleFileAction("/api/merge-files")}
            >
              Merge Files
            </button>
            {/* <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleFileAction("/api/convert-pdf-to-docx")}
            >
              Convert PDF to DOCX
            </button> */}
          </div>

          {/* File display */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center bg-gray-100 border rounded cursor-move select-none"
                  style={{ paddingTop: "100%" }}
                  draggable="true"
                  onDragStart={() => handleFileDrag(index)}
                  onDragEnd={() => setFileDragging(null)}
                >
                  <img
                    src={file.thumbnail}
                    alt="File Thumbnail"
                    className="w-full h-full object-cover rounded-t"
                  />
                  <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-90">
                    <span className="w-full font-bold text-gray-800 truncate">
                      {file.name}
                    </span>
                    <span className="text-xs text-gray-600">
                      {humanFileSize(file.size)}
                    </span>
                    <button
                      className="absolute top-0 right-0 z-10 p-1 bg-white rounded-full focus:outline-none"
                      onClick={() => removeFile(index)}
                    >
                      <svg
                        className="w-4 h-4 text-gray-700"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        {/* Add an appropriate delete icon */}
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Buttons and file display */}
          {/* ... */}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
