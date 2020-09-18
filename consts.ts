import Chance from 'chance';
import { isMobile } from 'react-device-detect';
import { ToastProps } from 'react-toastify';

const chance = new Chance();

export const roles = ['Developer', 'Tech lover', 'Team player'];
export const socials = [
  {
    index: 6,
    speed: 0,
    title: 'Gmail',
    image: 'gmail',
    link: 'mailto:maximvasylenko228322@gmail.com',
  },
  {
    index: 7,
    speed: 0.99,
    title: 'GitHub',
    image: 'github',
    link: 'https://www.github.com/maxikgreat',
  },
  {
    index: 8,
    speed: 0.33,
    title: 'Instagram',
    image: 'instagram',
    link: 'https://www.instagram.com/lavrov_kh',
  },
  {
    index: 9,
    speed: 0.66,
    title: 'LinkedIn',
    image: 'linkedin',
    link: 'https://www.linkedin.com/in/mvasylenko/',
  },
];

export const skills = [
  {
    value: 90,
    text: 'HTML/CSS/JavaScript/TypeScript'
  },
  {
    value: 80,
    text: 'React/Redux/Next'
  },
  {
    value: 80,
    text: 'React Native'
  },
  {
    value: 80,
    text: 'SASS/RWD/Bootstrap/Semantic UI/Material UI'
  },
  {
    value: 70,
    text: 'Node/Express'
  },
  {
    value: 60,
    text: 'Git/Heroku/Vercel/Auth0'
  },
  {
    value: 30,
    text: 'PHP(Laravel)/SQL'
  }
];

export const icons = [
  {
    name: 'react',
    alt: 'react-logo',
    offset: chance.floating({ min: 2, max: 2.9, float: 2 }),
    speed: chance.floating({ min: 0, max: 2, float: 2 }),
    marginLeft: chance.integer({ min: 10, max: 80 }),
    opacity: chance.floating({ min: 0.3, max: 0.7, float: 2 })
  },
  {
    name: 'bootstrap',
    alt: 'bootstrap-logo',
    offset: chance.floating({ min: 2, max: 2.9, float: 2 }),
    speed: chance.floating({ min: 0, max: 2, float: 2 }),
    marginLeft: chance.integer({ min: 10, max: 80 }),
    opacity: chance.floating({ min: 0.3, max: 0.7, float: 2 })
  },
  {
    name: 'next',
    alt: 'next-logo',
    offset: chance.floating({ min: 2, max: 2.9, float: 2 }),
    speed: chance.floating({ min: 0, max: 2, float: 2 }),
    marginLeft: chance.integer({ min: 10, max: 80 }),
    opacity: chance.floating({ min: 0.3, max: 0.7, float: 2 })
  },
  {
    name: 'redux',
    alt: 'redux-logo',
    offset: chance.floating({ min: 2, max: 2.9, float: 2 }),
    speed: chance.floating({ min: 0, max: 2, float: 2 }),
    marginLeft: chance.integer({ min: 10, max: 80 }),
    opacity: chance.floating({ min: 0.3, max: 0.7, float: 2 })
  },
  {
    name: 'typescript',
    alt: 'typescript-logo',
    offset: chance.floating({ min: 2, max: 2.9, float: 2 }),
    speed: chance.floating({ min: 0, max: 2, float: 2 }),
    marginLeft: chance.integer({ min: 10, max: 80 }),
    opacity: chance.floating({ min: 0.3, max: 0.7, float: 2 })
  },
  {
    name: 'js',
    alt: 'js-logo',
    offset: chance.floating({ min: 2, max: 2.9, float: 2 }),
    speed: chance.floating({ min: 0, max: 2, float: 2 }),
    marginLeft: chance.integer({ min: 10, max: 80 }),
    opacity: chance.floating({ min: 0.3, max: 0.7, float: 2 })
  },
  {
    name: 'webpack',
    alt: 'webpack-logo',
    offset: chance.floating({ min: 2, max: 2.9, float: 2 }),
    speed: chance.floating({ min: 0, max: 2, float: 2 }),
    marginLeft: chance.integer({ min: 10, max: 80 }),
    opacity: chance.floating({ min: 0.3, max: 0.7, float: 2 })
  },
  {
    name: 'express',
    alt: 'express-logo',
    offset: chance.floating({ min: 2, max: 2.9, float: 2 }),
    speed: chance.floating({ min: 0, max: 2, float: 2 }),
    marginLeft: chance.integer({ min: 10, max: 80 }),
    opacity: chance.floating({ min: 0.3, max: 0.7, float: 2 })
  },
  {
    name: 'node',
    alt: 'node-logo',
    offset: chance.floating({ min: 2, max: 2.9, float: 2 }),
    speed: chance.floating({ min: 0, max: 2, float: 2 }),
    marginLeft: chance.integer({ min: 10, max: 80 }),
    opacity: chance.floating({ min: 0.3, max: 0.7, float: 2 })
  },
  {
    name: 'sass',
    alt: 'sass-logo',
    offset: chance.floating({ min: 2, max: 2.9, float: 2 }),
    speed: chance.floating({ min: 0, max: 2, float: 2 }),
    marginLeft: chance.integer({ min: 10, max: 80 }),
    opacity: chance.floating({ min: 0.3, max: 0.7, float: 2 })
  },
  {
    name: 'semantic',
    alt: 'semantic-logo',
    offset: chance.floating({ min: 2, max: 2.9, float: 2 }),
    speed: chance.floating({ min: 0, max: 2, float: 2 }),
    marginLeft: chance.integer({ min: 10, max: 80 }),
    opacity: chance.floating({ min: 0.3, max: 0.7, float: 2 })
  },
  {
    name: 'mongo',
    alt: 'mongo-logo',
    offset: chance.floating({ min: 2, max: 2.9, float: 2 }),
    speed: chance.floating({ min: 0, max: 2, float: 2 }),
    marginLeft: chance.integer({ min: 10, max: 80 }),
    opacity: chance.floating({ min: 0.3, max: 0.7, float: 2 })
  },
]

export const delay = 200; // in ms

export const awesomeTextShow = !isMobile ? 600 : 400; // scroll position when text will appear in px
export const maskSectionShow = !isMobile ? 1250 : 900;
export const cardsSectionShow = !isMobile ? 1950 : 1300;
export const shortlyAbout = 'Excellent problem-solving skills and ability to perform well in a team. Seeking to help companies develop their product as a Frontend / React Native developer, as well as grow and develop my own skills as a coder'.split(' ');

export const defaultToastConfig: ToastProps = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "toast-message image-bordered-shadow-small",
  bodyClassName: "toast-message-body special-text-small",
  progressClassName: 'toast-message-progress'
};
