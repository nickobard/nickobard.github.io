import type {ExperienceItem} from "../../types/experienceNodes.ts";
import "./ExperienceItem.css"

export function ExperienceItem({item}: { item: ExperienceItem }) {
    return (<details className="experience-item">
        <summary>{item.title}</summary>
        <p>{item.summary}</p>
    {item.details && (
        <ul>
            {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                ))}
        </ul>
    )}
    </details>);
}