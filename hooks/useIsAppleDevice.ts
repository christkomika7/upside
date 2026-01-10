import { useState, useEffect } from "react";

export function useIsAppleDevice() {
    const [isAppleDevice, setIsAppleDevice] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || "";
        setIsAppleDevice(
            /iPhone|iPad|iPod|Macintosh/i.test(userAgent)
        );
    }, []);

    return isAppleDevice;
}
