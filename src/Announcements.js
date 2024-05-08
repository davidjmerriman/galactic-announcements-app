import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Announcement from "./Announcement";
import axios from "axios";

function Announcements() {
    const pageSize = 10;
    const [announcements, setAnnouncements] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(pageSize);
  
    useEffect(() => {
      axios
        .get(`http://localhost:8000/api/announcements?offset=0&limit=${pageSize}`)
        .then(response => {
          setOffset(pageSize);
          setAnnouncements([...announcements, ...response.data.data.announcements]);
          setHasMore(true);
        });
    }, []);
  
    const fetchAnnouncements = () => {
      axios
        .get(`http://localhost:8000/api/announcements?offset=${offset}&limit=${pageSize}`)
        .then(response => {
          setOffset(offset + pageSize);
          setAnnouncements([...announcements, ...response.data.data.announcements]);
          setHasMore(announcements.length < response.data.data.totalCount);
        });
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
