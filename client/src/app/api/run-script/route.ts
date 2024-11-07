import { NextRequest, NextResponse } from "next/server";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import g from "@/lib/gptScriptInstance";
import gptscript from "@gptscript-ai/gptscript";

const script = "app/api/run-script/story-book.gpt";

export async function POST(request: Request) {
  const { story, pages, path } = await request.json();

  const opts: RunOpts = {
    disableCache: true,
    input: `--story ${story} --pages ${pages} --path ${path}`,
  };
  console.log(22, opts, g.run);

  try {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const run = await g.run(script, opts);
          run.on(RunEventType.Event, (data) => {
            controller.enqueue(
              encoder.encode(`event: ${JSON.stringify(data)}\n\n`)
            );
          });
          await run.text();
          controller.close();
        } catch (error) {
          console.log("test-error-", g);

          controller.error(error);
          console.log(error);
        }
      },
    });
    console.log("stream-", stream);

    // return NextResponse.json({ message: "Script executed successfully!" });
    return NextResponse.json(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
    // return new Response(stream, {
    //   headers: {
    //     "Content-Type": "text/event-stream",
    //     "Cache-Control": "no-cache",
    //     Connection: "keep-alive",
    //   },
    // });
  } catch (error) {
    return NextResponse.json({
      error: error,
      status: 500,
    });
  }
}
