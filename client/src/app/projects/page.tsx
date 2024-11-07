import { projectsSources } from "./constants";
import { Row, Col } from "antd";
import Link from "next/link";
import Image from "next/image";

const ProjectItem = ({ source }: { source: ProjectItemType }) => (
  <div className="flex flex-col min-h-72 gap-2 p-2  rounded-md bg-blue-100 hover:bg-blue-200">
    <Link
      href={source.url}
      target={source.target}
      className="h-full flex flex-col  items-center cursor-pointer"
    >
      <div className="text-lg font-bold m-2">{source.name}</div>
      <div className="flex flex-1 items-center  justify-center gap-2">
        <div className="basis-1/2 ">{source.description}</div>
        <div className="basis-1/2 flex justify-center align-middle">
          <Image src={source.src} alt="bi image" width={120} height={80} />
        </div>
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
      {/* <div className="relative flex flex-row justify-center align-middle mt-4 border rounded-md bg-[url('/ai.webp')] w-full h-72 bg-cover bg-center">
        <div className="absolute bottom-2">
          <h1 className="text-2xl font-bold">AI相关</h1>
          <div className="text-lg">AI前端应用，如LLM，agent，待完成 。。。</div>
        </div>
      </div> */}
    </>
  );
};

export default Projects;
