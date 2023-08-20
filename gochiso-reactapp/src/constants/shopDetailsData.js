/* eslint-disable operator-linebreak */
import images from '../resources/images';

const shopDetailsData = {
  id: 1,
  name: 'Curabitur arcu erat, accumsan id imperdiet et curabitur arcu erat',
  category: 'Restaurants & Cafes',
  value: false,
  icon: 'bg-custom-icon restaurant-cafe-icon',
  sust_category_keyword: ['Sust. Category 1', 'Sust. Category 2'],
  shop_keyword: ['Keyword 1', 'Keyword 2'],
  summary:
    'Pellentesque in ipsum id orci porta dapibus. Donec sollicitudin' +
    'molestie malesuada. Quisque velit nisi, pretium ut lacinia in,' +
    'elementum id enim. Curabitur non nulla sit amet nisl tempus convallis' +
    'quis ac lectus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.' +
    'Pellentesque in ipsum id orci porta dapibus.Pellentesque in ipsum id' +
    'orci porta dapibus. Donec sollicitudin molestie malesuada. Quisque' +
    'velit nisi, pretium ut lacinia in, elementum id enim. Curabitur non' +
    'nulla sit amet nisl tempus convallis quis ac lectus. Praesent sapien massa, convallis a' +
    'pellentesque nec, egestas non nisi. Pellentesque in ipsum id orci porta dapibus.',
  open_hours: {
    sun: {
      lable: 'Sun',
      is_today: 0,
      start_times_range: '18:00-23:00',
      time_period_status: 'Hourly open',
      data: [
        {
          key: '10:00',
          value: '2',
          current_slote: 0,
        },
        {
          key: '10:30',
          value: '2',
          current_slote: 0,
        },
        {
          key: '11:00',
          value: '2',
          current_slote: 0,
        },
        {
          key: '11:30',
          value: '2',
          current_slote: 0,
        },
        {
          key: '12:00',
          value: '2',
          current_slote: 0,
        },
        {
          key: '12:30',
          value: '2',
          current_slote: 0,
        },
      ],
    },
    mon: {
      lable: 'Mon',
      is_today: 0,
      start_times_range: '18:00-23:00',
      time_period_status: 'Hourly open',
      data: [
        {
          key: '10:00',
          value: '5',
          current_slote: 0,
        },
        {
          key: '13:00',
          value: '2',
          current_slote: 0,
        },
        {
          key: '13:30',
          value: '2',
          current_slote: 0,
        },
        {
          key: '14:00',
          value: '2',
          current_slote: 0,
        },
        {
          key: '16:00',
          value: '20',
          current_slote: 0,
        },
        {
          key: '19:00',
          value: '20',
          current_slote: 0,
        },
        {
          key: '22:00',
          value: '25',
          current_slote: 0,
        },
      ],
    },
    tue: {
      lable: 'Tue',
      is_today: 0,
      start_times_range: '',
      time_period_status: 'Hourly open',
      data: [
        {
          key: '10:00',
          value: '5',
          current_slote: 0,
        },
        {
          key: '13:00',
          value: '2',
          current_slote: 0,
        },
        {
          key: '16:00',
          value: '2',
          current_slote: 0,
        },
        {
          key: '19:00',
          value: '2',
          current_slote: 0,
        },
        {
          key: '22:00',
          value: '2',
          current_slote: 0,
        },
      ],
    },
    wed: {
      lable: 'Wed',
      is_today: 0,
      start_times_range: '18:00-23:00',
      time_period_status: 'Hourly open',
      data: [
        {
          key: '10:00',
          value: '10',
          current_slote: 0,
        },
        {
          key: '10:30',
          value: '2',
          current_slote: 0,
        },
        {
          key: '13:00',
          value: '10',
          current_slote: 0,
        },
        {
          key: '13:30',
          value: '2',
          current_slote: 0,
        },
        {
          key: '16:00',
          value: '10',
          current_slote: 0,
        },
        {
          key: '16:30',
          value: '2',
          current_slote: 0,
        },
      ],
    },
    thu: {
      lable: 'Today',
      is_today: 1,
      start_times_range: '18:00-23:00',
      time_period_status: 'Hourly open',
      data: [
        {
          key: '10:30',
          value: '2',
          current_slote: 0,
        },
        {
          key: '13:30',
          value: '2',
          current_slote: 0,
        },
        {
          key: '16:30',
          value: '2',
          current_slote: 0,
        },
      ],
    },
    fry: {
      lable: 'Fri',
      is_today: 0,
      start_times_range: '18:00-23:00',
      time_period_status: 'Hourly open',
      data: [
        {
          key: '10:00',
          value: '15',
          current_slote: 0,
        },
        {
          key: '13:00',
          value: '10',
          current_slote: 0,
        },
        {
          key: '16:00',
          value: '25',
          current_slote: 0,
        },
        {
          key: '16:30',
          value: '20',
          current_slote: 0,
        },
        {
          key: '17:00',
          value: '30',
          current_slote: 0,
        },
        {
          key: '17:30',
          value: '35',
          current_slote: 0,
        },
        {
          key: '18:00',
          value: '10',
          current_slote: 0,
        },
        {
          key: '18:30',
          value: '25',
          current_slote: 0,
        },
        {
          key: '19:00',
          value: '5',
          current_slote: 0,
        },
        {
          key: '19:30',
          value: '15',
          current_slote: 0,
        },
        {
          key: '20:00',
          value: '10',
          current_slote: 1,
        },
        {
          key: '20:30',
          value: '10',
          current_slote: 0,
        },
        {
          key: '21:00',
          value: '20',
          current_slote: 0,
        },
        {
          key: '21:30',
          value: '15',
          current_slote: 0,
        },
        {
          key: '22:00',
          value: '20',
          current_slote: 0,
        },
      ],
    },
    sat: {
      lable: 'Sat',
      is_today: 0,
      start_times_range: '17:00-23:00',
      time_period_status: 'Hourly open',
      data: [
        {
          key: '10:00',
          value: '20',
          current_slote: 0,
        },
        {
          key: '13:00',
          value: '15',
          current_slote: 0,
        },
        {
          key: '16:00',
          value: '20',
          current_slote: 0,
        },
        {
          key: '19:00',
          value: '10',
          current_slote: 0,
        },
        {
          key: '22:00',
          value: '30',
          current_slote: 0,
        },
      ],
    },
  },
  google_rating: 4.0,
  photos: [images.ShopImg3, images.ShopImg4, images.ShopImg1, images.ShopImg2],
  recommendations: [
    {
      id: 1,
      username: 'John Doe',
      user_profile_image: images.Profile1,
      text: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in',
      images: [images.ShopImg1, images.ShopImg2],
    },
    {
      id: 2,
      username: 'John Doe',
      user_profile_image: images.Profile2,
      text: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Pellentesque in',
      images: [],
    },
  ],
};

export default shopDetailsData;
