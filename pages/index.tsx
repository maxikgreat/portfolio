import { Grid } from 'semantic-ui-react';
import Typed from 'react-typed';

import { BaseLayout } from '@/components/layouts/BaseLayout';

const ROLES = ['Developer', 'Tech lover', 'Team player'];

export default function Home() {
  return (
    <BaseLayout>
      <section className="home-section">
        <Grid columns={2} stackable>
          <Grid.Row>
            <Grid.Column>
              <div className="hero-section">
                <div className="hero-section-content">
                  <h2> Full Stack Web Developer</h2>
                  <hr />
                  <div className="hero-section-content-intro">
                    Have a look at my portfolio and job history
                  </div>
                </div>
                <img className="image" src="assets/images/section-1.jpg"/>
                <div className="shadow-custom">
                  <div className="shadow-inner"> </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="hero-welcome">
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
                    className="self-typed"
                    cursorChar="|"
                  />
                </div>
                <div className="hero-welcome-bio">
                  <h2>
                    Let's take a look on my work.
                  </h2>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </section>
    </BaseLayout>
  )
}
