// 웹 페이지의 모든 요소(HTML, CSS 등)가 로드된 후에 이 코드를 실행
document.addEventListener('DOMContentLoaded', () => {
    
    // 퀴즈 데이터 객체: 각 오브젝트의 ID를 키로 사용해 질문과 정답을 저장
    const quizData = {
        bottle: {
            question: "이 물병은 저의 물건일까요? 네, 아니오로 답해주세요.",
            answer: "아니오"
        },
        book: {
            question: "이 책은 저의 물건일까요? 네, 아니오로 답해주세요.",
            answer: "아니오"
        },
        snack: {
            question: "이 과자는 저의 물건일까요? 네, 아니오로 답해주세요.",
            answer: "네"
        }
    };

    // HTML에서 필요한 요소들을 ID나 클래스를 이용해 가져오기
    const objects = document.querySelectorAll('.object'); // 모든 오브젝트
    const modal = document.getElementById('quiz-modal'); // 모달창
    const closeButton = document.querySelector('.close-button'); // 닫기 버튼
    const quizQuestion = document.getElementById('quiz-question'); // 질문 표시 영역
    const quizAnswer = document.getElementById('quiz-answer'); // 답변 입력창
    const submitButton = document.getElementById('submit-answer'); // 정답 확인 버튼
    const quizResult = document.getElementById('quiz-result'); // 결과 표시 영역

    let currentQuizId = null; // 현재 활성화된 퀴즈의 ID를 저장할 변수

    // 모든 오브젝트(물병, 책, 과자)에 대해 클릭 이벤트 설정
    objects.forEach(obj => {
        obj.addEventListener('click', () => {
            currentQuizId = obj.id; // 클릭된 오브젝트의 id를 저장 (e.g., "bottle")
            const questionText = quizData[currentQuizId].question; // id에 해당하는 질문을 가져옴
            
            // 모달창 내용 설정
            quizQuestion.textContent = questionText; // 질문을 모달에 표시
            quizAnswer.value = ''; // 이전에 입력했던 답변이 있다면 초기화
            quizResult.textContent = ''; // 이전에 봤던 결과 메시지가 있다면 초기화
            
            // 모달창을 화면에 보이게 함
            modal.style.display = 'block';
        });
    });

    // "정답 확인" 버튼을 클릭했을 때의 동작
    const checkAnswer = () => {
        // 사용자가 입력한 값의 양쪽 공백을 제거
        const userAnswer = quizAnswer.value.trim();
        // 현재 퀴즈의 정답을 가져옴
        const correctAnswer = quizData[currentQuizId].answer;

        // 정답 비교
        if (userAnswer === correctAnswer) {
            quizResult.textContent = "정답입니다! 🎉";
            quizResult.style.color = 'green'; // 정답일 때 초록색 글씨
        } else {
            quizResult.textContent = "틀렸어요! 다시 도전해주세요!";
            quizResult.style.color = 'red'; // 오답일 때 빨간색 글씨
        }
    };
    
    // 정답 확인 버튼에 클릭 이벤트 연결
    submitButton.addEventListener('click', checkAnswer);

    // 입력창에서 Enter 키를 눌렀을 때도 정답 확인
    quizAnswer.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    // 닫기(X) 버튼을 클릭했을 때 모달창을 숨김
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 모달 창 바깥의 어두운 배경을 클릭했을 때 모달창을 숨김
    window.addEventListener('click', (event) => {
        // 클릭한 대상이 모달 배경 그 자체일 경우
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});