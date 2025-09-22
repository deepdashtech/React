import { timeAgo } from "./timeAgo";

function daysRemaining(dateString) {
  if (!dateString) {
    return "date not provided";
  }

  const targetDate = new Date(dateString);
  if (isNaN(targetDate)) {
    return "invalid date";
  }

  const today = new Date();
  const diffMs = targetDate.getTime() - today.getTime();

  if(diffMs<0)
  {
    return timeAgo(dateString);
  }

  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (daysLeft > 0 && daysLeft < 10) {
    return daysLeft + " days remaining";
  } else if (daysLeft >= 10) {
    return targetDate.toDateString();
  } else {
    return ""; // If date is past or today
  }
}

export default daysRemaining;
