import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const eventPropGetter = (event) => {
  let backgroundColor;
  
  if(event.title === "H"){
    backgroundColor = '#F3E5AB'
  }else if(event.title === "P"){
    backgroundColor = '#D5F4A8'
  }else if(event.title === "O"){
    backgroundColor = '#A7DFF7'
  }else{
    backgroundColor = '#F7A9A4'
  }
  return { style: { backgroundColor } };
};

const AttendanceCalendar = ({ events, components, handleSelectSlot }) => {
  return (<>
    <div className='min-w-[420px] overflow-x-auto' style={{ height: '650px', padding: '20px'}}>
      <Calendar
        localizer={localizer}
        events={events}
        views={['month', 'week', 'day']} 
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100% - 50px)'}}
        components={components}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={eventPropGetter}
      />
    </div>
</>
  );
};

export default AttendanceCalendar;
