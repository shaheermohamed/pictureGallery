import { useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { Modal, Upload, message, Button, Spin } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UploadOutlined } from "@ant-design/icons";
import { addProject } from "../services/api/apiCalls";
import { useProjects } from "../services/query/queryCalls";
const schema = yup.object().shape({
  name: yup.string().required("Project Name is required"),
});
const Dashboard = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImagesUrl, setSelectedImagesUrl] = useState([]);
  const [isUploadingToCloudinary, setIsUploadingCloudinary] = useState(false);
  const inputFile = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data, refetch, isLoading } = useProjects();
  console.log("projects data:", data);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleReset = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };

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
  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    setIsUploading(true);

    try {
      const result = await addProject({ token, data, selectedImagesUrl });
      handleReset();
      setSelectedImagesUrl([]);
      refetch();
      message.success("Project uploaded successfully");

      console.log("Project uploaded successfully:", result);
    } catch (error) {
      message.error("Error uploading project");
      console.error("Error uploading project:", error);
    } finally {
      setIsUploading(false);
      setOpenModal(false);
    }
  };

  return (
    <>
      <NavBar setOpenModal={setOpenModal} />{" "}
      <form className="space-y-6">
        <Modal
          title="Add Your Project"
          open={openModal}
          onCancel={handleCancel}
          onOk={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2 ">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Project Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                {...register("name")}
                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <Upload
              accept="image/png, image/jpeg"
              type="file"
              // multiple
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
            </Upload>{" "}
            {/* {isUploading && <Spin />} */}
          </div>
        </Modal>
      </form>
      <div className="pt-20 container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">All Projects</h1>
        {isLoading ? (
          <div className="flex justify-center items-center mt-10">
            <Spin size="large"><h4 className="mt-20">Loading</h4></Spin>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.map((project, index) => (
              <div
                key={index}
                className="relative w-full h-auto group"
                onClick={() => {
                  navigate(`/project/${project._id}`);
                }}
              >
                <img
                  src={project.images[0]?.url}
                  alt={project.projectName}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-semibold">
                    {project.projectName}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 py-2 text-center rounded-b-lg">
                  <span className="text-white text-sm font-medium">
                    {project.projectName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
