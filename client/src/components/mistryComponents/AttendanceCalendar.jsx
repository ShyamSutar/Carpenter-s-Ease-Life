import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const AttendanceCalendar = ({ events, components, handleSelectSlot }) => {
  return (<>
    <div className='min-w-[420px] overflow-x-auto' style={{ height: 500}}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%', margin: '50px' }}
        components={components}
        selectable={true}
        onSelectSlot={handleSelectSlot}
      />
    </div>
</>
  );
};

export default AttendanceCalendar;
