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
  CopyOutlined,
} from "@ant-design/icons";
import { Image, Space, Button, message, Upload, Spin } from "antd";
import { useRef, useState } from "react";
import { addImages } from "../services/api/apiCalls";
import { useProject } from "../services/query/queryCalls";
import { useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { id } = useParams();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImagesUrl, setSelectedImagesUrl] = useState([]);
  const [isUploadingToCloudinary, setIsUploadingCloudinary] = useState(false);
  const inputFile = useRef(null);
  const { data, refetch, isLoading } = useProject({ id });
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
  const handleCopy = () => {
    const url = "https://picturegallery.onrender.com";
    const text = `${url}/${data?._id}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success(`Link copied successfully :${text}`);
      })
      .catch((err) => {
        message.error("Error while copying");
      });
  };

  return (
    <>
      <NavBar />
      <div className="pt-20 container mx-auto p-4">
        <div className="flex flex-row justify-center items-center gap-2 mb-6">
          <h1 className="text-3xl font-bold text-center">
            {data?.projectName}
          </h1>
          <Button icon={<CopyOutlined />} onClick={handleCopy}></Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center mt-10">
            <Spin size="large">
              <h4 className="mt-20">Loading</h4>
            </Spin>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="mb-4 relative w-full h-auto">
              <div className="w-full h-full object-cover rounded-lg shadow-md flex justify-center items-center flex-wrap gap-2 flex-col">
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
        )}
      </div>
    </>
  );
};

export default ProjectDetails;
