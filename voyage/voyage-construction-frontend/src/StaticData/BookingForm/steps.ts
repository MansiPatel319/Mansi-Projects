import images from "../../Assets/images";

const bookingSteps = [
  {
    id: 1,
    name: "Delivery",
    image: images.delivery,
    detail:"A standard, one time visit to site e.g. delivering some materials. A resource can be added to this booking type.",
    information:["Scheduling Information","Booking Date","Booking Time","Booking Details","Additional Details"],
    data: {
      schedulingInformation: {},
      bookingDate:{
        selectedDate:''
      },
      bookingTime: '',
      bookingSlotDetail:'',
      bookingDetail: {
        company_name:'',
        name:'',
        email:'',
        phone:''
      },
      additionalDetail:{},
      timer: 600,
      bookingCreationData:{}
    }
  },
  {
    id: 2,
    name: "Recurring",
    image: images.recurring,
    detail:"A regularly occuring visit to site e.g. weekly refuse collection. A resource can be added to this booking type.",
    information:["Scheduling Information","Booking Date","Booking Time","Booking Details","Additional Details"],
    data: {
      schedulingInformation: {},
      bookingTime: '',
      bookingSlotDetail:'',
      bookingDate:{
        startDate:'',
        endDate:'',
        repeatType:'',
        repeatWeekWise:'',
        repeatMonthWise:{
          monthWeek:'',
          monthDay:''
        },

      },
      additionalDetail:{},
      timer:600
    }
  },
  {
    id: 3,
    name: "Multi-Vehicle",
    image: images.multiVehicle,
    detail:"A booking where multiple vehicles will arrive at the site e.g. concrete delivery. A resource can be added to this booking type.",
    information:["Scheduling Information","Booking Date","Booking Time","Booking Details","Additional Details"],
    
    data: {
      schedulingInformation: {},
      bookingDate:{
        selectedDate:''
      },
      bookingTime: '',
      bookingSlotDetail:'',
      bookingDetail: {},
      additionalDetail:{},
      timer:600
    }
  },
  {
    id: 4,
    name: "Resource-Only",
    image: images.resource,
    url: "/dashboard/manage-user",
    detail:"A booking for use of a site resource only, no vehicle access will be booked using this booking type.",
    information:["Scheduling Information","Booking Date","Booking Time","Additional Details"],
    data: {
      schedulingInformation: {},
      bookingDate:{
        selectedDate:''
      },
      bookingTime: '',
      bookingSlotDetail:'',
      additionalDetail:{},
      timer:600
    }
  },
  
];

export default bookingSteps;
