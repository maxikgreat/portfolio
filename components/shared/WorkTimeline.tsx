import { IWork } from "@/types/models";
import { Icon } from 'semantic-ui-react';

interface WorkTimeline {
  items: IWork[],
}

export const WorkTimeline = ({ items }: WorkTimeline) => (
  <>
		<div className="cd-timeline-block">
			<div className="cd-timeline-img cd-picture">
			</div>

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

		<div className="cd-timeline-block">
			<div className="cd-timeline-img cd-movie">
			</div>

			<div className="cd-timeline-content">
				<h2>Title of section 2</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde?</p>
				<span className="cd-date">Jan 18</span>
			</div>
		</div>

		<div className="cd-timeline-block">
			<div className="cd-timeline-img cd-picture">
			</div>

			<div className="cd-timeline-content">
				<h2>Title of section 3</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, obcaecati, quisquam id molestias eaque asperiores voluptatibus cupiditate error assumenda delectus odit similique earum voluptatem doloremque dolorem ipsam quae rerum quis. Odit, itaque, deserunt corporis vero ipsum nisi eius odio natus ullam provident pariatur temporibus quia eos repellat consequuntur perferendis enim amet quae quasi repudiandae sed quod veniam dolore possimus rem voluptatum eveniet eligendi quis fugiat aliquam sunt similique aut adipisci.</p>
				<span className="cd-date">Jan 24</span>
			</div>
		</div>

		<div className="cd-timeline-block">
			<div className="cd-timeline-img cd-location">
			</div>

			<div className="cd-timeline-content">
				<h2>Title of section 4</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum aut hic quasi placeat iure tempora laudantium ipsa ad debitis unde? Iste voluptatibus minus veritatis qui ut.</p>
				<span className="cd-date">Feb 14</span>
			</div>
		</div>

		<div className="cd-timeline-block">
			<div className="cd-timeline-img cd-location">
			</div> 

			<div className="cd-timeline-content">
				<h2>Title of section 5</h2>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, optio, dolorum provident rerum.</p>
				<span className="cd-date">Feb 18</span>
			</div>
		</div>

		<div className="cd-timeline-block">
			<div className="cd-timeline-img cd-movie">
			</div>

			<div className="cd-timeline-content">
				<h2>Final Section</h2>
				<p>This is the content of the last section</p>
				<span className="cd-date">Feb 26</span>
			</div>
		</div>
  </>
);
