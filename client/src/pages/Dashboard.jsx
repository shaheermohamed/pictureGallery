import { useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { Modal, Upload, message, Button, Spin } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
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

  const { data, refetch } = useProjects();
  console.log("projects data:", data);

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
      </div>
    </>
  );
};

export default Dashboard;
