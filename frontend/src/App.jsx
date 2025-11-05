import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HairLengthSelector from "./components/HairLengthSelector";
import HairstyleGallery from "./components/HairstyleGallery";
import PhotoUploader from "./components/PhotoUploader";
import PreviewSection from "./components/PreviewSection";
import ActionButtons from "./components/ActionButtons";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1200/api";

function App() {
  const [hairLength, setHairLength] = useState("");
  const [hairstyles, setHairstyles] = useState([]);
  const [selectedHairstyle, setSelectedHairstyle] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [transform, setTransform] = useState({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (hairLength) {
      axios
        .get(`${API_URL}/hairstyles?length=${hairLength}`)
        .then((res) => setHairstyles(res.data))
        .catch((err) => setError("Failed to load hairstyles"));
    }
  }, [hairLength]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      axios
        .post(`${API_URL}/upload`, formData)
        .then((res) => {
          setUserImage(res.data.url);
          setError("");
        })
        .catch((err) => setError("Failed to upload image"));
    }
  };

  const captureFromCamera = () => {
    alert(
      "Camera capture not implemented in this demo. Please upload an image."
    );
  };

  const selectHairstyle = (hairstyle) => {
    setSelectedHairstyle(hairstyle);
    setTransform({ x: 0, y: 0, scale: 1, rotation: 0 });
  };

  const previewHairstyle = () => {
    if (!userImage || !selectedHairstyle) return;

    const userImg = new Image();
    userImg.crossOrigin = "anonymous";
    userImg.src = userImage;
    userImg.onload = () => {
      const hairstyleImg = new Image();
      hairstyleImg.crossOrigin = "anonymous";
      hairstyleImg.src = selectedHairstyle.image;
      hairstyleImg.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = userImg.width;
        canvas.height = userImg.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(userImg, 0, 0);

        ctx.save();
        ctx.translate(
          transform.x + userImg.width / 2,
          transform.y + userImg.height / 2
        );
        ctx.scale(transform.scale, transform.scale);
        ctx.rotate((transform.rotation * Math.PI) / 180);
        ctx.drawImage(
          hairstyleImg,
          -hairstyleImg.width / 2,
          -hairstyleImg.height / 2
        );
        ctx.restore();

        const dataURL = canvas.toDataURL();
        setPreviewImage(dataURL);
        setSuccess("Preview generated!");
      };
      hairstyleImg.onerror = () => setError("Failed to load hairstyle image");
    };
    userImg.onerror = () => setError("Failed to load user image");
  };

  const savePreview = () => {
    if (!userImage || !selectedHairstyle) return;
    const data = {
      userImageUrl: userImage,
      hairstyleId: selectedHairstyle.id,
      transform,
      finalImageUrl: previewImage,
    };
    axios
      .post(`${API_URL}/previews`, data)
      .then((res) => {
        toast.success("✅ Preview saved successfully!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setSuccess("Preview saved!");
      })
      .catch((err) => {
        toast.error("❌ Failed to save preview. Please try again.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setError("Failed to save preview");
      });
  };

  const reset = () => {
    setHairLength("");
    setHairstyles([]);
    setSelectedHairstyle(null);
    setUserImage(null);
    setPreviewImage(null);
    setTransform({ x: 0, y: 0, scale: 1, rotation: 0 });
    setError("");
    setSuccess("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h1 className="text-center mb-4 text-light">Virtual Hair Try-On</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <HairLengthSelector
            hairLength={hairLength}
            setHairLength={setHairLength}
          />

          {hairLength && (
            <HairstyleGallery
              hairstyles={hairstyles}
              selectedHairstyle={selectedHairstyle}
              selectHairstyle={selectHairstyle}
            />
          )}

          <PhotoUploader
            fileInputRef={fileInputRef}
            handleFileUpload={handleFileUpload}
            captureFromCamera={captureFromCamera}
          />

          {userImage && (
            <PreviewSection
              userImage={userImage}
              previewImage={previewImage}
              transform={transform}
              setTransform={setTransform}
            />
          )}

          <ActionButtons
            previewHairstyle={previewHairstyle}
            savePreview={savePreview}
            reset={reset}
            userImage={userImage}
            selectedHairstyle={selectedHairstyle}
            previewImage={previewImage}
          />
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
