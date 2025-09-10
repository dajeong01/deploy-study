/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import * as s from './styles';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import MainContainer from '../../../components/MainContainer/MainContainer';
import usePrincipalQuery from '../../../queries/User/usePrincipalQuery';
import useGetMyGatheringQuery from '../../../queries/User/useGetMyGatheringQuery';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const principalQuery = usePrincipalQuery();
  const userId = principalQuery?.data?.data?.body?.user.userId;

  const MyGatheringQuery = useGetMyGatheringQuery(userId);  
  const gatheringList = MyGatheringQuery?.data?.body;
  
  const [events, setEvents] = useState({});

  useEffect(() => {
    if (gatheringList) {
      const mappedEvents = {};
      gatheringList.forEach((g) => {
        if (!mappedEvents[g.runningDate]) {
          mappedEvents[g.runningDate] = [];
        }
        mappedEvents[g.runningDate].push({
          title: g.title,
          crewName: g.crewName,
          placeName: g.placeName,
          runningTime: g.runningTime,
          km: g.km,
          cost: g.cost
        });
      });
      setEvents(mappedEvents);
    }
  }, [gatheringList]);
  

  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const navigateMonth = (direction) => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + direction)));
  const formatDateKey = (date, day) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  const isToday = (date, day) => {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           day === today.getDate();
  };

  const renderCalendarDays = () => {
    const firstDay = getFirstDayOfMonth(currentDate);
    const daysInMonth = getDaysInMonth(currentDate);
    const days = [];

    for (let i = 0; i < firstDay; i++) days.push(<div key={`empty-${i}`} css={s.emptyCell}></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentDate, day);
      const event = events[dateKey];
      const today = isToday(currentDate, day);
      const isSelected = selectedDate === dateKey;

      let cellStyle = s.dayCell;
      if (today) cellStyle = s.dayCellToday;
      else if (isSelected) cellStyle = s.dayCellSelected;

      days.push(
        <div key={day} onClick={() => {
          if (selectedDate === dateKey && showSidebar) {
            setShowSidebar(false);
            setSelectedDate(null);
          } else {
            setSelectedDate(dateKey);
            setShowSidebar(true);
          }
        }} css={cellStyle}>
          <span>{day}</span>
          {event && <Circle css={today || isSelected ? s.eventDotSelected : s.eventDotDefault} />}
        </div>
      );
    }
    return days;
  };

  return (
    <MainContainer>
      <div css={s.mainLayout}>
        <div css={showSidebar ? s.calendarWrapper : s.calendarWrapperFullWidth}>
          <div css={s.header}>
            <div css={s.headerContent}>
              <button onClick={() => navigateMonth(-1)} css={s.navButton}><ChevronLeft size={24} /></button>
              <h1 css={s.headerTitle}>{currentDate.getFullYear()}.{String(currentDate.getMonth() + 1).padStart(2, '0')}</h1>
              <div css={s.headerRight}>
                <button onClick={() => navigateMonth(1)} css={s.navButton}><ChevronRight size={24} /></button>
              </div>
            </div>
          </div>

          <div css={s.weekDaysContainer}>
            {weekDays.map((day, index) => (
              <div key={day} css={index===0||index===6?s.weekDayWeekend:s.weekDayWeekday}>{day}</div>
            ))}
          </div>

          <div css={s.calendarGrid}>
            <div css={s.daysGrid}>{renderCalendarDays()}</div>
          </div>
        </div>

        {showSidebar && selectedDate && (
          <div css={s.selectedDateContainer}>
            <div css={s.selectedDateInfo}>
              <div css={s.selectedDateTitle}>선택된 날짜: {selectedDate}</div>
              {events[selectedDate] ? (
                  <div>
                    {events[selectedDate].map((ev, idx) => (
                    <div key={idx} css={s.eventBox}>
                      <h3 css={s.selectedEventTitle}>정모 이름 : {ev.title}</h3>
                      <p>크루 이름 : {ev.crewName}</p>
                      <p>모임장소 : {ev.placeName}</p>
                      <p>만남 시간 : {ev.runningTime}</p>
                      <p>총 거리 : {ev.km} KM</p>
                      <p>회비 : {ev.cost} 원</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p css={s.noEventText}>일정이 없습니다</p>
              )}
            </div>
          </div>
          )}
      </div>
    </MainContainer>
  );
}

export default Calendar;