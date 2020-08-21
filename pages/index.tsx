import { useRef } from 'react';
import { Grid } from 'semantic-ui-react';
import Typed from 'react-typed';
import { useSpring, useChain, animated, config } from 'react-spring';
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

import { BaseLayout } from '@/components/layouts/BaseLayout';
import { useGetUser } from '@/actions/user';

const ROLES = ['Developer', 'Tech lover', 'Team player'];

export default function Home() {
  const { data, loading } = useGetUser();

  const photoRef = useRef();
  const textRef = useRef();

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

  useChain([{ current: photoRef.current }, textRef], [0, 1]);

  return (
    <BaseLayout data={data} loading={loading}>
      <section className="home-section">
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
                <img className="image" src="assets/images/section-1.jpg"/>
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
                    strings={ROLES}
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
      </section>
    </BaseLayout>
  )
}
