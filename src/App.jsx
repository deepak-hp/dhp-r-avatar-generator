import "remixicon/fonts/remixicon.css";
import "animate.css";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const data = [
  {
    label: "Illustration",
    value: "illustration",
    url: "https://api.dicebear.com/7.x/avataaars/svg?seed=",
  },
  {
    label: "Cartoon",
    value: "cartoon",
    url: "https://api.dicebear.com/7.x/adventurer/svg?seed=",
  },
  {
    label: "Sketchy",
    value: "sketchy",
    url: "https://api.dicebear.com/7.x/croodles/svg?seed=",
  },
  {
    label: "Bots",
    value: "bots",
    url: "https://api.dicebear.com/7.x/bottts/svg?seed=",
  },
  {
    label: "PixelArt",
    value: "pixelart",
    url: "https://api.dicebear.com/7.x/pixel-art/svg?seed=",
  },
  {
    label: "Male",
    value: "male",
    url: "https://randomuser.me/api/portraits/men/",
  },
  {
    label: "Female",
    value: "female",
    url: "https://randomuser.me/api/portraits/women/",
  },
];

const App = () => {
  const [type, setType] = useState(data[0].value);
  const [src, setSrc] = useState("");

  const generate = () => {
    let avatarObj = data.find((item) => item.value === type);
    let imgUrl = "";

    if (type === "male" || type === "female") {
      console.log(type);
      let randomNum0to99 = Math.floor(Math.random() * 100);
      imgUrl = `${avatarObj.url}${randomNum0to99}.jpg`;
    } else {
      const uniqueValue = Date.now();
      imgUrl = `${avatarObj.url}${uniqueValue}`;
    }

    setSrc(imgUrl);
  };

  useEffect(() => {
    generate();
  }, [type]);

  const download = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `avatar_${type}_${Date.now()}.${
      type == "male" || type == "female" ? ".jpg" : ".svg"
    }`;
    a.click();
    a.remove();
  };
  const onCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast("image url copied", { position: "top-center" });
  };
  return (
    <div className="animate__animated animate_fadeIn overflow-hidden min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-white">
      <div className="animate__animated animate__bounceIn flex flex-col gap-6 items-center w-full max-w-md rounded-2xl shadow-xl backdrop-blur-xl border border-slate-700 p-10">
        <img
          src={src || "vite.svg"}
          alt="avatar"
          className="w-32 h-32 rounded-full border-4 border-state-700 shadow-lg object-cover bg-white"
        />
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-wide">
            Avatart generator
          </h1>
          <p className="text-slate-300">
            Generate unlimited avatars for your website
          </p>
        </div>
        <div className="w-full flex flex-col gap-4">
          <select
            className="bg-slate-900/60 w-full p-3 rounded-xl"
            onChange={(e) => setType(e.target.value)}
            value={type}
          >
            {data.map((item, index) => (
              <option key={`${item.label}_${index}`} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <div className="bg-slate-900/60 w-full p-3 rounded-xl">
            {src || "https://..."}
          </div>
        </div>
        <div className="flex w-full gap-4">
          <button
            onClick={generate}
            className="flex-1 bg-linear-to-r from-rose-500 to-orange-600 font-medium rounded-lg px-4 py-2 hover:scale-105 transition-transform"
          >
            <i className="ri-arrow-right-up-line mr-1"></i>
            Change
          </button>
          <button
            onClick={() => download(src)}
            className="flex-1 bg-linear-to-r from-green-500 to-cyan-600 font-medium rounded-lg px-4 py-2 hover:scale-105 transition-transform"
          >
            <i className="ri-download-fill mr-1"></i>
            Download
          </button>
          <button
            onClick={() => onCopy(src)}
            className="flex-1 bg-linear-to-r from-orange-500 to-amber-600 font-medium rounded-lg px-4 py-2 hover:scale-105 transition-transform"
          >
            <i className="ri-file-copy-line mr-1"></i>
            Copy
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
