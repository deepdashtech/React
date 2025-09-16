function timeAgo(dateString) {

      if (!dateString) {
    return "not added";
  }

  const date = new Date(dateString);
  const now = new Date();

  const secondsAgo = Math.floor((now - date) / 1000);
  if (secondsAgo < 60) return secondsAgo + " seconds ago";

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return minutesAgo + " minutes ago";

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return hoursAgo + " hours ago";

  const daysAgo = Math.floor(hoursAgo / 24);
  return daysAgo + " days ago";
}

export default timeAgo