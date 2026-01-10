import { useScopedI18n } from "@/locales/client";
import { toast } from "sonner";

type MobileCopyButtonProps = {
  children: React.ReactNode;
  url: string;
};

export default function MobileCopyButton({
  children,
  url,
}: MobileCopyButtonProps) {
  const t = useScopedI18n("toast.share.navigator");
  const handleCopy = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Upside",
          url: url,
        });
        toast.success(t("success"));
      } catch (error) {
        toast.error(t("error"));
      }
    } else {
      toast.error(t("wrongNavigator"));
    }
  };

  return (
    <div onClick={handleCopy} className="cursor-pointer pointer-events-auto">
      {children}
    </div>
  );
}
