import React from "react";
import { useState } from "react";
import { BsEmojiLaughing } from "react-icons/bs";
export default function EmojiKeyboard({ callback }) {
  const [showKeyboard, setShowKeyboard] = useState(0);

  const emojis = [
    "😆",
    "😅",
    "😂",
    "🤣",
    "🥲",
    "🥹",
    "☺️",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🥸",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😮‍💨",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🫣",
    "🤗",
    "🫡",
    "🤔",
    "🫢",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😶‍🌫️",
    "😐",
    "😑",
    "😬",
    "🫠",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "😲",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "😵‍💫",
    "🫥",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "😈",
    "👿",
    "👹",
    "👺",
    "🤡",
    "💩",
    "👻",
    "💀",
    "☠️",
    "👽",
    "👾",
    "🤖",
    "🎃",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
  ];
  const handlShow = () => setShowKeyboard(!showKeyboard);
  return (
    <div className="relative flex mx-2 items-center justify-center ">
      <button
        type="button"
        onClick={handlShow}
        className="bg-blue-800 text-gray-100 p-2 h-max w-max rounded-full text-2xl items-center"
      >
        <BsEmojiLaughing />{" "}
      </button>

      {showKeyboard ? (
        <div className="bottom-14 rounded-lg start-0  absolute w-64 p-2 bg-gray-800 h-48 overflow-y-auto">
          {emojis.map((i) => (
            <button
              type="button"
              key={i}
              className="text-lg mx-2"
              onClick={() => callback(i)}
            >
              {i}
            </button>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
