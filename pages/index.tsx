import { useRef, useState } from 'react';
import { Grid, Progress } from 'semantic-ui-react';
import Typed from 'react-typed';
import { useSpring, animated, config, useChain, useSprings, SpringValue } from 'react-spring';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';

import { BaseLayout } from '@/components/layouts/BaseLayout';
import { useGetUser } from '@/actions/user';

const roles = ['Developer', 'Tech lover', 'Team player'];
const cards = [
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

const skills = [
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
    value: 70,
    text: 'Node/Express'
  },
  {
    value: 80,
    text: 'RWD/Bootstrap/Semantic UI/Material UI'
  },
  {
    value: 60,
    text: 'Git'
  },
  {
    value: 30,
    text: 'PHP(Laravel)/SQL'
  }
];

const delay = 200; // in ms

const awesomeTextShow = 700; // scroll position when text will appear in px
const maskSectionShow = 1470;
const cardsSectionShow = 2000;
const shortlyAbout = 'Excellent problem-solving skills and ability to perform well in a team. Seeking to help companies develop their product as a Frontend / React Native developer, as well as grow and develop my own skills as a coder'.split(' ');


export default function Home() {
  const { data, loading } = useGetUser();

  const parallaxRef = useRef<IParallax>();
  const photoRef = useRef<ReactSpringHook>();
  const textRef = useRef<ReactSpringHook>();

  const [parallaxScrollPos, setParallaxScrollPos] = useState<number>(parallaxRef.current?.current);

  const photoProps = useSpring({
    ref: photoRef,
    config: config.slow,
    transform: 'scale(1)',
    opacity: 1,
    from: {
      transform: 'scale(2)',
      opacity: 0,
    }
  });

  const textProps = useSpring({
    ref: textRef,
    config: config.slow,
    transform: 'translateX(0)',
    opacity: 1,
    from: {
      transform: 'translateX(100%)',
      opacity: 0,
    }
  });

  const awesomeProps = useSpring({
    config: config.slow,
    transform: parallaxScrollPos > awesomeTextShow 
      ? 'rotate(-16deg) translateX(0px)'
      : 'rotate(-16deg) translateX(200px)',
    opacity: parallaxScrollPos > awesomeTextShow ? 1 : 0,
  });

  const cardsProps: {
    card: SpringValue<any>,
    left: SpringValue<string>
  }[] = useSprings(cards.length, cards.map(
    (card, index) => ({
      card,
      config: config.slow,
      delay: delay * index,
      left: parallaxScrollPos > cardsSectionShow 
        ? `${index === 0 ? '0' : index * 25}%`
        : `${index === 0 ? '0' : index + '0'}%`,
      opacity: parallaxScrollPos > cardsSectionShow ? 1 : 0,
    })
  ));

  const skillsProps = useSprings(skills.length, skills.map(
    (skill, index) => ({
      skill,
      config: config.slow,
      delay: delay * index,
      transform: parallaxScrollPos > maskSectionShow 
        ? 'translateX(0)' : 'translateX(100%)',
      opacity: parallaxScrollPos > maskSectionShow ? 1 : 0,
    })
  ));


  const scrollParallaxHandler = (): void => setParallaxScrollPos(parallaxRef.current.current);

  useChain([{ current: photoRef.current }, textRef], [0, 1]);

  return (
    <BaseLayout data={data} loading={loading}>
      <section className="home-section">
        <Parallax 
          ref={parallaxRef} 
          pages={4}
          className="parallax-container"
          onScrollCapture={scrollParallaxHandler}
        >
          {/* FIRST SECTION */}
          <ParallaxLayer
            offset={0}
            speed={0}
          >
            <Grid columns={2} stackable>
              <Grid.Row>
                <Grid.Column>
                  <animated.div className="hero-section" style={photoProps}>
                    <div className="hero-section-content">
                      <h2 className="special-text">Full Stack Web Developer</h2>
                      <hr />
                      <div className="hero-section-content-intro">
                        Have a look at my portfolio and job history
                      </div>
                    </div>
                    <div className="image-section-1 image-bordered-shadow" />
                    <div className="shadow-custom">
                      <div className="shadow-inner"> </div>
                    </div>
                  </animated.div>
                </Grid.Column>
                <Grid.Column>
                  <animated.div className="hero-welcome" style={textProps}>
                    <div className="hero-welcome-text">
                      <h1>
                        Welcome to my portfolio website.
                        Get informed, collaborate and discover projects I was working on through the years!
                      </h1>
                    </div>
                    <div className="self-typed-wrapper">
                      <Typed
                        loop
                        showCursor
                        strings={roles}
                        typeSpeed={70}
                        backSpeed={70}
                        backDelay={1000}
                        loopCount={0}
                        startDelay={500}
                        className="self-typed special-text"
                        cursorChar="|"
                      />
                    </div>
                    <div className="hero-welcome-bio">
                      <button 
                        className="btn-glow btn-hover-shine"
                        onClick={() => parallaxRef.current.scrollTo(1)}
                      >Let's take a look</button>
                    </div>
                  </animated.div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </ParallaxLayer>
          {/* SECOND SECTION */}
          <ParallaxLayer
            offset={1}
            speed={0.2}
            factor={0}
          >
            <img
              className={
                `image-section-2 image-bordered-shadow 
                ${parallaxScrollPos > awesomeTextShow ? 'blur' : ''}`
              }
              src="/assets/images/section-2.jpg"
              alt="section two"
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.1}
            speed={0}
            factor={0}
          >
            <h2 className="section-title special-text">shortly about</h2>
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.30}
            speed={0.8}
            factor={0}
          >
            <animated.h2 
              className="title-with-awesome special-text"
              style={awesomeProps}
            >
              Passionate about...<br />
              <span className="special-text-white">
                {shortlyAbout.map((word, index) => (
                  <span key={index} className="hover-text">{word}&nbsp;</span>
                ))}
              </span>
            </animated.h2>
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.30}
            speed={1}
            factor={0}
          >
            <img 
              className={
                `image-section-3 image-bordered-shadow 
                ${parallaxScrollPos > awesomeTextShow ? '' : 'blur'}`
              }
              src="/assets/images/section-3.jpg" 
              alt="section three"
            />
          </ParallaxLayer>

          {/* THIRD SECTION */}
          <ParallaxLayer
            offset={2}
            speed={1.25}
          >
            <img
              className={
                `image-section-4 image-bordered-shadow 
                ${parallaxScrollPos > maskSectionShow ? 'blur' : ''}`
              }
              src="/assets/images/section-4.jpg"
              alt="section four"
            />
          </ParallaxLayer>
          <ParallaxLayer
            offset={2.1}
            speed={2}
            className="flexed-layer"
            factor={0.7}
          >
            <div className="skills-image-container">
              <img
                className={
                  `image-section-5 
                  ${parallaxScrollPos > maskSectionShow ? '' : 'blur'}`
                }
                src="/assets/images/section-5.png"
                alt="section five"
              />
            </div>
            <div className="skills-container">
              {skillsProps.map((props, index) => (
                <animated.div className="progress-container" style={props} key={index}>
                  <Progress
                    size="small"
                    percent={props.skill.animation.to?.value}
                    indicating
                  >
                    <span className="special-text">{props.skill.animation.to?.text}</span>
                  </Progress>
                </animated.div>
              ))}
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            offset={2}
            speed={0}
          >
            <h2 className="section-title special-text">main skills</h2>
          </ParallaxLayer>
          {/* FOURTH SECTION */}
          <ParallaxLayer
            offset={3}
            speed={0}
          >
            <h2 className="section-title special-text">find me on</h2>
          </ParallaxLayer>
          {parallaxScrollPos > maskSectionShow && cardsProps.map((props, index) => (
            <ParallaxLayer
              offset={3}
              speed={props.card.animation.to?.speed}
              key={index}
              factor={0}
            >
              <animated.a
                className={`socials image-bordered-shadow quart-image image-section-${props.card.animation.to?.index}`}
                target="_blank" 
                href={props.card.animation.to?.link}
                style={props}
              >
                <h3 className="special-text">{props.card.animation.to?.title}</h3>
                <img 
                  className="socials-image" 
                  src={`/assets/images/icons/${props.card.animation.to?.image}.png`} 
                  style={{
                    borderRadius: props.card.animation.to?.title === 'GitHub' ? 30 : 0
                  }}
                />
              </animated.a>
            </ParallaxLayer>
          ))}
          {/* <ParallaxIcon
            offset={0.98}
            speed={0}
            name="react"
            alt="react-logo"
            marginLeftPercent={0}
            widthPercent={20}
          /> */}
        </Parallax>
      </section>
    </BaseLayout>
  )
}
