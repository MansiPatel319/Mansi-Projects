import images from "../../Assets/images";

const tabs = [
  {
    id: 1,
    name: "Booking List",
    image: images.bookinglist,
    url: "/booking",
    data:[]
  },
  {
    id: 2,
    name: "Calendar",
    image: images.calender,
    url: "/calender",
    data:[]
  },
  // {
  //   id: 3,
  //   name: "Access Points",
  //   image: images.location,
  //   url: "/home",
  //   data:[]
  // },
  {
    id: 4,
    name: "User Management",
    image: images.users,
    url: "/dashboard/manage-user",
    data:[]
  },
  {
    id: 5,
    name: "Project Management",
    image: images.siteManagement,
    url: "",
    data:[{
      id: 1,
      name: "Site Details",
      image: images.sidebarSiteDetails,
      url: "/site-details",
    },
    {
      id: 2,
      name: "Availibility",
      image: images.sidebarAvailibity,
      url: "/availablity",
    }
  ]
  },
  {
    id: 6,
    isBottonTab: true,
    name: "Language",
    image: images.companySetting,
    url: "/contacts",
    languages: ["ENG UK", "ENG US"],
    data:[]
  },
  // {
  //   id: 7,
  //   name: "Company Settings",
  //   image: images.companySetting,
  //   url: "/contacts",
  //   data:[]
  // },
 
];
export const bottomtabs = [
  {
    id: 1,
    name: "Company Settings",
    image: images.companySetting,
    url: "/contacts",
    data:[]
  },
  
];
export default tabs;
