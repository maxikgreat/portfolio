import { IWork } from "@/types/models";
import { Icon } from 'semantic-ui-react';

interface WorkTimeline {
  items: IWork[],
}

export const WorkTimeline = ({ items }: WorkTimeline) => (
  <>
		<div className="cd-timeline-block">
			<div className="cd-timeline-img cd-picture"></div>
			<div className="cd-timeline-content">
        <span className="timeline-content-date">August 201234 - Midnight of today</span>
				<h2>Penta Consulting</h2>
        <div className="timeline-content-info">
          <span className="timeline-content-info-title">
            Front End Developer
          </span>
        </div>
				<p>Working alongside the designer team implementing the designs, also developing custom solutions to address team necessities.</p>
        <ul className="content-skills">
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
        <li>jQuery</li>
        <li>Wordpress</li>
        </ul>
			</div> 
		</div>
  </>
);
