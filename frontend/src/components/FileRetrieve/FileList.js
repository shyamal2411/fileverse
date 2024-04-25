import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FileList = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login"); // Redirect to the login page if token is not present
          return;
        }

        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/file/getfiles`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFiles(response.data.files);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [navigate]); // Add navigate to the dependency array

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-black">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-black">
        Error: {error}
      </div>
    );

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link to clipboard.");
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="flex justify-center items-center min-h-screen text-black">
        <div className="w-full max-w-2xl p-4">
          <h2 className="text-2xl font-bold mb-4 mt-20 text-center underline uppercase">
            Your Files
          </h2>
          <div className="flex flex-col items-center justify-center w-full overflow-x-auto">
            <table className="table-fixed w-full border-collapse border border-black rounded-xl">
              <thead>
                <tr className="bg-slate-300 underline">
                  <th className="w-3/4 px-4 py-2">File Name</th>
                  <th className="w-1/4 px-4 py-2">Share Copy Link</th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto max-h-96">
                {files.map((fileUrl, index) => {
                  const fileNameWithUuid = fileUrl.split("/").pop();
                  const originalFileName = fileNameWithUuid.split("_")[1];
                  return (
                    <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                      <td className="border border-black px-4 py-2">
                        {originalFileName}
                      </td>
                      <td className="border border-black px-4 py-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onClick={() => copyToClipboard(fileUrl)}
                        >
                          Copy Link
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileList;
