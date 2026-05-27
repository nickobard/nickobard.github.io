import "./App.css";

import {ProfileIntro} from "./components/ProfileIntro.tsx";
import {TagSelector} from "./components/TagSelector.tsx";
import {ExperienceList} from "./components/ExperienceList.tsx";
import {PortfolioProvider} from "./context/PortfolioContext.tsx";


function App() {
    return (
        <main className="page">
            <section className="content">
                <ProfileIntro/>
                <section className="experience">
                    <h1>Experience</h1>
                    <hr/>
                    <PortfolioProvider>
                        <TagSelector/>
                        <ExperienceList/>
                    </PortfolioProvider>
                </section>
            </section>
        </main>
    );
}

export default App;