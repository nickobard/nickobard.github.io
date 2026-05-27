import {createContext, useContext, useState} from "react";

type PortfolioContextValue = {
    selectedTags: string[];
    toggleTag: (tag: string) => void;
};

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({children}: { children: React.ReactNode }) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);


    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };


    return (
        <PortfolioContext.Provider value={{selectedTags, toggleTag}}>
            {children}
        </PortfolioContext.Provider>
    );
}

export function usePortfolioContext() {
    const context = useContext(PortfolioContext);

    if (!context) {
        throw new Error("usePortfolioContext must be used inside PortfolioProvider");
    }

    return context;
}