import { IWork } from "@/types/models";
import { Icon } from 'semantic-ui-react';

interface WorkTimeline {
  items: IWork[],
}

export const WorkTimeline = ({ items }: WorkTimeline) => (
  <>
		{items.length > 0 && items.map(item => (
      <div className="cd-timeline-block" key={item._id}>
        <div className="cd-timeline-img cd-picture"></div>
        <div className="cd-timeline-content">
          <span className="timeline-content-date">From August - Till i die</span>
          <div className="timeline-content-title">
            <a href={item.companyWebsite} target="_blank">{item.company}</a>
            <h2 className="timeline-content-title-divider">&bull;</h2>
            <h2>{item.location}</h2>
          </div>
          <p>{item.description}</p>
          <ul className="content-skills">
          <li>HTML5</li>
          <li>CSS3</li>
          <li>JavaScript</li>
          <li>jQuery</li>
          <li>Wordpress</li>
          </ul>
        </div> 
      </div>
    ))}
  </>
);
