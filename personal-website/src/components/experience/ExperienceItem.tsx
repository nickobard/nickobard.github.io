import type {ExperienceItem} from "../../types/experienceNodes.ts";
import "./ExperienceItem.css"

export function ExperienceItem({item}: { item: ExperienceItem }) {
    return (<details className="experience-item">
            <summary>
                <div className="experience-item-header">
                      <span className="experience-item-title">
                        {item.title}
                      </span>

                    <span className="experience-item-arrow"> ▶ </span>
                </div>

                <div className="experience-item-summary">
                    {item.summary}
                </div>
            </summary>
            {item.description && (
                <p className="experience-item-description">{item.description}</p>
            )}

            {item.details && (
                <ul>
                    {item.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                    ))}
                </ul>
            )}
        </details>
    );
}
