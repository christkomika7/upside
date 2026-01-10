"use client";
import { useParams } from "next/navigation";
import EditHouseForm from "../../_components/edit-house-form";

export default function EditHousePage() {
  const id = useParams().id as string;
  return (
    <div className="space-y-10 pt-10">
      <EditHouseForm id={id} />
    </div>
  );
}
