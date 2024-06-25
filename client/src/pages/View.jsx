import {
  DownloadOutlined,
  UndoOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import { Image, Space, Spin } from "antd";
import { useViewProject } from "../services/query/queryCalls";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const { data, isLoading } = useViewProject({ id });

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

  return (
    <>
      <div className="pt-20 container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">All Projects</h1>

        {isLoading ? (
          <div className="flex justify-center items-center mt-10">
            <Spin size="large">
              <h4 className="mt-20">Loading</h4>
            </Spin>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

export default View;
