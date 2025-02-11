import React, { useState } from 'react';
import S from './style';
import UserImg2 from './image/UserImg2.png';
import { useSelector } from 'react-redux';

const CommentForm = ({ addList, id }) => {
    const [contentvalue, setContentValue] = useState("");
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleChange = (e) => {
        setContentValue(e.target.value);   
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setContentValue('');
        if(!contentvalue.trim()) return;

        const newComment = {
            content: contentvalue,
            post : id // 게시글 id 추가
        };
        
        console.log("보낼 데이터 :", newComment);
        // setContentValue('');

        try {
            const response = await fetch("http://localhost:8000/community/addComment", {
                method : "POST",
                headers : { "Content-Type" : "application/json" },
                body : JSON.stringify(newComment),
            })

            if(!response.ok) throw new Error("댓글 저장 실패");

            const result = await response.json();
            console.log('서버 응답 : ', result);

            addList(result.newComment); // 댓글 리스트 갱신

        } catch(error) {
            console.error("댓글 추가 중 오류:", error);
            alert("댓글을 추가하는 중 오류가 발생했습니다.");
        }
    }
    
    return (
        <S.typing>
            <img src={UserImg2} alt='유저프로필' />
            <form onSubmit={handleSubmit}>
                <span className='box'>
                    <input 
                        className='commentInput'
                        type="text"
                        value={contentvalue}
                        onChange={handleChange}
                        placeholder={'칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다 :)'}
                    />
                </span>
                <button type="submit" className='submitBt' disabled={!contentvalue.trim()}>
                    입력
                </button>
            </form>
        </S.typing>
    );
};

export default CommentForm;