import { animated } from 'react-spring';
import { CSSProperties } from 'react';

import { IWork } from "@/types/models";

interface WorkBlockProps {
  // work: IWork,
  props: CSSProperties
}

export const WorkBlock = ({ props }: WorkBlockProps) => (
  <animated.div className="cd-timeline-block" style={props} >
    <div className="cd-timeline-img cd-picture"></div>
    <div className="cd-timeline-content">
      <span className="timeline-content-date">From August - Till i die</span>
      <div className="timeline-content-title">
        <a href="https://localhost:3000" target="_blank">Company</a>
        <h2 className="timeline-content-title-divider">&bull;</h2>
        <h2>New York</h2>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam amet quod voluptate consectetur repellendus ipsam nulla quae beatae veritatis iure!</p>
      <ul className="content-skills">
      <li>HTML5</li>
      <li>CSS3</li>
      <li>JavaScript</li>
      <li>jQuery</li>
      <li>Wordpress</li>
      </ul>
    </div> 
  </animated.div>
);
