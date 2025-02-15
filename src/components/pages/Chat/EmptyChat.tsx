import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "@/components/ui/Buttons/Button";

import {
  MessageCircle,
  Sparkles,
  Send,
  Smile,
  Image,
  Paperclip,
} from "lucide-react";

const tips = [
  "Try sharing a photo to start the conversation",
  "Ask a question to break the ice",
  "Share what's on your mind",
  "Send a friendly hello",
  "Share an interesting link",
];

const EmptyChat = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [showTip, setShowTip] = useState(0);

  const getRandomTip = () => {
    let newTip;
    do {
      newTip = Math.floor(Math.random() * tips.length);
    } while (newTip === showTip);
    setShowTip(newTip);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6">
      <div
        className="relative group cursor-pointer mb-6"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={getRandomTip}
      >
        <div
          className={`p-4 rounded-full bg-gradient-to-br from-blue to-purple-500 shadow-lg transform transition-all duration-300 ${isHovering ? "scale-105" : ""}`}
        >
          <MessageCircle className="w-10 h-10 text-white" />
        </div>

        <div
          className={`absolute transition-all duration-500 ${isHovering ? "opacity-100" : "opacity-0"}`}
        >
          <Send className="w-5 h-5 text-green-950 absolute -top-6 -right-4 transform rotate-12" />
          <Image className="w-5 h-5 text-purple-400 absolute -bottom-5 -right-6" />
          <Smile className="w-5 h-5 text-pink-400 absolute -bottom-4 -left-5" />
          <Paperclip className="w-5 h-5 text-indigo-400 absolute -top-4 -left-3 transform -rotate-45" />
          <Sparkles className="w-5 h-5 text-yellow-400 absolute top-0 right-0" />
        </div>
      </div>

      <div className="text-center space-y-2 max-w-md">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue to-purple-500 bg-clip-text text-transparent">
          Start Something Amazing
        </h3>
        <p className="text-dark text-sm animate-fade-in">
          Every great conversation starts with a single message
        </p>
        <div className="p-2 rounded-lg border shadow-sm overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              className="text-xs italic"
              key={showTip}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.3 }}
            >
              💡 Tip: {tips[showTip]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <Button
          onClick={getRandomTip}
          className="px-4 text-[14px] py-1.5 bg-gradient-to-r from-blue to-purple-500 text-white rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          New Tip
        </Button>
      </div>
    </div>
  );
};

export default EmptyChat;
