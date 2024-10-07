import { useEffect, useState } from "react";
import useFocus from "../../../../store/useFocus";
import "./Title.css";

export default function FestivalTitle() {
    const { focusedPlace } = useFocus();
    const [title, setTitle] = useState({
        keyword: "",
        main: "",
        desc: "",
    });

    useEffect(() => {
        if (focusedPlace) {
            setTitle({
                keyword: `${focusedPlace}`,
                main: `의 지금!`,
                desc: "주변의 문화행사를 확인해보세요!",
            });
        } else {
            setTitle({
                keyword: "",
                main: "",
                desc: "",
            });
        }
    }, [focusedPlace]);

    return (
        <div>
            <div className="title__main">
                <span className="title__main__blue">{title.keyword}</span>
                {title.main}
            </div>
            {title.desc && <div className="title__desc">{title.desc}</div>}
        </div>
    );
}