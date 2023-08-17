export type Project = {
  title: string;
  tagline: string;
  url: string;
  github: string;
  logo: string;
  image: string;
  description: string | JSX.Element[];
  dateStarted: number;
  dateRetired: number;
  linesOfCode: number;
};

export const nullProject = {
  title: "Projects by Mike",
  tagline: "Select a project to learn more",
  url: "",
  github: "",
  logo: "",
  image: "",
  description: "ayylmao",
  dateStarted: 0,
  dateRetired: 0,
  linesOfCode: 0,
};

export const projects = {
  battleSchool: {
    title: "battleschool.io",
    tagline: "A competitive multiplayer game",
    url: "https://battleschool.io/battle-room",
    github: "https://github.com/snowdenwintermute/lucella",
    logo: "/project-logos/battle-school.png",
    image: "/project-images/battle-school-pc.png",
    description: [
      <h4>Front End Features</h4>,
      <ul>
        <li>Custom accessible modal, context menu, text input with error display, toast notification, radio group and select components</li>
        <li>Instant-appearing game input response in latencies of up to 1000ms (client prediction)</li>
        <li>Ability to post XSS sanitized links in chat</li>
        <li>Scalable theming (4 themes and counting)</li>
        <li>Responsive design, including game canvas</li>
        <li> All elements tab indexed for accessibility</li>
      </ul>,
      <h4>Back End Features</h4>,
      <ul>
        <li>Load tested for 30 concurrent players sending 30 socket events/second ($6/mo VPS)</li>
        <li>
          Bespoke authentication using a hybrid of JWT and sessions, including single use password recovery emails and auth-required soft account deletion
        </li>
        <li>
          Custom sliding window counters rate limiter <a href="https://www.youtube.com/watch?v=l_9NY7Ssdeg">(my video explanation)</a>
        </li>
        <li>Global error message standardization</li>
      </ul>,
      <h4>Dev and QA Features</h4>,
      <ul>
        <li> Custom CI pipeline to run Jest and Cypress tests on merge requests, and build and deploy via Docker Compose upon merging into main</li>
        <li> Integration tests with Jest involving long Socket.IO event chains (video)</li>
        <li> Full auth flow tested in Cypress, including transactional emails</li>
        <li>
          Docker setup for development with automatic installation and compilation of Protobufs and a latency/jitter generating proxy between the front and back
          end
        </li>
        <li> Ability to run concurrent Jest tests against code that is using the same Postgres hostname and the same Redis database without data collisions</li>
      </ul>,
    ],
    dateStarted: 0,
    dateRetired: 0,
    linesOfCode: 17000,
  },
  mcguffsilverman: {
    title: "mcguffsilverman.com",
    tagline: "A bespoke Ecommerce site",
    url: "https://mcguffsilverman.com",
    github: "https://github.com/SnowdenWintermute/ellen-silverman-v3",
    logo: "/project-logos/mcguffsilverman.png",
    image: "/project-images/mcguffsilverman-pc.png",
    description: "ayylmao",
    dateStarted: 0,
    dateRetired: 0,
    linesOfCode: 0,
  },
  reactRpg: {
    title: "React RPG",
    tagline: "Simple roguelike",
    url: "https://rpg.mike-silverman.com/",
    github: "https://github.com/SnowdenWintermute/React-RPG",
    logo: "/project-logos/react-rpg.png",
    image: "/project-images/react-rpg-pc.png",
    description: "ayylmao",
    dateStarted: 0,
    dateRetired: 0,
    linesOfCode: 0,
  },
  weatherOfTheFuture: {
    title: "Weather of the Future",
    tagline: "Plain JS single page application",
    url: "https://snowdenwintermute.github.io/customWeatherApp/",
    github: "https://github.com/SnowdenWintermute/customWeatherApp",
    logo: "/project-logos/weather-of-the-future.png",
    image: "/project-images/weather-of-the-future-pc.png",
    description: "ayylmao",
    dateStarted: 0,
    dateRetired: 0,
    linesOfCode: 0,
  },
  rainSim: {
    title: "Rain Simulation",
    tagline: "Featuring UI elements built in canvas",
    url: "https://snowdenwintermute.github.io/rainSim/",
    github: "https://github.com/SnowdenWintermute/rainSim",
    logo: "/project-logos/rain-sim.png",
    image: "/project-images/rain-sim-pc.png",
    description: "ayylmao",
    dateStarted: 0,
    dateRetired: 0,
    linesOfCode: 0,
  },
};
