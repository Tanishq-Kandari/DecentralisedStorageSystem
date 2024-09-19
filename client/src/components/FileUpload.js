import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3N2FlZTY0MS01ZDJkLTQ5OTgtODM5NS0xOWM4NjM5MmQ4ZGMiLCJlbWFpbCI6InRhbmlzaHFrYW5kYXJpMjAxOGphbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYmE4OTgxNmU5NGFiNjMwN2Y2ZGQiLCJzY29wZWRLZXlTZWNyZXQiOiI0YzMzMTE4ZGEzMWY4YTJhMzJlZGQ2ODE0YmI0YmQxYTRkN2U4Mzg2NTlhNGE4NjNlZTBjOGEyNzhlNzE1ZDIwIiwiZXhwIjoxNzUyOTUyMjQ2fQ.gOIB2QwXG6AQ-Gy9c3hS-DbFyrF5Py4OGA3hmcxUCP0";
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            Authorization: `Bearer ${JWT}`,
            pinata_api_key: `ba89816e94ab6307f6dd`,
            pinata_secret_api_key: `24c33118da31f8a2a32edd6814bb4bd1a4d7e838659a4a863ee0c8a278e715d20`,
            "Content-Type": "multipart/form-data",
          },
        })
          
         /* const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${JWT}`,
            },
            body: formData,
          });
          const resData = await res.json();
        */
        //const ImgHash = `https://gateway.pinata.cloud/ipfs/${resData.data.IpfsHash}`;
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        
        await contract.add(account,ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    //alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0]; //files array of files object
   //console.log(data);
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image:{fileName}</span>
        <button type="submit" className="upload" disabled={!file}> 
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
