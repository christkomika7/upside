"use client";
import { useParams } from "next/navigation";
import RealstateInfo from "../_components/realstate-info";

export default function RealStateInfos() {
  const id = useParams().id as string;

  return (
    <>
      <RealstateInfo id={id} />
    </>
  );
}
