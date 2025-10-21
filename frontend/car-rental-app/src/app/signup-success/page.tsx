import Image from "next/image";
import SuccessSvg from "../../../public/svgs/success-screen.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="space-y-5 py-4 px-8">
        <h1 className="font-bold text-2xl md:text-4xl text-center">Account successfully created</h1>
        <p className="mt-3 mb-4 text-sm md:text-base text-[#939393] text-center">
          Hurray, your account has been created, let get you started!
        </p>
        <div className="flex justify-center">
          <Image
            src={SuccessSvg}
            alt="Illustration of two happy people"
            width={300}
            height={300}
            priority
          />
        </div>
        <Link
          href="/login"
          className="block max-w-sm mx-auto"
        >
          <Button
            type="submit"
            className="w-full bg-[#FF9F1C] py-6 rounded-2xl hover:bg-[#D17D18] font-semibold text-sm cursor-pointer"
          >
            Log in
          </Button>
        </Link>
      </div>
    </div>
  );
}
