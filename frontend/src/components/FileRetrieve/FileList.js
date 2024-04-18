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

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-700 text-black">
        <div className="w-full max-w-2xl p-4">
          <h2 className="text-2xl font-bold mb-4 mt-20 text-center underline uppercase text-slate-200">
            Your Files
          </h2>
          <div className="flex flex-col items-center justify-center w-full">
            <table className="table-auto flex flex-col w-full lg:w-full items-center border-2 border-black rounded-xl">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-black">File Name</th>
                  <th className="px-4 py-2 text-left text-black">
                    Share Copy Link
                  </th>
                </tr>
              </thead>
              <tbody>
                {files.map((fileUrl, index) => {
                  const fileNameWithUuid = fileUrl.split("/").pop();
                  const originalFileName = fileNameWithUuid.split("_")[1];
                  return (
                    <tr key={index} className="bg-slate-300">
                      <td className="border-2 border-black px-4 py-2 text-black">
                        {originalFileName}
                      </td>
                      <td className="border-2 border-black px-4 py-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// const FileList = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.post(
//           `${process.env.REACT_APP_API_URL}/api/file/getfiles`,
//           {},
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setFiles(response.data.files);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFiles();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const copyToClipboard = async (text) => {
//     try {
//       await navigator.clipboard.writeText(text);
//       toast.success("Link copied to clipboard!");
//     } catch (err) {
//       toast.error("Failed to copy link to clipboard.");
//     }
//   };

//   return (
//     <>
//       <ToastContainer />

//       <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-500 to-purple-700 text-black">
//         <div className="w-full max-w-2xl p-4">
//           <h2 className="text-2xl font-bold mb-4 text-center underline uppercase">
//             Your Files
//           </h2>
//           <div className="flex flex-col items-center justify-center w-full ">
//             <table className="table-auto flex flex-col w-3/4 items-center bg-slate-300 justify-center border-2 p-4 rounded-xl">
//               <thead>
//                 <tr>
//                   <th className="px-4 py-2 text-left">File Name</th>
//                   <th className="px-4 py-2 text-left">Share Copy Link</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {files.map((fileUrl, index) => {
//                   const fileNameWithUuid = fileUrl.split("/").pop();
//                   const originalFileName = fileNameWithUuid.split("_")[1];
//                   return (
//                     <tr key={index}>
//                       <td className="border px-4 py-2">{originalFileName}</td>
//                       <td className="border text-blue-400 px-4 py-2">
//                         <button
//                           className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
//                           onClick={() => copyToClipboard(fileUrl)}
//                         >
//                           Copy Link
//                         </button>
//                         {/* Link -{" "}
//                       <a target="_blank" href={`${fileUrl}`}>
//                         {fileUrl}
//                       </a> */}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FileList;
