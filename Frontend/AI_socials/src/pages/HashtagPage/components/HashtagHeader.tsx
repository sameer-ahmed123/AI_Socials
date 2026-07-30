import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HashtagHeaderProps {
  hashtag: string;
  postCount: number;
}

const HashtagHeader = ({ hashtag, postCount }: HashtagHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="hashtag-header">
      <button onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
      </button>

      <div>
        <h1>#{hashtag}</h1>
        <p>{postCount} posts</p>
      </div>
    </header>
  );
};

export default HashtagHeader;
