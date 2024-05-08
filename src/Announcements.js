import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Announcement from "./Announcement";
import axios from "axios";

function Announcements() {
    const pageSize = 10;
    const [announcements, setAnnouncements] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(pageSize);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios
        .get(`http://localhost:8000/api/announcements?offset=0&limit=${pageSize}`)
        .then(response => {
          setOffset(pageSize);
          setAnnouncements([...announcements, ...response.data.announcements]);
          setHasMore(true);
        })
        .catch(function(error) {
          console.log(error);
          setError(error);
        });
    }, []);
  
    const fetchAnnouncements = () => {
      axios
        .get(`http://localhost:8000/api/announcements?offset=${offset}&limit=${pageSize}`)
        .then(response => {
          setOffset(offset + pageSize);
          setAnnouncements([...announcements, ...response.data.announcements]);
          setHasMore(announcements.length < response.data.totalCount);
        })
        .catch(function(error) {
          console.log(error);
          setError(error);
        });
    }

    if (error) {
      return <div className="announcements-container">
          <div className="error-container">
            <h2>I felt a great disturbance in the Network, as if millions of announcements suddenly cried out in terror and were suddenly silenced.</h2>
            <h2>I fear something terrible has happened.</h2>
            <hr/>
            <p>...or you may need to start the API service first, and refresh. :)</p>
          </div>
        </div>
    }

    return (
        <InfiniteScroll
            dataLength={announcements.length}
            next={fetchAnnouncements}
            hasMore={hasMore}
            height='80vh'
        >
            <div className="announcements-container">
                {announcements.map((announcement) => <Announcement key={announcement.id} {...announcement} />)}
            </div>
        </InfiniteScroll>
    )
}

export default Announcements;
