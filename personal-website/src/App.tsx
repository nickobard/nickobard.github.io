import {useState} from "react";
import {portfolioItems} from "./data/portfolioItems";
import "./App.css";
import profilePhoto from "./assets/av_cropped_compressed.jpg";

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
            <section className="content">
                <section className="profile-card">
                    <img
                        src={profilePhoto}
                        alt="Nikita Bardatskii's photo"
                        className="profile-photo"
                    />

                </section>


                <section className="intro">
                    <h1>Nikita Bardatskii</h1>
                    <p>
                        Computer science student focused on machine learning, data science,
                        and AI. I build practical projects with Python, React, and modern web
                        tools.
                    </p>
                </section>

                <section className="experience">
                    <h2>Experience</h2>

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
            </section>
        </main>
    );
}

export default App;