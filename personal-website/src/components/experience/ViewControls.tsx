import './ViewControls.css'
import {useExperienceContext} from "../../context/ExperienceContext.tsx";


type Props = {
    isFlatView: boolean;
    setIsFlatView: (isFlatView: boolean) => void;
}

export function RenderViewControls({isFlatView, setIsFlatView}: Props) {

    const {experienceViewControlsRef} = useExperienceContext();

    return (<div className="view-controls" ref={experienceViewControlsRef}>
        <label className="view-switch">
            <span>Flat view</span>
            <input
                type="checkbox"
                checked={isFlatView}
                onChange={(event) => setIsFlatView(event.target.checked)}
            />
            <span className="slider"></span>
        </label>
    </div>);
}