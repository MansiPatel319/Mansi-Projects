import images from "../../Assets/images";

const tabs = [
  {
    id: 1,
    name: "Projects",
    image: images.projects,
    url: "/home",
  },
  {
    id: 2,
    name: "Organizations",
    image: images.organization,
    url: "/organization",
  },
  {
    id: 3,
    name: "Users",
    image: images.usersAdmin,
    url: "/users",
  },
];
export const bottomtabs = [
  {
    id: 1,
    name: "Company Settings",
    image: images.companySetting,
    url: "",
  },
];
export default tabs;
