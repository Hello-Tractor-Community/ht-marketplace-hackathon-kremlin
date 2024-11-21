import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface PrimaryButtonProps {
  children: ReactNode;
}

export function PrimaryButton({ children }: PrimaryButtonProps) {
  return (
    <div>
      <Button className="bg-primaryColor hover:bg-hoverColor text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 active:bg-hoverColor">
        {children}
      </Button>
    </div>
  );
}
