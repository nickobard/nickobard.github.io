import {createContext, useContext, useRef, useState} from "react";
import type {ExperienceNode} from "../types/ExperienceNode.ts";
import {currentExperienceData} from "../data/currentExperienceData.tsx";

type ExperienceContextValue = {
    selectedTags: string[];
    toggleTag: (tag: string) => void;
    experienceData: ExperienceNode[];
    experienceViewControlsRef: React.RefObject<HTMLDivElement | null>;
};

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

export function ExperienceProvider({children}: { children: React.ReactNode }) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);


    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };


    const experienceViewControlsRef = useRef<HTMLDivElement | null>(null);


    return (
        <ExperienceContext.Provider value={{
            selectedTags,
            toggleTag,
            experienceData: currentExperienceData,
            experienceViewControlsRef
        }}>
            {children}
        </ExperienceContext.Provider>
    );
}

export function useExperienceContext() {
    const context = useContext(ExperienceContext);

    if (!context) {
        throw new Error("usePortfolioContext must be used inside PortfolioProvider");
    }

    return context;
}