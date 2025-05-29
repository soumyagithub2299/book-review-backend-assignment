let existingMeeting = [
    
    {start:"11:30 am",end:"12:30 pm"},
    {start:"02:00 pm",end:"03:00 pm"},
    {start:"04:00 pm",end:"05:00 pm"},

]

function isTimeSlotAvailable(existingMeeting, newMeetingObject) {



    function timeToMin(tm){
let [hours,minutes]=timeToMin.split(":");

    }

const newStart = timeToMin(newMeetingObject.start);
const newEnd = timeToMin(newMeetingObject.end);



for( cosnt m of existingMeeting){

    const start = timeToMin(m.start);
    const end = timeToMin(m.end);
if(newStart < end && newEnd > start) {
        return false; // Overlapping time slot
    }

}

return true; // No overlap, time slot is available

}


const newMeeting = {start:"12:00 pm",end:"03:00 pm"}
