import {useState} from "react";
import {portfolioItems} from "./data/portfolioItems";
import "./App.css";
import profilePhoto from "./assets/av_cropped_compressed.jpg";

function App() {
    // retrieving all the tags
    const allTags = [...new Set(portfolioItems.flatMap((item) => item.tags))];

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagQuery, setTagQuery] = useState("");
    const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

    const visibleTags =
        tagQuery.trim() === ""
            ? allTags
            : allTags.filter((tag) =>
                tag.toLowerCase().includes(tagQuery.toLowerCase())
            );

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
                    <p style={{paddingTop: "2rem"}}>
                        Computer science student focused on machine learning, data science,
                        and AI. I build practical projects with Python, React, and modern web
                        tools.
                    </p>
                </section>

                <section className="experience">
                    <h1>Experience</h1>

                    <hr />

                    <div className="tags" style={{paddingTop: "2rem"}}>
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

                    <div className="tag-selector">
                        <input
                            className="tag-search"
                            type="text"
                            placeholder="Search tags..."
                            value={tagQuery}
                            onFocus={() => setIsTagDropdownOpen(true)}
                            onChange={(event) => {
                                setTagQuery(event.target.value);
                                setIsTagDropdownOpen(true);
                            }}
                        />

                        {isTagDropdownOpen && (
                            <div className="tag-dropdown">
                                {visibleTags.map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        className={selectedTags.includes(tag) ? "tag active" : "tag"}
                                        onClick={() => toggleTag(tag)}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        )}
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