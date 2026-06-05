import "./App.css";

import {ProfileIntro} from "./components/ProfileIntro.tsx";
import {TagSelector} from "./components/TagSelector.tsx";
import {Experience} from "./components/Experience/Experience.tsx";
import {ExperienceProvider} from "./context/ExperienceContext.tsx";


function App() {
    return (
        <main className="page">
            <section className="content">
                <ProfileIntro/>
                <section className="experience">
                    <h1>Experience</h1>
                    <hr/>
                    <ExperienceProvider>
                        <TagSelector/>
                        <Experience/>
                    </ExperienceProvider>
                </section>
            </section>
        </main>
    );
}

export default App;