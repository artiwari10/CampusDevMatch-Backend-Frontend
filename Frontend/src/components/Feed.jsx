import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const getFeed = async (page = 1) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/feed?page=${page}&limit=10`, {
        withCredentials: true,
      });
      
      const newUsers = res?.data?.data || [];
      
      if (newUsers.length === 0) {
        setHasMore(false);
      } else {
        // If it's the first page, replace the feed, otherwise append
        if (page === 1) {
          dispatch(addFeed(newUsers));
        } else {
          dispatch(addFeed([...(feed || []), ...newUsers]));
        }
      }
    } catch (err) {
      console.error("Error fetching feed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load next user or fetch more if needed
  const handleNextUser = () => {
    if (!feed || feed.length === 0) return;
    
    // If we're at the last user in our current feed
    if (currentUserIndex >= feed.length - 1) {
      // If we believe there are more users to fetch
      if (hasMore) {
        setCurrentPage(prev => prev + 1);
        // Keep the current user index, new users will be appended
      } else {
        // No more users to fetch, we've seen everyone
        setCurrentUserIndex(feed.length); // This will trigger the "no more users" view
      }
    } else {
      // Move to next user in the current feed
      setCurrentUserIndex(prev => prev + 1);
    }
  };

  // Initial load
  useEffect(() => {
    if (!feed) {
      getFeed(1);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Load more when page changes
  useEffect(() => {
    if (currentPage > 1) {
      getFeed(currentPage);
    }
  }, [currentPage]);

  // Loading state
  if (isLoading && !feed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  // No users found or all users viewed
  if (!feed || feed.length === 0 || currentUserIndex >= feed.length) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <div className="text-4xl mb-4">👥</div>
        <h1 className="text-2xl font-semibold text-primary mb-2">No New Connections</h1>
        <p className="text-gray-500">Check back later for potential matches!</p>
        {feed && feed.length > 0 && (
          <button 
            className="btn btn-primary mt-6"
            onClick={() => {
              setCurrentUserIndex(0);
              getFeed(1);
            }}
          >
            Start Over
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Discover New Connections
        </h1>
        <div className="flex flex-col items-center justify-center">
          <div className="transform hover:scale-102 transition-transform duration-300 mb-8">
            <UserCard user={feed[currentUserIndex]} />
          </div>
          
          <div className="flex gap-4 mt-4">
            <button 
              className="btn btn-primary"
              onClick={handleNextUser}
            >
              Next
            </button>
            {isLoading && currentPage > 1 && (
              <span className="loading loading-spinner loading-md"></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
