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
            <div className="intro-text">
                <p>
                    Hello 👋. I am a tech enthusiast, who likes to use technologies to solve different kinds of problems, that actually help somebody to achieve better quality of service. I do have experience in software engineering, grasping every aspect of it in some degree. I also have some experience in Data Science.
                </p>

                <p>
                    My current choice of my further career development is whether Software Engineering, Data Analytics. I also am interested in future pursue some hardware education and robotics (currently i have little experience), as those skills in future can be really usefull, as our society will proceed to further automation (hopefully not through human replacement).
                </p>
            </div>
        </section>
        </>
    );
}

