export const getDelayMinutes = (aimed: string, expected: string) => {
    const aimedTime = new Date(aimed);
    const expectedTime = new Date(expected);
    return Math.round((expectedTime.getTime() - aimedTime.getTime()) / (1000 * 60));
  };

  export const getDelayStatus = (delayMinutes: number) => {
    if (delayMinutes > 0) {
      return {
        text: `+${delayMinutes} min`,
        className: 'text-red-600'
      };
    } else if (delayMinutes < 0) {
      return {
        text: `${delayMinutes} min`,
        className: 'text-green-600'
      };
    }
    return {
      text: 'I rute',
      className: 'text-green-600'
    };
  };