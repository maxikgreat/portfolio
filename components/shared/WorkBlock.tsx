import { animated, SpringValue } from 'react-spring';

import { IWork } from "@/types/models";

interface WorkBlockProps {
  props: {
    transform: SpringValue<string>,
    opacity: SpringValue<number>
  },
  work: IWork,
}

export const WorkBlock = ({ props, work }: WorkBlockProps) => {

  const normalizeWithZero = (value: number): string => value / 10 >= 1 ? `${value}` : `0${value}`;

  const calculateDate = (stringDate: string): string => {
    const day = normalizeWithZero(new Date(stringDate).getDate());
    const month = normalizeWithZero(new Date(stringDate).getMonth() + 1);
    const year = new Date(stringDate).getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <animated.div className="cd-timeline-block" style={props}>
      <div className="cd-timeline-data special-text-white">
        <span>{calculateDate(work.endDate)}</span>
        <span>-</span>
        <span>{calculateDate(work.startDate)}</span>
      </div>
      <div className="cd-timeline-img cd-picture"></div>
      <div className="cd-timeline-data-mobile special-text-white">
        <span>{calculateDate(work.endDate)}</span>
        <span>&nbsp;-&nbsp;</span>
        <span>{calculateDate(work.startDate)}</span>
      </div>
      <div className="cd-timeline-content image-bordered-shadow">
        <div className="timeline-content-title">
          <h2 className="special-text">{work.jobPosition}</h2>
          <h3>
            <a href={work.companyWebsite} target="_blank">{work.company}</a>
            &nbsp;&bull;&nbsp;{work.location}
          </h3>
        </div>
        <ul className="timeline-content-general">
          {work.descriptionPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <p className="timeline-content-key">
          <span className="special-text-small">Key achievement:&nbsp;</span>
          {work.keyPoint}</p>
      </div> 
    </animated.div>
  )
};
