import { useEffect, useState } from "react";

export function useResizeObserver(ref?: React.RefObject<HTMLElement | null>) {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (!ref?.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setHeight(entry.contentRect.height);
            }
        });

        const el = ref.current;
        observer.observe(el);

        return () => {
            observer.unobserve(el);
            observer.disconnect();
        };
    }, [ref?.current]);

    return height;
}
