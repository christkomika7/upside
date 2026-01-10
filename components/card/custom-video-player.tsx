"use client";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Spinner } from "../ui/spinner";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { PulsatingButton } from "../magicui/pulsating-button";

interface CustomVideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  className?: string;
  onReady?: () => void;
  onError?: () => void;
  rounded?: "sm" | "middle" | "lg";
  pos?: "top" | "bottom";
}

export default function CustomVideoPlayer({
  src,
  autoPlay = false,
  className,
  onReady,
  onError,
  rounded = "lg",
  pos = "top",
}: CustomVideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [state, setState] = useState(0);
  const playerRef = useRef<HTMLVideoElement>(null);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    if (playerRef.current?.paused) {
      setPause(true);
      return;
    }
    setPause(false);
  }, [playerRef.current]);

  useEffect(() => {
    if (!isLoading && state === 0) {
      setState(1);
      setFirstLoading(false);
    }
  }, [isLoading]);

  return (
    <div className="group relative w-full h-full">
      {firstLoading && (
        <div className="top-0 left-0 absolute w-full h-full">
          <Skeleton className="bg-neutral-300 rounded-none w-full h-full" />
        </div>
      )}
      <div
        className={clsx(
          "hidden left-3 z-20 absolute group-hover:flex flex-col gap-1.5 h-full",
          pos === "top" ? "top-3" : "bottom-3"
        )}
      >
        <PulsatingButton
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (playerRef.current?.paused) {
              playerRef.current?.play();
              setPause(false);
              return;
            }
            playerRef.current?.pause();
            setPause(true);
          }}
          pulseColor="bg-neutral-300"
          className="flex justify-center items-center bg-neutral-100/80 backdrop-blur-xl rounded-full w-6 h-6 cursor-pointer"
        >
          {pause && (
            <PlayIcon className="fill-neutral-800 stroke-neutral-800 w-4 h-4 text-neutral-800" />
          )}
          {!pause && (
            <PauseIcon className="fill-neutral-800 stroke-neutral-800 w-4 h-4 text-neutral-800" />
          )}
        </PulsatingButton>
        {isLoading && (
          <span className="flex justify-center items-center bg-neutral-400/30 backdrop-blur-sm rounded-full w-8 h-8">
            <Spinner className="w-4 h-4 text-neutral-800" />
          </span>
        )}
      </div>
      <video
        preload="metadata"
        ref={playerRef}
        muted
        autoPlay={autoPlay}
        loop
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onLoadedData={() => setIsLoading(false)}
        className={clsx(
          "w-full h-full object-center object-cover overflow-hidden",
          rounded === "lg"
            ? "rounded-[32px]"
            : rounded === "sm"
              ? "rounded-lg"
              : "rounded-t-[32px]"
        )}
      >
        <source src={src} />
      </video>
    </div>
  );
}
