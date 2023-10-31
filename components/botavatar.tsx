import { Avatar, AvatarImage } from "@/components/ui/avatar";

function BotAvatar() {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1" src="/logo.webp" />
    </Avatar>
  );
}

export default BotAvatar;
