import profilePhoto from "../assets/av_cropped_compressed.jpg";
import './ProfileIntro.css'
export function ProfileIntro() {
    return (
        <>
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
        </>
    );
}

