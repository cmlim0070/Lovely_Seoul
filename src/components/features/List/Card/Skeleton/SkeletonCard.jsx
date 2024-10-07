import "./SkeletonCard.css";

export default function SkeletonCard() {
    return (
        <div className="skeleton">
            <div className="skeleton__img" />
            <div className="skeleton__text skeleton__title" />
            <div className="skeleton__text skeleton__location" />
            <div className="skeleton__text skeleton__desc" />
            <div className="skeleton__gender">
                <div className="skeleton__text skeleton__gender-female" />
                <div className="skeleton__text skeleton__gender-male" />
            </div>
            <div className="skeleton__text skeleton__congest" />
            <div className="skeleton__text skeleton__age" />
        </div>
    );
}
