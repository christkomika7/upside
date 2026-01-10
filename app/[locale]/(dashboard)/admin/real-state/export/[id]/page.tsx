"use client";
import { useParams } from "next/navigation";
import ExportToImage from "../../_components/export-to-image";

export default function RealStateInfos() {
  const id = useParams().id as string;

  return (
    <>
      <ExportToImage id={id} />
    </>
  );
}
