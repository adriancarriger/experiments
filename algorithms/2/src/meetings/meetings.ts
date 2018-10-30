export default (meetings: Meeting[]) => {
  meetings.sort((a, b) => a.startTime - b.startTime);
  let meeting: Meeting = meetings[0];

  const mergedMeetings = [];

  for (let i = 1; i < meetings.length; i++) {
    if (meetings[i].startTime > meeting.endTime) {
      mergedMeetings.push(meeting);
      meeting = meetings[i];
    } else if (meetings[i].endTime > meeting.endTime) {
      meeting.endTime = meetings[i].endTime;
    }
  }

  mergedMeetings.push(meeting);

  return mergedMeetings;
};

interface Meeting {
  startTime: number;
  endTime: number;
}
