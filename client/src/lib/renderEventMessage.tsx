import { Frame } from "@gptscript-ai/gptscript";

const renderEventMessage = (event: Frame) => {
  switch (event.type) {
    case "callStart":
      return (
        <div>
          <p>Tool Starting:{event.tool?.description}</p>
        </div>
      );
    case "callChat":
      return (
        <div>
          Chat in progress with your put {">>"} {String(event.input)}
        </div>
      );
    case "callProgress":
      return null;
    case "callFinish":
      return (
        <div>
          Call Finished:{" "}
          {event.output?.map((output) => (
            <div key={output.content}>{output.content}</div>
          ))}
        </div>
      );
    case "runFinish":
      return <div>Run Finished at {event.end}</div>;
    case "callSubCalls":
      <div>
        Sub-calls in progress"
        {event.output?.map((output, index) => (
          <div key={index}>
            <div>{output.content}</div>
            {output.subCalls &&
              Object.keys(output.subCalls).map((subCallKey) => {
                return (
                  <div key={subCallKey}>
                    <strong>Subcall {subCallKey}:</strong>
                    <strong>
                      Tool ID: {output.subCalls[subCallKey].toolID}
                    </strong>
                    <div>Input:{output.subCalls[subCallKey].input}</div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>;
    default:
      return <pre>{JSON.stringify(event, null, 2)}</pre>;
  }
};
export default renderEventMessage;
