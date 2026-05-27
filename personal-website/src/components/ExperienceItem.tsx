import type {PortfolioItem} from "../types/portfolio.ts";
import './ExperienceItem.css'

type Props = {
    item: PortfolioItem;
};

export function ExperienceItem({item}: Props) {
    return (
        <details className="item" key={item.title}>
            <summary>{item.title}</summary>
            <p>{item.summary}</p>

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
