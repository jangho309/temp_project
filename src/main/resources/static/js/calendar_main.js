document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById('calendar');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const todayButton = document.getElementById('today');
    const calendarPanel = document.getElementById('calendar-panel');
    const panelTitle = document.getElementById('panel-title');
    const panelContent = document.getElementById('panel-content');

    let date = new Date();
    date.setDate(1);
    let selectedDateElement = null;
    let todayDateElement = null; // 오늘 날짜 요소를 저장할 변수

    function renderCalendar() {
        calendar.innerHTML = '';
        const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
        for (let i = 0; i < daysOfWeek.length; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('header');
            dayElement.textContent = daysOfWeek[i];
            calendar.appendChild(dayElement);

            // 토요일과 일요일의 폰트 색상 설정
            if (i === 5) { // 토요일
                dayElement.classList.add('saturday');
            } else if (i === 6) { // 일요일
                dayElement.classList.add('sunday');
            }
        }

        const month = date.getMonth();
        const year = date.getFullYear();

        currentMonthYear.textContent = `${year}.${(month + 1).toString().padStart(2, '0')}`;

        const firstDay = (date.getDay() + 6) % 7;
        const lastDate = new Date(year, month + 1, 0).getDate();

        // 이전 달의 마지막 날짜
        const prevLastDate = new Date(year, month, 0).getDate();

        // 이전 달 날짜 추가
        for (let i = 0; i < firstDay; i++) {
            const prevDateElement = document.createElement('div');
            prevDateElement.classList.add('day', 'prev-month');
            prevDateElement.textContent = prevLastDate - firstDay + i + 1;
            calendar.appendChild(prevDateElement);
        }

        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();

        for (let day = 1; day <= lastDate; day++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('day');
            dateElement.textContent = day;
            calendar.appendChild(dateElement);

            const currentDayOfWeek = (firstDay + day - 1) % 7;

            // 토요일과 일요일의 폰트 색상 설정
            if (currentDayOfWeek === 5) { // 토요일
                dateElement.classList.add('saturday');
            } else if (currentDayOfWeek === 6) { // 일요일
                dateElement.classList.add('sunday');
            }

            // 특정 날짜에 텍스트 추가
            if (day === 27 && month == 6 && year == 2024 || day == 28 && month == 6 && year == 2024) {
                const userSchedule = document.createElement('div');
                userSchedule.textContent = "1박 2일 부산여행~";
                userSchedule.style.fontSize = "15px";
                userSchedule.style.background = "#eccccf"; // 텍스트 색상 변경 가능
                userSchedule.style.color = "#ffffff";
                userSchedule.style.marginTop = "15px";
                userSchedule.style.paddingTop = "10px";
                userSchedule.style.padding = "none";
                dateElement.classList.add('userSchedule');
                dateElement.appendChild(userSchedule);

                userSchedule.addEventListener("click", () => {
                    calendarPanel.style.display = 'block';
                });
            } 
            

            if (day === todayDate && month === todayMonth && year === todayYear) {
                dateElement.style.border = "1px solid #007bff";
                todayDateElement = dateElement; // 오늘 날짜 요소를 저장
            }

            dateElement.addEventListener("mouseover", () => {
                dateElement.style.border = "1px solid #007bff";
            });

            dateElement.addEventListener("mouseout", () => {
                if (!(day === todayDate && month === todayMonth && year === todayYear) && dateElement !== selectedDateElement) {
                    dateElement.style.border = "1px solid #ddd";
                }
            });

            dateElement.addEventListener("click", () => {
                if (selectedDateElement && selectedDateElement !== dateElement) {
                    if (selectedDateElement === todayDateElement) {
                        todayDateElement.style.border = "1px solid #007bff";
                    } else {
                        selectedDateElement.style.border = "1px solid #ddd";
                    }
                }
                if (dateElement === todayDateElement) {
                    todayDateElement.style.border = "1px solid #FFC061";
                } 
                else {
                    dateElement.style.border = "1px solid #FFC061";
                }
                selectedDateElement = dateElement;

                if (day === 27 && month == 6 && year == 2024 || day == 28 && month == 6 && year == 2024) {
                    calendarPanel.style.display = 'block';
                } else {
                    calendarPanel.style.display = 'none';
                }
            });
        }

        // 다음 달 날짜 추가
        const totalCells = firstDay + lastDate;
        const nextMonthDays = (7 - (totalCells % 7)) % 7; // 다음 달 날짜 표시할 수 있는 셀 수

        for (let i = 1; i <= nextMonthDays; i++) {
            const nextDateElement = document.createElement('div');
            nextDateElement.classList.add('day', 'next-month');
            nextDateElement.textContent = i;
            calendar.appendChild(nextDateElement);
        }

    }

    prevButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() - 1);
        renderCalendar();
    });

    nextButton.addEventListener('click', () => {
        date.setMonth(date.getMonth() + 1);
        renderCalendar();
    });

    todayButton.addEventListener('click', () => {
        date = new Date();
        date.setDate(1);
        renderCalendar();
        if (selectedDateElement) {
            selectedDateElement.style.border = "1px solid #007bff";
            selectedDateElement = null;
        }
        calendarPanel.style.display = 'none';
    });

    document.addEventListener("click", (event) => {
        const withinBoundaries = event.composedPath().includes(calendarPanel) || event.composedPath().includes(calendar);
        if (!withinBoundaries) {
            calendarPanel.style.display = 'none';
        }
    });

    renderCalendar(); // 페이지 로드 시 달력 초기화
});
