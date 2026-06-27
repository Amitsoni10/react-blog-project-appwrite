import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { openAuthModal } from "../store/uiSlice";

function Home() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // Guests: show a friendly welcome message instead of posts
  if (!authStatus) {
    return (
      <div className="w-full py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
              Welcome to the Blog 📝
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Discover stories, ideas, and tutorials shared by our community.
              Sign in to read full articles, save your favourites, and start
              writing posts of your own.
              <br />
              It only takes a few seconds to get started — log in or create a
              free account to dive in.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => dispatch(openAuthModal("login"))}
                className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => dispatch(openAuthModal("signup"))}
                className="rounded-lg border border-blue-600 px-6 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-50"
              >
                Sign up
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Logged in but no posts yet
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-slate-700">
                No posts available yet.
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
