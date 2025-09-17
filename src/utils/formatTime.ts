export const formatTime = (timeString: string) => {
  return new Date(timeString).toLocaleTimeString('no-NO', {
    hour: '2-digit',
    minute: '2-digit',
  });
};