import { projectsSources } from "./constants";
import { Row, Col } from "antd";
import Link from "next/link";
import Image from "next/image";

const ProjectItem = ({ source }: { source: ProjectItemType }) => (
  <div className="flex flex-row gap-2 p-4 border border-current border-solid rounded">
    <div className="basis-1/2">
      <div className="text-2xl font-bold">{source.name}</div>
      <div className="text-lg">{source.description}</div>
    </div>
    <div className="basis-1/2 flex justify-center align-middle">
      <Link
        href={source.url}
        className="flex justify-center items-center cursor-pointer"
      >
        <Image src="/bi.webp" alt="bi image" width={120} height={80} />
      </Link>
    </div>
  </div>
);
const Projects = () => {
  return (
    <div className="flex flex-col gap-4">
      {projectsSources.map((item) => (
        <ProjectItem source={item} />
      ))}
    </div>
  );
};

export default Projects;
