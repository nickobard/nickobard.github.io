import { useState } from "react";
import { portfolioItems } from "./data/portfolioItems";
import "./App.css";

function App() {
  // retrieving all the tags
  const allTags = [...new Set(portfolioItems.flatMap((item) => item.tags))];

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
        prev.includes(tag)
            ? prev.filter((t) => t !== tag)
            : [...prev, tag]
    );
  };

  const filteredItems =
      selectedTags.length === 0
          ? portfolioItems
          : portfolioItems.filter((item) =>
              selectedTags.every((tag) => item.tags.includes(tag))
          );

  return (
      <main className="page">
        <aside className="photo-panel" />

        <section className="content">
          <div className="tags">
            {allTags.map((tag) => (
                <button
                    key={tag}
                    className={selectedTags.includes(tag) ? "tag active" : "tag"}
                    onClick={() => toggleTag(tag)}
                >
                  {tag}
                </button>
            ))}
          </div>

          <div className="items">
            {filteredItems.map((item) => (
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
            ))}
          </div>
        </section>
      </main>
  );
}

export default App;