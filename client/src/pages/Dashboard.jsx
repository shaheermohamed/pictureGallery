import NavBar from "../components/NavBar";

const Dashboard = () => {
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

  return (
    <>
      <NavBar />
      <div className="pt-20 container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">All Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allProjectsImages.map((image, index) => (
            <div key={index} className="relative w-full h-auto group">
              <img
                src={image.src}
                alt={image.name}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg font-semibold">
                  {image.name}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 py-2 text-center rounded-b-lg">
                <span className="text-white text-sm font-medium">
                  {image.name}
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
