export function mergeRanges(input: Meeting[]) {
  const meetings = [...input].sort((a, b) => a.startTime - b.startTime);
  const mergedRanges = [];

  let meeting = meetings.shift();
  for (let i = 0; i < meetings.length; i++) {
    if (meetings[i].startTime > meeting.endTime) {
      mergedRanges.push(meeting);
      meeting = meetings[i];
    } else if (meetings[i].endTime > meeting.endTime) {
      meeting.endTime = meetings[i].endTime;
    }
  }
  mergedRanges.push(meeting);

  return mergedRanges;
}

export interface Meeting {
  startTime: number;
  endTime: number;
}
