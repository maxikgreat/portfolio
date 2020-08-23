import { ParallaxLayer } from '@react-spring/parallax';

interface ParallaxIconProps {
  offset: number,
  speed: number,
  name: string,
  className?: string,
  alt: string,
  marginLeftPercent: number,
  widthPercent: number,
}

export const ParallaxIcon = ({
  offset, speed, name, className, alt, marginLeftPercent, widthPercent
}: ParallaxIconProps) => {
  return (
    <ParallaxLayer
      offset={offset}
      speed={speed}
    >
      <img
        src={`/assets/images/icons/${name}.png`}
        className={className}
        alt={alt}
        style={{
          marginLeft: `${marginLeftPercent}%`,
          width: `${widthPercent}%`
        }}
      />
    </ParallaxLayer>
    
  )
};