import { useRef, useState } from 'react';
import { Grid, Progress } from 'semantic-ui-react';
import Typed from 'react-typed';
import { useSpring, animated, config, useChain, useSprings, SpringValue } from 'react-spring';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import { isMobile } from 'react-device-detect';

import { ParallaxIcon } from '@/components/shared/ParallaxIcon';
import { BaseLayout } from '@/components/layouts/BaseLayout';
import { useGetUser } from '@/actions/user';
import { 
  awesomeTextShow,
  maskSectionShow,
  cardsSectionShow, 
  skills,
  socials,
  shortlyAbout, 
  delay,
  icons,
  roles
} from '@/consts';

export default function Home() {
  const { data, loading } = useGetUser();

  const parallaxRef = useRef<IParallax>();
  const photoRef = useRef();
  const textRef = useRef();

  const [parallaxScrollPos, setParallaxScrollPos] = useState<number>(parallaxRef.current?.current);

  const photoProps: {
    transform: SpringValue<string>
  } = useSpring({
    ref: photoRef,
    config: config.slow,
    transform: 'scale(1)',
    opacity: 1,
    from: {
      transform: 'scale(2)',
      opacity: 0,
    }
  });

  const textProps: {
    transform: SpringValue<string>
  } = useSpring({
    ref: textRef,
    config: config.slow,
    transform: 'translateX(0)',
    opacity: 1,
    from: {
      transform: 'translateX(100%)',
      opacity: 0,
    }
  });

  const awesomeProps: {
    transform: SpringValue<string>,
  } = useSpring({
    config: config.slow,
    transform: parallaxScrollPos > awesomeTextShow 
      ? 'rotate(-16deg) translateX(0px)'
      : 'rotate(-16deg) translateX(200px)',
    opacity: parallaxScrollPos > awesomeTextShow ? 1 : 0,
  });

  const cardsProps: {
    card: SpringValue<any>,
    left: SpringValue<string>
  }[] = useSprings(socials.length, socials.map(
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

  const skillsProps: {
    skill: SpringValue<any>,
    transform: SpringValue<any>
  }[] = useSprings(skills.length, skills.map(
    (skill, index) => ({
      skill,
      config: config.slow,
      delay: delay * index,
      transform: parallaxScrollPos > maskSectionShow 
        ? 'translateX(0)' : 'translateX(100%)',
      opacity: parallaxScrollPos > maskSectionShow ? 1 : 0,
    })
  ));

  const scrollParallaxHandler = (): void => {
    setParallaxScrollPos(parallaxRef.current.current);
  }

  const socialCardsMobile = (index: number): number => {
    switch(index) {
      case 0: return 3.10;
      case 1: return 3.30;
      case 2: return 3.50;
      case 3: return 3.70;
      default: return 3;
    }
  }

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
            <Grid columns={2}>
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
          >
            <h2 className="section-title special-text">shortly about</h2>
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.30}
            speed={0.8}
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
          {!isMobile && icons.map(({ name, alt, marginLeft, offset, speed, opacity }, index) => (
            <ParallaxIcon
              offset={offset}
              speed={speed}
              name={name}
              alt={alt}
              marginLeftPercent={marginLeft}
              widthPercent={10}
              opacity={opacity}
              className={parallaxScrollPos > maskSectionShow ? 'icon' : 'icon blur'}
            />
          ))}
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
              offset={isMobile ? socialCardsMobile(index) : 3}
              speed={props.card.animation.to?.speed}
              key={index}
              factor={0}
              className="social-card"
            >
              <animated.a
                className={`socials image-bordered-shadow quart-image image-section-${props.card.animation.to?.index}`}
                target="_blank" 
                href={props.card.animation.to?.link}
                style={!isMobile ? props : {
                  ...props,
                  left: 0,
                }}
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
        </Parallax>
      </section>
    </BaseLayout>
  )
}
