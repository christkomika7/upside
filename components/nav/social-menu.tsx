import Link from "next/link";
import React from "react";
import { FacebookIcon, InstagramIcon, Linkedin2Icon } from "../ui/icon";

export default function SocialMenu() {
  return (
    <ul className="hidden mds:flex gap-x-1.5">
      <li>
        <Link
          href="https://www.facebook.com/upsidegabon"
          target="_blank"
          className="flex items-center !w-5 !h-5"
        >
          <FacebookIcon className="left-0.5 relative fill-neutral-700" />
        </Link>
      </li>
      <li>
        <Link
          href="https://www.instagram.com/upside_gabon/"
          target="_blank"
          className="flex justify-center items-center !w-5 !h-5"
        >
          <InstagramIcon className="fill-neutral-700" />
        </Link>
      </li>
      <li>
        <Link
          href="https://www.linkedin.com/company/upside-gabon-agence-immobilière/?viewAsMember=true"
          target="_blank"
          className="flex justify-center items-center !w-5 !h-5"
        >
          <Linkedin2Icon className="fill-neutral-700" />
        </Link>
      </li>
    </ul>
  );
}
