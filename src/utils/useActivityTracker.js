import { useEffect, useState } from "react";
const useActivityTracker = (userId, logoutCallback) => {
    const [isActive, setIsActive] = useState(true);
    let inactivityTimeout;

    const resetTimer = () => {
        clearTimeout(inactivityTimeout);
        setIsActive(true);
        inactivityTimeout = setTimeout(() => {
            setIsActive(false);
            logoutCallback();
        }, 50000);
    };

    useEffect(() => {
        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
        resetTimer();
        return () => {
            window.addEventListener("mousemove", resetTimer);
            window.addEventListener("keydown", resetTimer);
            clearTimeout(inactivityTimeout);
        }
    }, []);
    return isActive;
}
export default useActivityTracker;