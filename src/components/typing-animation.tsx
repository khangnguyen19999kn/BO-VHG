"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  interval?: number;
  className?: string;
}

export default function TypingAnimation({
  text,
  duration = 200,
  interval = 500,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [i, setI] = useState<number>(0);
  const isDisplayFullText = displayedText.length === text.length;

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        setI(i + 1);
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [duration, i, text]);

  useEffect(() => {
    const clearText = setTimeout(() => {
      if (isDisplayFullText && interval > 0) {
        setI(0);
        setDisplayedText("");
      }
    }, interval);
    return () => {
      clearTimeout(clearText);
    };
  }, [interval, isDisplayFullText]);

  return (
    <h1
      className={cn(
        "font-display text-center text-4xl font-bold leading-[5rem] tracking-[-0.02em] drop-shadow-sm",
        className
      )}
    >
      {displayedText ? displayedText : text}
    </h1>
  );
}
