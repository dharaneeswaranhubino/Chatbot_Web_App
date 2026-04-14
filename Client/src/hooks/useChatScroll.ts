import { useEffect, useRef } from "react";

export const useChatScroll = <T extends HTMLElement>(dependency: any[]) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dependency]);

  return ref;
};