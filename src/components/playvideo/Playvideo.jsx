import React, { useEffect, useState } from "react";
import './Playvideo.css';

import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user from '../../assets/user_profile.jpg';
import video from '../../assets/video.mp4'
import { API_KEY } from "../../Data";
import moment from "moment/moment";
import { useParams } from "react-router-dom";

const Playvideo = ({ videoId }) => {

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    

    const fetchVideoData = async () => {
        // fetching video data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url)
            .then((response) => response.json())
            .then((data) => setApiData(data.items[0]))
            .catch((error) => console.error("Error fetching video data:", error));
    };

    const fetchChannelData = async () => {
        if (apiData && apiData.snippet && apiData.snippet.channelId) {
            const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
            await fetch(channelData_url)
                .then((response) => response.json())
                .then((data) => setChannelData(data.items[0]))
                .catch((error) => console.error("Error fetching channel data:", error));

            // fetching commnetdata
            const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY} `
            await fetch(comment_url)
                .then(response => response.json())
                .then((data) => setCommentData(data.items))



        }
    };

    useEffect(() => {
        fetchVideoData();
    }, [videoId]);

    useEffect(() => {
        if (apiData && apiData.snippet && apiData.snippet.channelId) {
            fetchChannelData();
        }
    }, [apiData]);

    return (
        <div className="play-video">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>

            <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>
            <div className="play-video-info">
                <p>
                    {apiData ? apiData.statistics.viewCount : "16K"} &bull;{" "}
                    {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
                </p>
                <div>
                    <span>
                        <img src={like} alt="" />
                        {apiData ? apiData.statistics.likeCount : 155}
                    </span>
                    <span>
                        <img src={dislike} alt="" />2
                    </span>
                    <span>
                        <img src={share} alt="" />Share
                    </span>
                    <span>
                        <img src={save} alt="" />Save
                    </span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img
                    src={
                        channelData ? channelData.snippet.thumbnails.default.url : ""
                    }
                    alt=""
                />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{channelData ? channelData.statistics.subscribeCount : "1M"}</span>
                </div>
                <button>Subscribe</button>
            </div>

            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description here"}</p>
                <hr />
                <h4>{apiData ? apiData.statistics.commentCount : 102} Comments</h4>

                {/* Comment sections here */}
                {
                    commentData.map((item, index) => {
                        return (
                            <div className="comment">
                                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                                <div key={index}>
                                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>

                                    <div className="comment-action" >
                                        <img src={like} alt="" />
                                        <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                        <img src={dislike} alt="" />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    );
};
export default Playvideo;
