import {ExperienceItem} from "./ExperienceItem.tsx";
import {portfolioItems} from "../data/portfolioItems.ts";
import {usePortfolioContext} from "../context/PortfolioContext.tsx";
import './ExperienceList.css'

export function ExperienceList() {
    const {selectedTags} = usePortfolioContext();

    const filteredItems =
        selectedTags.length === 0
            ? portfolioItems
            : portfolioItems.filter((item) =>
                selectedTags.every((tag) => item.tags.includes(tag))
            );

    return (<div className="items">
        {filteredItems.map((item) => (
            <ExperienceItem item={item}/>
        ))}
    </div>);
}

