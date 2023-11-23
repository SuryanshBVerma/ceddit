import React, { useState } from "react";
import {
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaConnectdevelop, FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import { downvotePost, upvotePost } from "../../api/posts";

const PostItem = ({ post }) => {
  const user = isLoggedIn();
  const [loadingImage, setLoadingImage] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const singlePostView = false; // function not passed to [pid]

  const isUserUpvote = (community) => {
    if (!user) return false;
    if (post?.upvotedBy?.includes(user.userId)) return true;
  };

  const isUserDownvote = (community) => {
    if (!user) return false;
    if (post?.downvotedBy?.includes(user.userId)) return true;
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    setLoadingDelete(true);
    // try {
    //   const success = await onDeletePost(post);
    //   if (!success) throw new Error("Failed to delete post");

    //   console.log("Post successfully deleted");

    //   // Could proably move this logic to onDeletePost function
    //   if (router) router.back();
    // } catch (error: any) {
    //   console.log("Error deleting post", error.message);
    //   /**
    //    * Don't need to setLoading false if no error
    //    * as item will be removed from DOM
    //    */
    //   setLoadingDelete(false);
    //   // setError
    // }
  };

  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePostView ? "white" : "gray.300"}
      borderRadius={singlePostView ? "4px 4px 0px 0px" : 4}
      _hover={{ borderColor: singlePostView ? "none" : "gray.500" }}
      //   onClick={() => onSelectPost && post && onSelectPost(post, postIdx!)}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostView ? "none" : "gray.100"}
        p={2}
        width="40px"
        borderRadius={singlePostView ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          as={isUserUpvote() ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
          color={isUserUpvote() ? "brand.100" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={() => upvotePost(post._id, user)}
        />
        <Text fontSize="9pt" fontWeight={600}>
          {post ? post?.upvotedBy?.length : 0}
        </Text>
        <Icon
          as={
            isUserDownvote() ? IoArrowDownCircleSharp : IoArrowDownCircleOutline
          }
          color={isUserDownvote() ? "#4379FF" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={() => downvotePost(post._id, user)}
        />
      </Flex>
      <Flex direction="column" width="100%">
        <Stack spacing={1} p="10px 10px">
          {true && (
            <Stack
              direction="row"
              spacing={0.6}
              align="center"
              justify={"space-between"}
              fontSize="9pt"
            >
              <Stack direction="row" align="center">
                {true && (
                  <>
                    {false ? (
                      <Image
                        borderRadius="full"
                        boxSize="18px"
                        //   src={post.communityImageURL}
                        mr={2}
                      />
                    ) : (
                      <Icon
                        as={FaConnectdevelop}
                        fontSize={18}
                        mr={1}
                        color="blue.500"
                      />
                    )}
                    <Link to={`/community/${post?.community?._id}`}>
                      <Text
                        fontWeight={700}
                        _hover={{ textDecoration: "underline" }}
                        onClick={(event) => event.stopPropagation()}
                      >
                        {post?.community?.name}
                      </Text>
                    </Link>
                    <Icon as={BsDot} color="gray.500" fontSize={8} />
                  </>
                )}
                <Text color="gray.500">
                  Posted by {post?.user?.username}
                  {/* {moment(new Date(post.createdAt.seconds * 1000)).fromNow()} */}
                </Text>
              </Stack>
              <Link to={`/community/${post?.community?._id}/${post?._id}`}>
                <Flex
                  direction="column"
                  align="center"
                  bg={"blue.600"}
                  p={2}
                  width="32px"
                  borderRadius={"full"}
                >
                  <Icon as={FiArrowUpRight} fontSize={16} color="white" />
                </Flex>
              </Link>
            </Stack>
          )}
          <Text fontSize="12pt" fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize="10pt">{post?.content}</Text>
          {/* {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                // width="80%"
                // maxWidth="500px"
                maxHeight="460px"
                src={post.imageURL}
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
                alt="Post Image"
              />
            </Flex>
          )} */}
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post?.commentCount}</Text>
          </Flex>
          {/* <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex> */}
          {post?.user?.isAdmin && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {false ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineEdit} mr={2} />
                  <Text fontSize="9pt">Edit</Text>
                </>
              )}
            </Flex>
          )}
          {post?.user?.isAdmin && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {false ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;
