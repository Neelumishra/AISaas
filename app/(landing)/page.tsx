import { Button } from "@/components/ui/button";
import Link from "next/link"
function landingPage() {
  return (
    <div>
      <Link href="/sign-up">
        {" "}
        <Button>Sign-Up</Button>
      </Link>
      <Link href="/sign-in">
        {" "}
        <Button>Sign-In</Button>
      </Link>
      
    </div>
  );
}

export default landingPage;