/**
 * Formatta il tempo in millisecondi in una stringa "MM:SS".
 * @param milliseconds Tempo in millisecondi
 * @returns Una stringa formattata come "MM:SS"
 */
export const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
