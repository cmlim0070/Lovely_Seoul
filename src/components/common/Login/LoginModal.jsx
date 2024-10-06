import { useState } from "react";
import useAuth from "../../../store/useAuth";
import useModal from "../../../store/useModal";
import "./LoginModal.css";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
    const navigate = useNavigate();

    const { isOpen, closeModal } = useModal();
    const { setUsername, setUserage, login } = useAuth();

    const [username, setName] = useState("");
    const [userage, setAge] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/");
        setUsername(username);
        setUserage(userage);
        login();
        closeModal(); // 모달 닫기
    };

    if (!isOpen) return null;

    return (
        <div className="loginmodal__background">
            <div className="loginmodal">
                <div className="loginmodal__title">로그인</div>
                <div className="loginmodal__desc">
                    간단한 정보를 입력하시면
                    <br />
                    좋은 정보를 추천해드릴게요!
                </div>
                <div className="loginmodal__userinput">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="username"
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <select
                            value={userage}
                            onChange={(e) => setAge(e.target.value)}
                        >
                            <option value="10대">10대</option>
                            <option value="20대">20대</option>
                            <option value="30대">30대</option>
                            <option value="40대">40대</option>
                            <option value="50대">50대</option>
                            <option value="60대">60대</option>
                            <option value="기타">기타</option>
                        </select>
                        <button type="submit">continue</button>
                    </form>
                </div>
                <button onClick={closeModal}>닫기</button>
            </div>
        </div>
    );
}
