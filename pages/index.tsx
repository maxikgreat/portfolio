import { useRef, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import Typed from 'react-typed';
import { useSpring, animated, config, useChain, ReactSpringHook } from 'react-spring';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';

import { BaseLayout } from '@/components/layouts/BaseLayout';
import { useGetUser } from '@/actions/user';
import { ParallaxIcon } from '@/components/shared/ParallaxIcon';

const roles = ['Developer', 'Tech lover', 'Team player'];
const awesomeTextShow = 600; // scroll position when text will appear in px

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

  const getParallaxPosition = (): void => {
    setParallaxScrollPos(parallaxRef.current.current);
  };

  useChain([{ current: photoRef.current }, textRef], [0, 1]);

  return (
    <BaseLayout data={data} loading={loading}>
      <section className="home-section">
        <Parallax 
          ref={parallaxRef} 
          pages={3}
          className="parallax-container"
          onScrollCapture={getParallaxPosition}
        >
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
                    <img className="image-section-1 image-bordered-shadow" src="assets/images/section-1.jpg"/>
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
                      <h2>
                        Let's take a look on my work.
                      </h2>
                    </div>
                  </animated.div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </ParallaxLayer>
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
            offset={1.35}
            speed={0.8}
          >
            <animated.h2 
              className="title-with-awesome special-text"
              style={awesomeProps}
            >
              Example txt<br />
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, aliquid.
              </span>
            </animated.h2>
          </ParallaxLayer>
          <ParallaxLayer
            offset={1.25}
            speed={1}
          >
            <img 
              className="image-section-3 image-bordered-shadow"
              src="/assets/images/section-3.jpg" 
              alt="section three"
            />
          </ParallaxLayer>
          {/* <ParallaxLayer
            offset={1.5}
            speed={1.25}
          >
            <img
              className="image-section-4"
              src="/assets/images/section-4.jpg"
              alt="section four"
            />
          </ParallaxLayer> */}
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
