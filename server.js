const express = require('express');
const cors = require('cors');
const moment = require('moment');

const app = express();
app.use(cors());

// Dummy data - replace with your actual data and database integration
const tags = [
  { id: 1, name: 'Today I learned' },
  { id: 2, name: 'What is blocking me?' },
  { id: 3, name: 'What is important?' },
  { id: 4, name: 'What am I grateful for?' },
];

const entries = [
  { id: 1, date: '2023-04-30', content: 'Entry 1', tagId: 1 },
  { id: 2, date: '2023-05-23', content: 'Entry 2', tagId: 2 },
  { id: 3, date: '2023-05-29', content: 'Entry 3', tagId: 1 },
  { id: 4, date: '2023-05-30', content: 'Entry 4', tagId: 3 },
  { id: 5, date: '2022-05-30', content: 'Entry 5', tagId: 1 },
];

// Routes
app.get('/api/tags', (req, res) => {
  res.json(tags);
});

app.get('/api/entries', (req, res) => {
  const { date, tag } = req.query;

  const today = moment(date).format('YYYY-MM-DD');
  const oneDayAgo = moment(date).subtract(1, 'day').format('YYYY-MM-DD');
  const oneWeekAgo = moment(date).subtract(1, 'week').format('YYYY-MM-DD');
  const oneMonthAgo = moment(date).subtract(1, 'month').format('YYYY-MM-DD');
  const oneYearAgo = moment(date).subtract(1, 'year').format('YYYY-MM-DD');

  console.log(today, oneDayAgo, oneWeekAgo, oneMonthAgo, oneYearAgo);

  // Filter entries by date and tag
  let filteredEntries = entries.filter(entry => entry.date === today || entry.date === oneDayAgo || entry.date === oneWeekAgo || entry.date === oneMonthAgo || entry.date === oneYearAgo);
  if (tag) {
    filteredEntries = filteredEntries.filter(entry => entry.tagId == tag);
  }

  // Sort entries by date
  filteredEntries = filteredEntries.sort((a, b) => a.date < b.date ? -1 : 1);
  res.json(filteredEntries);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
