import { useEffect, useState } from "react";

const pageSize = 2000;

export const FileView = ({ file }: { file: File }) => {
  const [text, setText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        setIsLoading(false);
        setText((event.target?.result as string) ?? "");
      });

      reader.addEventListener("loadstart", (event) => {
        setIsLoading(true);
      });

      reader.readAsText(file);
    }
  }, [file]);

  useEffect(() => {
    if (text) {
      if (file.name.endsWith(".fb2")) {
        const xmlParser = new DOMParser();
        const xmlBook = xmlParser.parseFromString(text, "application/xml");

        let parsedText = "";

        const special = ["."];
        const tags = [
          "first-name",
          "middle-name",
          "last-name",
          ".",
          "book-title",
          ".",
          "annotation",
        ];

        for (const tag of tags) {
          if (special.includes(tag)) {
            parsedText += tag;
            continue;
          }
          const elements = xmlBook.getElementsByTagName(tag);

          if (elements.length && elements[0].childNodes.length) {
            for (const node of elements[0].childNodes) {
              parsedText += " " + node.nodeValue;
            }
          }
        }

        console.log("result: ", parsedText);
      }
    }
  }, [text]);

  return (
    <>
      <div
        style={{
          marginTop: "8px",
          border: "1px gray solid",
          borderRadius: "8px",
          width: "50vw",
          height: "70vh",
          textAlign: "left",
          padding: "8px 16px",
          overflowY: "auto",
          overflowX: "hidden",
          wordBreak: "break-all",
        }}
      >
        {isLoading && "Loading..."}
        {!isLoading && (
          <div
            dangerouslySetInnerHTML={{
              __html: text.substring(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              ),
            }}
          ></div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginTop: "8px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={() => setCurrentPage(currentPage - 1)}>{"<"}</button>
        {currentPage}
        <button onClick={() => setCurrentPage(currentPage + 1)}>{">"}</button>
      </div>
    </>
  );
};
