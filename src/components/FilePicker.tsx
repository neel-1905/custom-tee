import { CustomButton } from ".";

type FILEPICKER = {
  file: any;
  readFile: any;
  setFile: any;
};

const FilePicker = (props: FILEPICKER) => {
  const { file, readFile, setFile } = props;
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files![0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload file
        </label>

        <div className="flex justify-between">
          <p>{file === "" ? "No file Selected!" : file?.name}</p>
          {file === "" ? null : <button onClick={() => setFile("")}>X</button>}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          handleClick={() => readFile("logo")}
          customStyles="text-xs"
        >
          Logo
        </CustomButton>
        <CustomButton
          type="filled"
          handleClick={() => readFile("full")}
          customStyles="text-xs"
        >
          Full
        </CustomButton>
      </div>
    </div>
  );
};

export default FilePicker;
