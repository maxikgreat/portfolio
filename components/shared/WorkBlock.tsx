import { animated, SpringValue } from 'react-spring';
import { CSSProperties } from 'react';

import { IWork } from "@/types/models";

interface WorkBlockProps {
  // work: IWork,
  props: {
    transform: SpringValue<string>,
  },
}

export const WorkBlock = ({ props }: WorkBlockProps) => (
  <animated.div className="cd-timeline-block" style={props} >
    <div className="cd-timeline-data special-text-white">
      <span>01.20.2021</span>
      <span>-</span>
      <span>02.03.1876</span>
    </div>
    <div className="cd-timeline-img cd-picture"></div>
    <div className="cd-timeline-data-mobile special-text-white">
      <span>01.20.2021</span>
      <span>&nbsp;-&nbsp;</span>
      <span>02.03.1876</span>
    </div>
    <div className="cd-timeline-content  image-bordered-shadow">
      <div className="timeline-content-title">
        <h2 className="special-text">Someend Developer</h2>
        <h3>
          <a href="https://localhost:3000" target="_blank">Company</a>,
          Poznań
        </h3>
      </div>
      <ul className="timeline-content-general">
        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam, quod!</li>
        <li>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit facilis perferendis qui quibusdam numquam sapiente.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
        <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat, accusamus voluptatibus!</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo sint, tenetur rem quisquam quam atque!</li>
      </ul>
      <p className="timeline-content-key">
        <span className="special-text-small">Key achievement:&nbsp;</span>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo fugiat dolorem possimus excepturi nihil cum, ipsa expedita inventore tempore odio.</p>
    </div> 
  </animated.div>
);
