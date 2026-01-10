"use client";
import { useEffect, useState } from "react";
import { Paperclip, Image } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/fille-upload";
import clsx from "clsx";
import { LIMIT_FILE, MAX_FILE_SIZE } from "@/lib/constant";

const FileSvgDraw = ({ isIcon }: { isIcon: boolean }) => {
  return (
    <>
      <svg
        className="mb-3 w-8 h-8 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-gray-500 dark:text-gray-400 text-sm">
        <span className="font-semibold">Uploader l'image</span>
        &nbsp; ou faire un glisser déposer
      </p>
      <p className="text-gray-500 dark:text-gray-400 text-xs">
        {isIcon ? "SVG" : "MP4, WEBM, MOV, WEBP, PNG, JPG, GIF"}
      </p>
    </>
  );
};

type InputFileProps = {
  error: boolean;
  handleFiles: (data: File | File[] | null) => void;
  hasUnique?: boolean;
  isIcon?: boolean;
  value?: File;
  defaultImage?: string;
};

export default function InputFile({
  handleFiles,
  error,
  hasUnique = false,
  isIcon = false,
  value,
  defaultImage,
}: InputFileProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [hasDefaultImage, setHasDefaultImage] =
    useState<boolean>(!!defaultImage);

  // Initialiser les fichiers si une valeur est fournie
  useEffect(() => {
    if (value && files.length === 0) {
      setFiles([value]);
    }
  }, [value]);

  // Observer les changements de fichiers et notifier le parent
  useEffect(() => {
    if (files && files.length > 0) {
      handleFiles(hasUnique ? files[0] : files);
    } else if (files.length === 0 && !hasDefaultImage) {
      handleFiles([]);
    } else if (hasDefaultImage && (!files || files.length === 0)) {
      handleFiles([]);
    }
  }, [files]);

  // Supprimer les fichiers si l'image par défaut est activée
  useEffect(() => {
    if (hasDefaultImage && files.length > 0) {
      setFiles([]);
    }
  }, [hasDefaultImage]);

  const onValueChange = (newFiles: File[] | null) => {
    if (newFiles && newFiles.length > 0) {
      setFiles(newFiles);
      setHasDefaultImage(false);
    } else {
      setFiles([]);
    }
  };

  const dropZoneConfig = {
    maxFiles: hasUnique ? 1 : LIMIT_FILE,
    maxSize: MAX_FILE_SIZE,
    multiple: !hasUnique,
  };

  return (
    <div className="relative">
      {hasDefaultImage && files.length === 0 && defaultImage && (
        <div className="mb-2">
          <div className="flex items-center justify-between p-2 bg-background border border-neutral-400/30 rounded-lg">
            <div className="flex items-center">
              <Image className="w-4 h-4 mr-2" />
              <span className="text-sm">Image par défaut</span>
            </div>
            <button
              type="button"
              className="text-sm text-destructive hover:underline"
              onClick={() => setHasDefaultImage(false)}
            >
              Supprimer
            </button>
          </div>
        </div>
      )}

      <FileUploader
        value={files}
        onValueChange={onValueChange}
        dropzoneOptions={dropZoneConfig}
        className={clsx(
          "relative bg-background p-2 border border-neutral-400/30 rounded-lg",
          error && "border-destructive",
        )}
      >
        <FileInput className="outline-1 outline-dashed outline-white">
          <div className="flex flex-col justify-center items-center pt-3 pb-4 w-full">
            <FileSvgDraw isIcon={isIcon} />
          </div>
        </FileInput>
        <FileUploaderContent>
          {files &&
            files.length > 0 &&
            files.map((file, i) => (
              <FileUploaderItem
                key={i}
                index={i}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Paperclip className="stroke-current w-4 h-4" />
                <span>{file.name}</span>
              </FileUploaderItem>
            ))}
        </FileUploaderContent>
      </FileUploader>
    </div>
  );
}
