import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Announcement from "./Announcement";

function Announcements() {
    const pageSize = 10;
    const [announcements, setAnnouncements] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(pageSize);
  
    useEffect(() => {
      let announceData = [];
      for (let i = 0; i < pageSize; i++) {
        announceData.push({
          id: i,
          author: 'Some Dude',
          date: Date().toLocaleString('en-US'),
          body: `Here is an **announcement body** number ${i}`
        });
      }
  
      const response = {
        data: {
          totalCount: 1000,
          announcements: announceData,
        }
      };
      setOffset(pageSize);
      setAnnouncements([...announcements, ...response.data.announcements]);
      setHasMore(true);
    }, []);
  
    const fetchAnnouncements = () => {
      let announceData = [];
      for (let i = offset; i < offset + pageSize; i++) {
        announceData.push({
          id: i,
          author: 'Some Dude',
          date: Date().toLocaleString('en-US'),
          body: `Here is an **announcement body** number ${i}`
        });
      }
  
      const response = {
        data: {
          totalCount: 1000,
          announcements: announceData,
        }
      };
      setOffset(offset + pageSize);
      setAnnouncements([...announcements, ...response.data.announcements]);
      setHasMore(announcements.length < response.data.totalCount);
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
