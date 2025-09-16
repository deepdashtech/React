const cache = {};

export function timeAgo(dateString) {
  if (!dateString) return "not added";

  if (cache[dateString]) return cache[dateString];

  // calculate time ago string
  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.floor((now - date) / 1000);

  let result;
  if (secondsAgo < 60) result = secondsAgo + " seconds ago";
  else {
    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) result = minutesAgo + " minutes ago";
    else {
      const hoursAgo = Math.floor(minutesAgo / 60);
      if (hoursAgo < 24) result = hoursAgo + " hours ago";
      else {
        const daysAgo = Math.floor(hoursAgo / 24);
        result = daysAgo + " days ago";
      }
    }
  }

  cache[dateString] = result;
  return result;
}
