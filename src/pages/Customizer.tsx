import { AnimatePresence } from "framer-motion";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components";
import { useSnapshot } from "valtio";
import state from "../store";
import { motion } from "framer-motion";
import { fadeAnimation, slideAnimation } from "../config/motion";
import { DecalTypes, EditorTabs, FilterTabs } from "../config/constants";
import { useState } from "react";
import { reader } from "../config/helpers";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState<any>("");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeEditor, setActiveEditor] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditor) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            handleSubmit={handleSubmit}
            setPrompt={setPrompt}
            generatingImg={isGenerating}
          />
        );
    }
  };

  // check if we are showing logo or texture or both or nothing
  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;

      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    // update active filter tab
    setActiveFilterTab((prevState: any) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  // function for handling the file for decals picked using filepicker
  const handleDecals = (type: "logo" | "full", result: any) => {
    const decalType = DecalTypes[type];

    //@ts-ignore
    state[decalType.stateProperty] = result;

    //@ts-ignore
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  // function for reading file from filepicker
  const readFile = (type: "logo" | "full") => {
    reader(file!).then((res) => {
      handleDecals(type, res);
      setActiveEditor("");
    });
  };

  const handleSubmit = async (type: any) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setIsGenerating(true);

      console.log(type);
    } catch (error) {
      alert(error);
    } finally {
      setIsGenerating(false);
      setActiveEditor("");
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro ? (
        <>
          <motion.div
            key={"custom"}
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => {
                  return (
                    <Tab
                      key={tab.name}
                      tab={tab}
                      handleClick={() => {
                        setActiveEditor(tab.name);
                      }}
                    />
                  );
                })}

                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            >
              Go Back
            </CustomButton>
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => {
              return (
                <Tab
                  key={tab.name}
                  tab={tab}
                  handleClick={() => {
                    handleActiveFilterTab(tab.name);
                  }}
                  isActiveTab={
                    activeFilterTab[tab.name as keyof typeof activeFilterTab]
                  }
                  isFilterTab
                />
              );
            })}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
};

export default Customizer;
