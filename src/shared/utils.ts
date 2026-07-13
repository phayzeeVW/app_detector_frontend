import type { ApplicationWithSessions } from "../types/application.ts";

export const formatUtcToLocalDateTime = (value: string) => {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(value));
};

export const getDurationMs = (start: string, stop: string) => {
  return new Date(stop).getTime() - new Date(start).getTime();
};

export const formatDuration = (durationMs: number) => {
  const totalSeconds = Math.floor(durationMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
};

export const calculateTotalPlayTime = (
  application: ApplicationWithSessions,
) => {
  let playTime = 0;

  application.sessions.forEach((s) => {
    playTime += getDurationMs(s.sessionStart, s.sessionStop);
  });

  return formatDuration(playTime);
};
