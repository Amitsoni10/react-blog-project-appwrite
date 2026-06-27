import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl p-4 border border-slate-200 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
