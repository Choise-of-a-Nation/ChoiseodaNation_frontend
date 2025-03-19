import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Topic.css";
import { addComment, getTopicById, getUser, getCommentsByTopicId, deleteComment } from "../../ApiService/ApiService";
import { getUserIdFromToken, getUserRoleFromToken } from "../../Utilits/Auth";

interface Comment {
    id: string;
    userId: string;
    authorName?: string;
    content: string;
    createdAt: Date;
}

interface Topic {
    id: string;
    title: string;
    userId: string;
    authorName?: string;
    createdAt: Date;
    description: string;
}

const Topic: React.FC = () => {
    const { topicId } = useParams<{ topicId: string }>();
    const [topic, setTopic] = useState<Topic | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchTopic = async () => {
        if (!topicId) return;
        
        try {
            const topicData = await getTopicById(topicId);
            try {
                const author = await getUser(topicData.userId);
                topicData.authorName = `${author.firstName} ${author.lastName}`;
            } catch {
                topicData.authorName = "Невідомий автор";
            }
            setTopic(topicData);
        } catch (err) {
            console.error("Помилка завантаження теми:", err);
        }
    };

    const fetchComments = async () => {
        try {
            const commentsData = await getCommentsByTopicId(topicId!);
    
            const commentsArray = Array.isArray(commentsData) ? commentsData : [];
    
            const commentsWithAuthors = await Promise.all(
                commentsArray.map(async (comment: Comment) => {
                    if (!comment.userId) {
                        return { 
                            ...comment, 
                            authorName: "Невідомий користувач",
                            createdAt: comment.createdAt ? new Date(comment.createdAt) : new Date(0) 
                        };                        
                    }
    
                    try {
                        const author = await getUser(comment.userId);
                        return { ...comment, authorName: `${author.firstName} ${author.lastName}` };
                    } catch {
                        return { ...comment, authorName: "Невідомий користувач" };
                    }
                })
            );
    
            setComments(commentsWithAuthors);
        } catch (err) {
            console.error("Помилка завантаження коментарів:", err);
        }
    };

    useEffect(() => {
        fetchTopic();
        fetchComments();
    }, [topicId]);

    useEffect(() => {
        const checkAdminStatus = () => {
            const userRole = getUserRoleFromToken();
            setIsAdmin(userRole === 'Full');
        };
        checkAdminStatus();
    }, []);

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) return;

        try {
            const userId = getUserIdFromToken();
            if (!userId) {
                console.error("User ID не знайдено!");
                return;
            }

            await addComment(topicId!, userId, commentText);

            setCommentText("");
            fetchComments();
        } catch (error) {
            console.error("Помилка при додаванні коментаря:", error);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await deleteComment(commentId);
            fetchComments();
        } catch (error) {
            console.error('Помилка при видаленні коментаря:', error);
        }
    };

    return (
        <div className="topic-container">
            {topic ? (
                <>
                    <h2>{topic.title}</h2>
                    <p>Автор: {topic.authorName} | {new Date(topic.createdAt).toLocaleString()}</p>
                    <p>{topic.description}</p>

                    <h2>Коментарі:</h2>
                    <ul>
                        {Array.isArray(comments) && comments.length > 0 ? (
                            comments.map((comment) => (
                                <li key={comment.id || Math.random()}>
                                    <p><strong>{comment.authorName}:</strong> {comment.content}</p>
                                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                                    {isAdmin && (
                                        <button 
                                            onClick={() => handleDeleteComment(comment.id)}
                                            className="delete-comment-btn"
                                        >
                                            Видалити
                                        </button>
                                    )}
                                </li>
                            ))
                            ) : (
                                <p>Немає коментарів. Будьте першим!</p>
                        )}
                    </ul>

                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Додати коментар..."
                    />
                    <button onClick={handleCommentSubmit}>Надіслати</button>
                </>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
};

export default Topic;