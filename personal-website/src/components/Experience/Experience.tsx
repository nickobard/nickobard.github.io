import {filterExperienceByTags} from "../../utils/filterExperienceByTags.ts"
import {useMemo, useState} from "react";
import "./Experience.css"
import {useExperienceContext} from "../../context/ExperienceContext.tsx";

import {RenderViewControls} from "./ViewControls.tsx";
import {ExperienceList} from "./ExperienceList/ExperienceList.tsx";
import {ExperienceTree} from "./ExperienceTree/ExperienceTree.tsx";
import {imputeExperienceTreeFolderDates} from "../../utils/imputeExperienceFolderDates.ts";
import {imputeExperienceTreeTags} from "../../utils/imputeTransitiveClosureTags.ts";


export function Experience() {

    const [isFlatView, setIsFlatView] = useState(false);

    const {experienceData, selectedTags} = useExperienceContext();

    const filteredExperienceData = useMemo(
        () => imputeExperienceTreeFolderDates(
            filterExperienceByTags(
                imputeExperienceTreeTags(experienceData),
                selectedTags
            )
        ),
        [experienceData, selectedTags]
    );


    return (<div className="experience-content">

        <RenderViewControls isFlatView={isFlatView} setIsFlatView={setIsFlatView}/>

        {isFlatView ? (
            <ExperienceList nodes={filteredExperienceData}/>
        ) : (
            <ExperienceTree nodes={filteredExperienceData}/>
        )}

    </div>);
}
