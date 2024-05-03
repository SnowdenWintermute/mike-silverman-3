import Link from "next/link";
import { WebTechNames } from "../components/WebTechnologyIcon";

export type Project = {
  title: string;
  tagline: string;
  url: string;
  github: string;
  logo: string;
  image?: string;
  mobileImage?: string;
  youtube_video?: string;
  embeded_video?: string;
  technologies: WebTechNames[];
  description: JSX.Element[];
  dateStarted: number;
  dateRetired: number;
  linesOfCode: number;
};

export const nullProject: Project = {
  title: "Projects by Mike",
  tagline: "Select a project using the left sidebar",
  url: "",
  github: "",
  logo: "",
  image: "",
  description: [
    // <p>I have built projects using the technologies listed above, and I'm always looking for new tools to add to the toolbox.</p>,
  ],
  technologies: [...Object.values(WebTechNames).map((key) => key)],
  dateStarted: 0,
  dateRetired: 0,
  linesOfCode: 0,
};

export const projects: { [key: string]: Project } = {
  speedDungeon: {
    title: "Speed Dungeon",
    tagline: "3D Cooperative RPG",
    url: "https://roguelikeracing.com",
    github: "https://github.com/snowdenwintermute/roguelike-racing",
    logo: "/project-logos/speed-dungeon.png",
    embeded_video: "/videos/speed-dungeon.mp4",
    technologies: [
      WebTechNames.rust,
      WebTechNames.yew,
      WebTechNames.bevy,
      WebTechNames.tailwind,
    ],
    description: [
      <p>
          A multiplayer cooperative dungeon crawler
      </p>,
      <h4>Features</h4>,
      <ul>
        <li>Robust UI of the web coupled with fast 3D graphics powered by Rust and WebAssembly</li>
        <li>Play with friends or race against your opponents</li>
        <li>Procedurally generated items and monsters</li>
        <li>Control the game with the keyboard for faster dungeoneering</li>
        <li>Trade items with your party members</li>
      </ul>,
    ],
    dateStarted: +new Date("Sept 15, 2023"),
    dateRetired: +new Date("May 2, 2024"),
    linesOfCode: 29431,
  },
  battleSchool: {
    title: "battleschool.io",
    tagline: "Real-time multiplayer game",
    url: "https://battleschool.io/battle-room",
    github: "https://github.com/snowdenwintermute/lucella",
    logo: "/project-logos/battle-school.png",
    // image: "/project-images/battle-school-pc.png",
    // mobileImage: "/project-images/battle-school-mobile.png",
    embeded_video: "/videos/battle-school.mp4",
    technologies: [
      WebTechNames.typescript,
      WebTechNames.nextJs,
      WebTechNames.redux,
      WebTechNames.sass,
      WebTechNames.canvas,
      WebTechNames.matterJs,
      WebTechNames.nodeJs,
      WebTechNames.postgres,
      WebTechNames.redis,
      WebTechNames.socketIo,
      WebTechNames.protobuf,
      WebTechNames.docker,
      WebTechNames.cypress,
      WebTechNames.jest,
    ],
    description: [
      <p>
        A real time strategy game with a chat lobby and ranked matchmaking. It has been through
        two full rewrites, the most recent of which included changing the database from MongoDB to Postgres.
      </p>,
      <h4>Front End Features</h4>,
      <ul>
        <li>Instant-appearing game input response in latencies of up to 1000ms (client prediction)</li>
        <li>Scalable theming (4 themes and counting)</li>
        <li>Custom accessible modal, context menu, text input with error display, toast notification, radio group and select components</li>
        <li>All elements tab indexed for accessibility</li>
        <li>Ability to post XSS sanitized links in chat</li>
        <li>Responsive design, including game canvas</li>
      </ul>,
      <h4>Back End Features</h4>,
      <ul>
        <li>Load tested for 30 concurrent players sending 30 socket events/second ($6/mo VPS)</li>
        <li>
          Bespoke authentication using a hybrid of JWT and sessions, including single use password recovery emails and auth-required soft account deletion
        </li>
        <li>
          Custom sliding window counters rate limiter <Link href="https://www.youtube.com/watch?v=l_9NY7Ssdeg">(my video explanation)</Link>
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
    dateStarted: +new Date("Dec 14, 2019"),
    dateRetired: +new Date("Jun 10, 2023"),
    linesOfCode: 17000,
  },
  mcguffsilverman: {
    title: "mcguffsilverman.com",
    tagline: "Bespoke Ecommerce site",
    url: "https://mcguffsilverman.com",
    github: "https://github.com/SnowdenWintermute/ellen-silverman-v3",
    logo: "/project-logos/mcguffsilverman.png",
    image: "/project-images/mcguffsilverman-pc.png",
    mobileImage: "/project-images/mcguffsilverman-mobile.png",
    technologies: [WebTechNames.javascript, WebTechNames.react, WebTechNames.materialUi, WebTechNames.css, WebTechNames.nodeJs, WebTechNames.mongoDb],
    description: [
      <p>
        The third iteration of one of my first ever projects, a website to sell my mom's artwork.{" "}
        <Link href="https://ecommerce.mike-silverman.com/the-professor">Check out the animated storybook</Link>
      </p>,
      <h4>Shop Features</h4>,
      <ul>
        <li>Over 700 paintings categorized and sortable by various metrics</li>
        <li>Credit card payment accepted via Stripe</li>
        <li>Save shipping addresses to your account</li>
        <li>Recieve email notification when order is shipped</li>
        <li>Add and remove items to a cart which persists in local storage</li>
        <li>View your order history and status</li>
        <li>Create an account with email or Google account</li>
      </ul>,
      <h4>Administrator Features</h4>,
      <ul>
        <li>Upload new item images in bulk with multi-image uploader as well as their associated info via .csv</li>
        <li>Images automatically resized on the server to create thumbnails</li>
        <li>Recieve email notification when an item is purchased</li>
        <li>Categorize orders and add tracking info</li>
        <li>Edit items and see the number of times they were viewed</li>
      </ul>,
      <h4>Frontend Features</h4>,
      <ul>
        <li>Custom image fader homepage</li>
        <li>Gallery thumbnails are cached on first load</li>
        <li>
          <Link href="https://ecommerce.mike-silverman.com/the-professor">Animated storybook</Link>
        </li>
      </ul>,
    ],
    dateStarted: +new Date("Nov 23, 2020"),
    dateRetired: +new Date("Jul 16, 2022"),
    linesOfCode: 0,
  },
  mmo: {
    title: "MMO Architecture",
    tagline: "Kubernetes adventure",
    url: "https://www.youtube.com/watch?v=mBAn0_6rcZU",
    github: "https://github.com/SnowdenWintermute/mmo/tree/crossBorderInteractions",
    logo: "/project-logos/mmo.png",
    image: "",
    youtube_video: "https://www.youtube.com/watch?v=mBAn0_6rcZU",
    technologies: [
      WebTechNames.kubernetes,
      WebTechNames.docker,
      WebTechNames.typescript,
      WebTechNames.nodeJs,
      WebTechNames.websockets,
      WebTechNames.redis,
      WebTechNames.nextJs,
      WebTechNames.canvas,
      WebTechNames.matterJs,
      WebTechNames.sass,
    ],
    description: [
      <p>
        An attempt to implement server architecture for a massively multiplayer online game, based on the outline written on the now defunct mmo-blueprint.com.
        Because of the gargantuan size of this task and my inexperience at the time of working on it, I pivoted to a smaller project,{" "}
        <Link href="http://battleschool.io/battle-room">Battle School</Link> to improve my skills before I eventually return to this project.
      </p>,
      <h4>Features</h4>,
      <ul>
        <li>Multiple virtual machines which calculate positions of and interactions between entities</li>
        <li>VMs transfer ownership of entities when they cross territory borders</li>
        <li>
          Ability to share TypeScript code packages between frontend and backend accross different Kubernetes pods while getting live updates to code changes in
          development. Check out the <Link href="https://www.youtube.com/watch?v=G5e_9zbbSSQ">video tutorial</Link> I made explaining how to do this.
        </li>
        <li>
          Kubernetes pods can send direct messages to each other. Check out the <Link href="https://www.youtube.com/watch?v=wpGTNwtVOKU">video tutorial</Link> I
          made which has over 1.8k views and 32 likes.
        </li>
      </ul>,
    ],
    dateStarted: +new Date("Jul 22, 2021"),
    dateRetired: +new Date("Sep 15, 2022"),
    linesOfCode: 0,
  },
  boxswap: {
    title: "boxswap",
    tagline: "NFT internship",
    url: "https://boxswap.io",
    github: "https://github.com/boxswap",
    logo: "/project-logos/boxswap.png",
    image: "/project-images/boxswap-pc.png",
    mobileImage: "/project-images/boxswap-mobile.png",
    technologies: [WebTechNames.typescript, WebTechNames.react, WebTechNames.css],
    description: [
      <p>
        An internship with a startup based in Thailand where I worked on the front end of an application which facilitates NFT swaps. During my time there I met
        the founders of Axie Inifinity and the Co-Founder of CoinGecko.
      </p>,
      <h4>Features Worked On</h4>,
      <ul>
        <li>Landing page which is still in use today</li>
        <li>Table displaying the tokens in users' NFT wallets</li>
        <li>NFT search results infinite scroll component</li>
        <li>
          Testing a new implementation of a smart contract on the Ethereum network which would award users with NFT "badges" based on gamified use of the app
        </li>
      </ul>,
    ],
    dateStarted: +new Date("Feb 1, 2019"),
    dateRetired: +new Date("Feb 1, 2020"),
    linesOfCode: 0,
  },
  reactRpg: {
    title: "React RPG",
    tagline: "Simple roguelike",
    url: "https://rpg.mike-silverman.com/",
    github: "https://github.com/SnowdenWintermute/React-RPG",
    logo: "/project-logos/react-rpg.png",
    image: "/project-images/react-rpg-pc.png",
    mobileImage: "/project-images/react-rpg-mobile.png",
    description: [
      <p>
        One of my earliest projects - a game where players try to reach the bottom floor of the dungeon while fighting deadly monsters, learning powerful
        abilities and collecting randomly generated equipment.
      </p>,
    ],
    technologies: [WebTechNames.react, WebTechNames.css, WebTechNames.javascript],
    dateStarted: +new Date("July 17, 2018"),
    dateRetired: +new Date("Sep 3, 2018"),
    linesOfCode: 1873 + 5 + 8 + 1121 + 69 + 16 + 65 + 18 + 35 + 182 + 59 + 91 + 15 + 112 + 126 + 62 + 18 + 170 + 309 + 39 + 38 + 34,
  },
  weatherOfTheFuture: {
    title: "Weather of the Future",
    tagline: "Plain JS single page application",
    url: "https://snowdenwintermute.github.io/customWeatherApp/",
    github: "https://github.com/SnowdenWintermute/customWeatherApp",
    logo: "/project-logos/weather-of-the-future.png",
    image: "/project-images/weather-of-the-future-pc.png",
    mobileImage: "/project-images/weather-of-the-future-mobile.png",
    description: [
      <p>
        Notable for the fact that it uses no frameworks or libraries, this single page app fetches and displays data from the OpenWeatherMap API. It is by
        building such an application that I came to understand why front end frameworks were created.
      </p>,
    ],
    technologies: [WebTechNames.html, WebTechNames.css, WebTechNames.javascript],
    dateStarted: +new Date("Oct 16, 2018"),
    dateRetired: +new Date("Nov 11, 2018"),
    linesOfCode: 342 + 58 + 71 + 30 + 50 + 50,
  },
  vertices: {
    title: "Vertices",
    tagline: "Artist portfolio",
    url: "https://snowdenwintermute.github.io/vertices-product-page/index.html",
    github: "https://github.com/SnowdenWintermute/vertices-product-page",
    logo: "/project-logos/vertices.png",
    image: "/project-images/vertices-pc.png",
    mobileImage: "/project-images/vertices-mobile.png",
    description: [
      <p>
        Pro-bono work for a 3D graphics artist I met online. I worked with them to create the website they were envisioning, taking direction and edits from
        them daily throughout the process. Created without the use of any frameworks, this site is notable for the responsive carroussel component I figured out
        how to make myself using vanilla JS and SCSS.
      </p>,
    ],
    technologies: [WebTechNames.html, WebTechNames.sass, WebTechNames.javascript],
    dateStarted: +new Date("Oct 20, 2018"),
    dateRetired: +new Date("Nov 27, 2018"),
    linesOfCode: 0,
  },
  rainSim: {
    title: "Rain Simulation",
    tagline: "UI elements built in canvas",
    url: "https://snowdenwintermute.github.io/rainSim/",
    github: "https://github.com/SnowdenWintermute/rainSim",
    logo: "/project-logos/rain-sim.png",
    image: "/project-images/rain-sim-pc.png",
    mobileImage: "/project-images/rain-sim-mobile.png",
    description: [
      <p>The start of my love of the Canvas API. I wanted to make a rain simulation but ended up spending most of the time on creating the slider input.</p>,
    ],
    technologies: [WebTechNames.canvas, WebTechNames.html, WebTechNames.css, WebTechNames.javascript],
    dateStarted: +new Date("Sep 4, 2018"),
    dateRetired: +new Date("Sep 17, 2018"),
    linesOfCode: 29 + 198 + 19 + 112 + 116 + 215 + 12,
  },
};
