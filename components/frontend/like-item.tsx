"use client"

import { useUser } from "@clerk/nextjs";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LikeItemProps {
  dishId: string;
  updateSignedInUser?: (updatedUser: TUser) => void;
}

const LikeItem = ({ dishId, updateSignedInUser }: LikeItemProps) => {
  const { user } = useUser();
  const router = useRouter();

  const [ signedInUser, setSignedInUser ] = useState<TUser | null>(null);
  const [ loading, setLoading ] = useState(false);
  const [ isLiked, setIsLiked ] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
      setIsLiked(data.wishList.includes(dishId));
    } catch (error) {
      console.log("[users_GET]", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [ user ]);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        setLoading(true);
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ dishId: dishId })
        });
        const updatedUser = await res.json();
        setSignedInUser(updatedUser);
        setIsLiked(updatedUser.wishList.includes(dishId));
        updateSignedInUser && updateSignedInUser(updatedUser);
      }
    } catch (error) {
      console.log("[wishlist_POST]", error)
    }
  }
  return (
    <button type="button" onClick={handleLike}>
      <HeartIcon fill={`${isLiked ? "red" : "white"}`} />
    </button>
  )
}

export default LikeItem