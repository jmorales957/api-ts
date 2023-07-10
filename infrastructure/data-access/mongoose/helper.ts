export const searchRegex = (search: string) => {
  return decodeURIComponent(search).replace(/[.*+?^$@{}()|[\]\\]/g, '\\$&');
};
