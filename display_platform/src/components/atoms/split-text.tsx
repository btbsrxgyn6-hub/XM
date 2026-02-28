"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SplitTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  type?: "chars" | "words" | "lines";
  stagger?: number;
  ease?: string;
}

export function SplitText({
  text,
  delay = 0,
  duration = 0.6,
  className = "",
  type = "chars",
  stagger = 0.02,
  ease = "power2.out"
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current;
    
    // Create a GSAP timeline
    const tl = gsap.timeline({
      delay: delay / 1000, // Convert ms to seconds
      paused: true
    });

    // Split the text into spans
    const words = text.split(" ");
    const chars = text.split("");
    
    // Clear the container
    element.innerHTML = "";

    if (type === "words") {
      // Create word spans
      words.forEach((word, index) => {
        const wordSpan = document.createElement("span");
        wordSpan.textContent = word + (index < words.length - 1 ? " " : "");
        wordSpan.style.display = "inline-block";
        wordSpan.style.opacity = "0";
        wordSpan.style.transform = "translateY(20px)";
        element.appendChild(wordSpan);

        tl.to(wordSpan, {
          opacity: 1,
          y: 0,
          duration: duration,
          ease: ease,
          stagger: stagger
        }, index * stagger);
      });
    } else if (type === "chars") {
      // Create character spans
      chars.forEach((char, index) => {
        const charSpan = document.createElement("span");
        charSpan.textContent = char;
        charSpan.style.display = "inline-block";
        charSpan.style.opacity = "0";
        charSpan.style.transform = "translateY(20px)";
        element.appendChild(charSpan);

        tl.to(charSpan, {
          opacity: 1,
          y: 0,
          duration: duration,
          ease: ease,
          stagger: stagger
        }, index * stagger);
      });
    } else {
      // Default to lines (simple text)
      element.textContent = text;
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";

      tl.to(element, {
        opacity: 1,
        y: 0,
        duration: duration,
        ease: ease
      });
    }

    // Play the animation
    tl.play();

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, [text, delay, duration, type, stagger, ease]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ display: "inline-block", overflow: "hidden" }}
    />
  );
}