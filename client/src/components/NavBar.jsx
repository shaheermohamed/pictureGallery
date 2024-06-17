import {
  CameraOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { AuthUser } from "../context/authContext";
const NavBar = () => {
  const { profile } = AuthUser();
  return (
    <header className="fixed top-0 left-0 w-full py-5 sm:px-10 px-5 flex justify-between items-center border-b border-b-stone-300 bg-white z-10">
    <nav className="flex w-full screen-max-width">
      <CameraOutlined style={{ fontSize: "1.2rem" }} />
      <div className="flex flex-1 justify-center max-sm:hidden">
        <div className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
          {profile?.businessName ? profile.businessName : ""}
        </div>
      </div>
      <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
        <SearchOutlined style={{ fontSize: "1.2rem" }} />
        <SettingOutlined style={{ fontSize: "1.2rem" }} />
      </div>
    </nav>
  </header>
  );
};

export default NavBar;
