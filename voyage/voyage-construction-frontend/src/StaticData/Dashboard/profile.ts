import images from "../../Assets/images";

const profileMenu = [
  {
    id: 1,
    name: "My Account",
    icon: images.profileUser,
    redirectLink: "/myaccount",
  },
  {
    id: 2,
    name: "My Organisation",
    icon: images.profileOrg,
    redirectLink: "/organization",
  },
  {
    id: 3,
    name: "Notification",
    icon: images.ProfileNotification,
    redirectLink: "/",
  },
  // {
  //   id: 1,
  //   name: "Notification Preferences",
  //   icon:images.profile_notification,
  //   redirectLink: "/activity-log",
  // },

];

export default profileMenu;
