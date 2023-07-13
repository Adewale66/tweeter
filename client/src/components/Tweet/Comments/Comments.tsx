import { Box, Avatar, Group, Text, Stack, Flex } from "@mantine/core";
import useStylesComment from "./styles";
import getTimeFormat from "../utils/getTime";

interface CommentProps {
  comment: string;
  madeBy: {
    username: string;
    profileimage: string;
  };
  createdAt: string;
}

const Comments = ({ comment }: { comment: CommentProps }) => {
  const { classes } = useStylesComment();
  const formattedDate = getTimeFormat(comment.createdAt);

  return (
    <Box mt={6}>
      <Flex gap={10}>
        <Avatar alt="wale" radius="md" src={comment.madeBy.profileimage} />
        <Stack spacing="sm" className={classes.comments}>
          <Group align="center">
            <Text fz="0.85rem" fw={500}>
              {comment.madeBy.username}
            </Text>
            <Text fz="0.65rem" fw={500} c="dimmed">
              {formattedDate}
            </Text>
          </Group>
          <Text>{comment.comment}</Text>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Comments;
