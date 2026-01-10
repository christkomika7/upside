"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useRef } from "react";
import { useResizeObserver } from "@/hooks/useResizeObserver";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type OverlapProps = {
  children: React.ReactNode;
  ready?: boolean;
  state?: number;
  ref?: RefObject<HTMLDivElement | null>;
};

export default function Overlap({ children, ready, state, ref }: OverlapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const height = useResizeObserver(ref);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      const panels =
        containerRef.current.querySelectorAll<HTMLDivElement>(".pane");
      panels.forEach((pane) => {
        const paneHeight = pane.offsetHeight;
        const viewportHeight = window.innerHeight;
        const isSmaller = paneHeight < viewportHeight;

        ScrollTrigger.create({
          trigger: pane,
          start: isSmaller ? "top top" : "bottom bottom",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });

      ScrollTrigger.refresh();
    },
    {
      scope: containerRef,
      dependencies: [
        ready ?? true,
        state ?? 0,
        ref?.current?.clientHeight ?? 0,
        height ?? 0,
      ],
    }
  );

  return <div ref={containerRef}>{children}</div>;
}
