import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

export default function Row({ text, icon }: { text: string; icon: StaticImageData }) {
    return (
        <span className="flex gap-2 items-center">
            <Image src={icon} alt="" width={20} className="h-5" />
            {text}
        </span>
    );
}
