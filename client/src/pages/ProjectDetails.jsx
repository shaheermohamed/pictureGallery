import NavBar from "../components/NavBar";
import {
  DownloadOutlined,
  UndoOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Image, Space, Button, message, Upload } from "antd";
import { useRef, useState } from "react";
import axios from "axios";
import { addImages } from "../services/api/apiCalls";
import { useProject } from "../services/query/queryCalls";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImagesUrl, setSelectedImagesUrl] = useState([]);
  const [isUploadingToCloudinary, setIsUploadingCloudinary] = useState(false);
  const inputFile = useRef(null);
  const { data, refetch } = useProject({ id });
  console.log("single project:", data);
  const handleReset = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };

  const onDownload = (src) => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  console.log("selectedImagesUrl:", selectedImagesUrl);
  const handlePic = (pic) => {
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      setIsUploadingCloudinary(true);
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "picture-gallery");
      data.append("cloud_name", "shaheer");
      fetch("https://api.cloudinary.com/v1_1/deagxexgl/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSelectedImagesUrl((prevImages) => [...prevImages, data.url]);
          setIsUploadingCloudinary(false);
        })
        .catch((err) => {
          setIsUploadingCloudinary(false);
          console.log(err);
        });
    }
  };

  const handleImageUpload = async () => {
    const token = localStorage.getItem("token");
    setIsUploading(true);
    try {
      const result = await addImages({
        token,
        id,
        selectedImagesUrl,
      });

      handleReset();
      setSelectedImagesUrl([]);
      refetch();
      message.success("Images uploaded successfully");
      console.log("Images uploaded successfully:", result);
    } catch (error) {
      message.error("Error uploading images");
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="pt-20 container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">All Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="mb-4 relative w-full h-auto">
            <div className="w-full h-full object-cover rounded-lg shadow-md flex justify-center items-center flex-wrap gap-2">
              <Upload
                accept="image/png, image/jpeg"
                type="file"
                multiple
                beforeUpload={(file) => {
                  handlePic(file);
                  return false;
                }}
                showUploadList={false}
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={isUploadingToCloudinary}
                >
                  Select Images {selectedImagesUrl?.length}
                </Button>
              </Upload>
              {!isUploadingToCloudinary && selectedImagesUrl.length > 0 ? (
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  onClick={handleImageUpload}
                  loading={isUploading}
                >
                  Upload Images
                </Button>
              ) : null}
            </div>
          </div>
          {data?.images?.map((image, index) => (
            <>
              <div key={index} className="relative w-full h-auto">
                <Image
                  key={index}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  // width={200}
                  src={image?.url}
                  alt={image._id}
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                          onReset,
                        },
                      }
                    ) => (
                      <Space size={12} className="toolbar-wrapper">
                        <DownloadOutlined
                          onClick={() => onDownload(image.src)}
                        />
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined
                          disabled={scale === 1}
                          onClick={onZoomOut}
                        />
                        <ZoomInOutlined
                          disabled={scale === 50}
                          onClick={onZoomIn}
                        />
                        <UndoOutlined onClick={onReset} />
                      </Space>
                    ),
                  }}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
