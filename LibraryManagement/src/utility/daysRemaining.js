function daysRemaining(dateString) {
  if (!dateString) {
    return "date not provided";
  }

  const today = new Date();
  const targetDate = new Date(dateString);

  // Calculate difference in milliseconds
  const diffMs = targetDate.getTime() - today.getTime();

  // Convert milliseconds to full days (rounded up)
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (daysLeft > 0 && daysLeft < 10) {
    return daysLeft + " days remaining";
  } else if (daysLeft >= 10) {
    // Format date to a readable string, e.g., "Tue Sep 23 2025"
    return targetDate.toDateString();
  } else {
    return ""; // No output if date is past or today
  }
}

export default daysRemaining;

