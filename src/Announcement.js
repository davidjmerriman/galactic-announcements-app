import Markdown from 'react-markdown'

const Announcement = ({id, author, date, body}) => (
    <div className="announcement" key={id}>
      <h2><em>#{id}</em> - Announcement by <strong>{author}</strong> on {date}:</h2>
      <Markdown>{body}</Markdown>
    </div>
  );

export default Announcement;
