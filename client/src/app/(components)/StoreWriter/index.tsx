"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import renderEventMessage from "@/lib/renderEventMessage";
import { Frame } from "@gptscript-ai/gptscript";
import { parse } from "path";
import { useState } from "react";
import { ReadableStreamDefaultReader } from "stream/web";

const storiesPath = "public/stories";

const StoreWriter = () => {
  const [story, setStory] = useState<string>("");
  const [pages, setPages] = useState<number>();
  const [progress, setProgress] = useState("");
  const [runStarted, setRunStarted] = useState(false);
  const [runFinished, setRunFinished] = useState<boolean | null>(null);
  const [currentTool, setCurrentTool] = useState("");
  const [events, setEvents] = useState<Frame[]>([]);

  const runScript = async () => {
    setRunStarted(true);
    setRunFinished(false);
    console.log(11);

    try {
      const response = await fetch("/api/run-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          story,
          pages,
          path: storiesPath,
        }),
      });
      console.log("response==", response);

      if (response.ok && response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        handleStream(reader, decoder);
      } else {
        setRunFinished(true);
        setRunStarted(false);
      }
    } catch (error) {
      console.log("fetch:", error);
    }
  };

  const handleStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    decoder: TextDecoder
  ) => {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        // setRunFinished(true);
        // setRunStarted(false);
        break;
      }
      const chunk = decoder.decode(value, { stream: true });
      const eventData = chunk
        .split("\n\n")
        .filter((line) => line.startsWith("event: "))
        .map((line) => line.replace(/^event: /, ""));
      eventData.forEach((data) => {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.type === "callProgress") {
            setProgress(
              parsedData.output[parsedData.output.length - 1].content
            );
            setCurrentTool(parsedData.tool?.description || "");
          } else if (parsedData.type === "callStart") {
            setCurrentTool(parsedData.tool?.description || "");
          } else if (parsedData.type === "runFinish") {
            setRunFinished(true);
            setRunStarted(false);
          } else {
            setEvents((prevEvents) => [...prevEvents, parsedData]);
          }
        } catch (error) {
          console.log("Error parsing event data:", error);
        }
      });
    }
  };
  return (
    <div className="flex flex-col container">
      <section className="flex-1 flex-col border border-blue-20  rounded-md p-10 space-y-2">
        <Textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="flex-1 texxt-black"
          placeholder="write a stroy..."
        ></Textarea>
        <Select onValueChange={(value) => setPages(parseInt(value))}>
          <SelectTrigger>
            <SelectValue placeholder="How many pages should the story be?" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => (
              <SelectItem key={i} value={String(i + 1)}>
                {i + 1} page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          //   disabled={!story || !pages || runStarted}
          onClick={runScript}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          generate story
        </Button>
      </section>
      <section className="flex-1 pb-5 mt-5">
        <div className="flex flex-col-reverse w-full space-y-2 bg-gray-800 rounded-md text-gray-200 font-mono p-10 h-96 overflow-y-auto">
          <div>
            {runFinished === null && (
              <>
                <p className="animate-pulse mr-5">
                  waiting to generate a story above...
                </p>
              </>
            )}
            <span className="mr-5">{">>"}</span>
            {progress}
          </div>
          {/* currentTool */}
          {currentTool && (
            <div className="py-10">
              <span className="mr-5">
                {"--- [Current Tool] ---"}
                {currentTool}
              </span>
              <br />
            </div>
          )}
          {/* render event */}
          <div className="space-y-5">
            {events.map((event, index) => (
              <div key={index}>
                <span className="mr-5">{">>"}</span>
                {renderEventMessage(event)}
              </div>
            ))}
          </div>
          {/* runStarted */}
          {runStarted && (
            <div>
              <span className="mr-5 animate-in">
                {"--- [AI story generation  has started] ---"}
              </span>
              <br />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default StoreWriter;
