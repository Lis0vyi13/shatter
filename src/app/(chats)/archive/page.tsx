import ChatBlock from "@/components/Chat/ChatBlock";

export async function generateMetadata() {
  return {
    title: "Archive",
  };
}

const ArchivePage = () => {
  return (
    <div className="chat-page overflow-hidden flex flex-1">
      <ChatBlock />
    </div>
  );
};

export default ArchivePage;
