import type {ExperienceItem} from "../../types/experienceNodes.ts";
import "./ExperienceItem.css"

export function ExperienceItem({item}: { item: ExperienceItem }) {
    return (<details className="experience-item">
            <summary className="experience-summary">
                <div className="experience-header">
                      <span className="experience-title">
                        {item.title}
                      </span>

                    <span className="experience-arrow"> ▶ </span>
                </div>

                <div className="experience-excerpt">
                    {item.summary}
                </div>
            </summary>
            {item.description && (
                <p>{item.description}</p>
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
