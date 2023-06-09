import {
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../assets/tweeter.svg";
import lightLogo from "../assets/tweeter-light.svg";
import { Link, useNavigate } from "react-router-dom";
import User from "./user";
import { ThemeToggle } from "./ChangeTheme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../slices/api/logApiSlice";
import { changeToken, removeCredentials } from "../slices/authSlice";
import { useCheckTokenMutation } from "../slices/api/userApiSlice";
import { useRef } from "react";
import useStylesHeader from "./Header/headerStyles";

export function HeaderMegaMenu() {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStylesHeader();
  const { colorScheme } = useMantineColorScheme();
  const dispatch: AppDispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const [token] = useCheckTokenMutation();
  const btnRef = useRef<HTMLButtonElement>(null);

  async function logoutUser() {
    try {
      await logout().unwrap();
      dispatch(removeCredentials());
      toast.success("Successfully logged out");
      navigate("/login");
      closeDrawer();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.data.error === "token expired") {
        try {
          if (user) {
            const res = await token({
              username: user?.username,
              id: user?.id,
            }).unwrap();
            dispatch(changeToken(res));
            btnRef.current?.click();
          }
        } catch (error) {
          toast.error("Session expired, please log in");
          dispatch(removeCredentials());
        }
      } else toast.error("Something went wrong");
    }
  }

  return (
    <Box>
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <img src={colorScheme === "dark" ? lightLogo : logo} alt="logo" />
          <Group
            sx={{ height: "100%" }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link to={"/"} className={classes.link}>
              Home
            </Link>
            <Link to={`/${user?.username}`} className={classes.link}>
              Profile
            </Link>
            <Link to={"/bookmarks"} className={classes.link}>
              Bookmarks
            </Link>
          </Group>

          <Group className={classes.hiddenMobile}>
            {user && <User />}
            {!user && (
              <Button component={Link} to={"/login"}>
                Login
              </Button>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="75%"
        padding="xs"
        className={classes.hiddenDesktop}
        zIndex={1000000}
        withCloseButton={false}
        transitionProps={{
          transition: "rotate-left",
          duration: 150,
          timingFunction: "linear",
        }}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <ThemeToggle />
          <Link to={"/"} className={classes.link} onClick={closeDrawer}>
            Home
          </Link>
          {user && (
            <Link
              to={`/${user.username}`}
              className={classes.link}
              onClick={closeDrawer}
            >
              Profile
            </Link>
          )}
          <Link
            to={"/bookmarks"}
            className={classes.link}
            onClick={closeDrawer}
          >
            Bookmarks
          </Link>
          <Link
            to={"https://github.com/Adewale66/Tweeter.git"}
            target="_blank"
            className={classes.link}
            onClick={closeDrawer}
          >
            Source code
          </Link>

          {user && (
            <Text
              component="button"
              className={classes.link}
              onClick={logoutUser}
              ref={btnRef}
            >
              Logout
            </Text>
          )}

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          {!user && (
            <Group position="center" grow pb="xl" px="md">
              <Button
                component={Link}
                to={"/login"}
                size="md"
                variant="outline"
              >
                Log in
              </Button>
            </Group>
          )}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
