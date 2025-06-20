import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
`;

const Heading = styled.h3`
  font-size: 1.5rem;
  color: #1f2937;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const VideoCard = styled.li`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 1rem;
  border-radius: 10px;
  margin-bottom: 1.5rem;
  list-style: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
`;

const Title = styled.strong`
  font-size: 1.1rem;
  color: #111827;
`;

const VideoTag = styled.video`
  margin-top: 0.75rem;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #d1d5db;
`;

const SmallText = styled.small`
  display: block;
  color: #6b7280;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  margin-top: 0.75rem;
  font-size: 0.9rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: 0.2s ease;

  background-color: ${(props) => (props.danger ? '#dc2626' : '#3b82f6')};
  color: white;

  &:hover {
    background-color: ${(props) => (props.danger ? '#b91c1c' : '#2563eb')};
  }
`;

const Message = styled.p`
  text-align: center;
  color: #6b7280;
`;

const VideoList = ({ userId }) => {
  const [videos, setVideos] = useState([]);
  const [userRole, setUserRole] = useState("");

  const fetchVideos = async () => {
    try {
      const role = localStorage.getItem("role");
      setUserRole(role);
    } catch (err) {
      console.error("Failed to get user role:", err);
    }
    try {
      const res = await API.get(`/videos/journalist/${userId}`);
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [userId]);

  const handleDownload = (id) => {
    window.open(`${import.meta.env.VITE_BASEURL}/videos/download/${id}`, "_blank");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await API.delete(`/videos/${id}`);
      fetchVideos(); // Refresh list
    } catch (err) {
      alert("Failed to delete video.");
      console.error(err);
    }
  };

  return (
    <Container>
      <Heading>🎬 Uploaded Videos</Heading>
      {videos.length === 0 ? (
        <Message>No videos uploaded.</Message>
      ) : (
        <ul>
          {videos.map((video) => (
            <VideoCard key={video._id}>
              <Title>{video.title}</Title>
              <VideoTag controls>
                <source
                  src={`${import.meta.env.VITE_BASEURL}${video.fileUrl}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </VideoTag>
              <SmallText>Uploaded: {new Date(video.createdAt).toLocaleString()}</SmallText>
              <Button onClick={() => handleDownload(video._id)}>⬇ Download</Button>
              {(userRole === "editor" || userRole === "admin") && (
                <Button danger onClick={() => handleDelete(video._id)}>
                  ❌ Delete
                </Button>
              )}
            </VideoCard>
          ))}
        </ul>
      )}
    </Container>
  );
};

export default VideoList;
