import { CustomButton } from ".";

type AIPicker = {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
  generatingImg: boolean;
  handleSubmit: (type: string) => void;
};

const AIPicker = (props: AIPicker) => {
  const { generatingImg, handleSubmit, prompt, setPrompt } = props;

  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea"
        placeholder="Ask AI..."
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      ></textarea>
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            type="outline"
            customStyles="text-xs"
            handleClick={() => {}}
          >
            Asking AI...
          </CustomButton>
        ) : (
          <>
            <CustomButton
              type="outline"
              customStyles="text-xs"
              handleClick={() => handleSubmit("logo")}
            >
              AI Logo
            </CustomButton>
            <CustomButton
              type="filled"
              customStyles="text-xs"
              handleClick={() => handleSubmit("full")}
            >
              AI Full
            </CustomButton>
          </>
        )}
      </div>
    </div>
  );
};

export default AIPicker;
