import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("token");
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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ToastContainer />

      <div className="flex justify-center items-center min-h-screen ">
        <div className="w-full max-w-2xl p-4">
          <h2 className="text-2xl font-bold mb-4 text-center underline uppercase">
            Your Files
          </h2>
          <table className="table-auto w-full items-center justify-center border-2 rounded-xl">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">File Name</th>
                <th className="px-4 py-2 text-left">Share Copy Link</th>
              </tr>
            </thead>
            <tbody>
              {files.map((fileUrl, index) => {
                console.log(fileUrl);
                const fileNameWithUuid = fileUrl.split("/").pop();
                const originalFileName = fileNameWithUuid.split("_");
                console.log(originalFileName);
                return (
                  <tr key={index}>
                    <td className="border px-4 py-2">{originalFileName}</td>
                    <td className="border text-blue-400 px-4 py-2">
                      Link -{" "}
                      <a target="_blank" href={`${fileUrl}`}>
                        {fileUrl}
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default FileList;
