import { useEffect } from "react";

/**
 * 스크롤 복원
 * @param {string} key 스크롤 저장 대상
 */
export default function useScrollRestoration(key) {
    useEffect(() => {
        const savedPosition = sessionStorage.getItem(key);
        if (savedPosition) {
            console.log("스크롤 위치 : ", savedPosition);
            requestAnimationFrame(() => {
                window.scrollTo(0, parseInt(savedPosition, 10));
            });
        }
        return () => {
            sessionStorage.setItem(key, window.scrollY);
        };
    }, [key]);
}
