import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { FileView } from "./file-view";

const accepted = [".epub", ".txt", ".fb2"];

function App() {
  const [file, setFile] = useState<File | null>();

  // useEffect(() => {
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.addEventListener("load", (event) => {
  //       console.log("data", event.target?.result);
  //     });

  //     reader.readAsText(file);
  //   }
  // }, [file]);

  return (
    <div className="App">
      <input
        type="file"
        id="file-selector"
        accept={accepted.join(",")}
        onChange={(event) => {
          setFile(event.target.files?.[0]);
        }}
      />
      {file && <FileView file={file} />}
    </div>
  );
}

export default App;
