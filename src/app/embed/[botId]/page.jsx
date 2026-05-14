import ChatWidget from "@/components/ChatWidget";

export default function Page({
  params,
}) {
  return (
    <ChatWidget
      botId={params.botId}
    />
  );
}