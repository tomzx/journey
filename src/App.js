import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

import DatePicker from './DatePicker';
import ContentEditable from 'react-contenteditable';

const App = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [entries, setEntries] = useState([]);
  const [date, setDate] = useState(moment());

  axios.defaults.baseURL = 'http://localhost:5000';

  useEffect(() => {
    // Fetch tags from the API
    axios
      .get('/api/tags')
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleTagChange = e => {
    setSelectedTag(e.target.value);
  };

  const handleDateChange = date => {
    setDate(moment(date));
    fetchEntries(date);
  };

  const fetchEntries = date => {
    // Fetch entries from the API for the given date and selected tag
    axios
      .get(`/api/entries?date=${date}&tag=${selectedTag}`)
      .then(response => {
        setEntries(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchEntries(date.format('YYYY-MM-DD'));
  }, [selectedTag]);

  return (
    <div className="main-container">
      <div>
        <label>Tag:</label>
        <select value={selectedTag} onChange={handleTagChange}>
          <option value="">All</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div>
          <h3 className="section-header"><DatePicker value={date.format('YYYY-MM-DD')} onChange={handleDateChange}/> (Now)</h3>
          {entries
            .filter(entry => moment(entry.date).isSame(date, 'day'))
            .map(entry => (
              <div key={entry.id}>
                <ContentEditable className="content" html={entry.content}/>
              </div>
            ))}
        </div>
        <div>
          <h3 className="section-header">{moment(date).subtract(1, 'day').format('YYYY-MM-DD')} (-1 day)</h3>
          {entries
            .filter(entry => moment(entry.date).isSame(moment(date).subtract(1, 'day'), 'day'))
            .map(entry => (
              <div key={entry.id}>
                <ContentEditable className="content" html={entry.content}/>
              </div>
            ))}
        </div>
        <div>
          <h3 className="section-header">{moment(date).subtract(1, 'week').format('YYYY-MM-DD')} (-1 week)</h3>
          {entries
            .filter(entry => moment(entry.date).isSame(moment(date).subtract(1, 'week'), 'day'))
            .map(entry => (
              <div key={entry.id}>
                <ContentEditable className="content" html={entry.content}/>
              </div>
            ))}
        </div>
        <div>
          <h3 className="section-header">{moment(date).subtract(1, 'month').format('YYYY-MM-DD')} (-1 month)</h3>
          {entries
            .filter(entry => moment(entry.date).isSame(moment(date).subtract(1, 'month'), 'day'))
            .map(entry => (
              <div key={entry.id}>
                <ContentEditable className="content" html={entry.content}/>
              </div>
            ))}
        </div>
        <div>
          <h3 className="section-header">{moment(date).subtract(1, 'year').format('YYYY-MM-DD')} (-1 year)</h3>
          {entries
            .filter(entry => moment(entry.date).isSame(moment(date).subtract(1, 'year'), 'day'))
            .map(entry => (
              <div key={entry.id}>
                <ContentEditable className="content" html={entry.content}/>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
