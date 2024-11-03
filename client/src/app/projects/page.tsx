import { projectsSources } from "./constants";
import { Row, Col } from "antd";
import Link from "next/link";
import Image from "next/image";

const ProjectItem = ({ source }: { source: ProjectItemType }) => (
  <div className="flex flex-row min-h-72 gap-2 p-4  rounded-md bg-blue-200 hover:bg-blue-100">
    <Link
      href={source.url}
      target={source.target}
      className="flex justify-center items-center cursor-pointer"
    >
      <div className="basis-1/2">
        <div className="text-2xl font-bold">{source.name}</div>
        <div className="text-lg">{source.description}</div>
      </div>
      <div className="basis-1/2 flex justify-center align-middle">
        <Image src={source.src} alt="bi image" width={120} height={80} />
      </div>
    </Link>
  </div>
);
const Projects = () => {
  return (
    <>
      <div className="flex flex-row gap-4">
        {projectsSources.map((item, index) => (
          <ProjectItem source={item} key={index} />
        ))}
      </div>
      <div className="relative flex flex-row justify-center align-middle mt-4 border rounded-md bg-[url('/ai.webp')] w-full h-72 bg-cover bg-center">
        <div className="absolute bottom-2">
          <h1 className="text-2xl font-bold">AI相关</h1>
          <div className="text-lg">AI前端应用，如LLM，agent，待完成 。。。</div>
        </div>
      </div>
    </>
  );
};

export default Projects;
