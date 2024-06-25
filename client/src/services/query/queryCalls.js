import { useQuery } from "react-query";
import { getProject, getProjects } from "../api/apiCalls";
const token = localStorage.getItem("token");
export const useProjects = () => {
  const result = useQuery(["projects"], () => getProjects({ token }));
  return result;
};

export const useProject = ({id}) => {
  const result = useQuery(["project", id], () => getProject({ token, id }));
  return result;
};
