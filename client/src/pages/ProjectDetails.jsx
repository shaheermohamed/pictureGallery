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

const ProjectDetails = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesUrl, setSelectedImagesUrl] = useState([]);
  const [isUploadingToCloudinary, setIsUploadingCloudinary] = useState(false);
  const inputFile = useRef(null);
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
  const allProjectsImages = [
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1717682350/xdsqxycmh67rz8jt0qmx.png",
      name: "Project Alpha",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1717682263/yj0vvp5ety25npohulvm.jpg",
      name: "Project Beta",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1717599663/wmrfla0jvshtpvwmxz4s.png",
      name: "Project Gamma",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716996064/titviirah3u1idbytjm0.jpg",
      name: "Project Delta",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716996056/jymperbqcbrhsvrhsmcg.png",
      name: "Project Epsilon",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716995938/gbzfhwytelhtm3ovrgd2.png",
      name: "Project Zeta",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716995817/agw5y9sv9bvb8jjygsjx.jpg",
      name: "Project Eta",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716995582/lqlwk8a7blp8lqody5cx.jpg",
      name: "Project Theta",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716995498/nx8fqkjmscjdlydguoyu.jpg",
      name: "Project Iota",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716989713/pypoj4twlpuufejky8fh.png",
      name: "Project Kappa",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716988108/cld-sample-5.jpg",
      name: "Project Lambda",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716988107/cld-sample-4.jpg",
      name: "Project Mu",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716988107/cld-sample-3.jpg",
      name: "Project Nu",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716988106/cld-sample-2.jpg",
      name: "Project Xi",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716988104/samples/dessert-on-a-plate.jpg",
      name: "Project Omicron",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716988103/samples/cup-on-a-table.jpg",
      name: "Project Pi",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716988103/samples/coffee.jpg",
      name: "Project Rho",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716988101/samples/man-portrait.jpg",
      name: "Project Sigma",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716988101/samples/man-on-a-street.jpg",
      name: "Project Tau",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716988100/samples/man-on-a-escalator.jpg",
      name: "Project Upsilon",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716988099/samples/look-up.jpg",
      name: "Project Phi",
    },
    {
      src: "https://res.cloudinary.com/deagxexgl/image/upload/v1716988098/samples/balloons.jpg",
      name: "Project Chi",
    },
  ];

  console.log("selectedImages:", selectedImages);
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

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   for (let image of files) {
  //     handlePic(image);
  //   }
  //   // setSelectedImages((prevImages) => [...prevImages, ...files]);
  // };

  const handleImageUpload = async () => {
    const token = localStorage.getItem("token");
    setIsUploading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/project/addImages",
        // formData,
        {
          id: "667179451ae5e06e03db933f",
          allImages: selectedImagesUrl,
        },
        {
          headers: {
            Authorization: token,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      handleReset();
      setSelectedImagesUrl([]);
      message.success("Images uploaded successfully");

      console.log("Images uploaded successfully:", response.data);
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
            <div className="w-full h-full object-cover rounded-lg shadow-md flex justify-center items-center flex-wrap">
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
                <Button icon={<UploadOutlined />}>
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
          {allProjectsImages.map((image, index) => (
            <>
              <div key={index} className="relative w-full h-auto">
                <Image
                  key={index}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                  // width={200}
                  src={image.src}
                  alt={image.name}
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
