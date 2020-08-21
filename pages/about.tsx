import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'
import { useRef } from 'react';

import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { useGetUser } from '@/actions/user';

const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`

export default function About() {
  const { data, loading } = useGetUser();

  const parallaxRef = useRef();

  return (
    <BaseLayout data={data} loading={loading}>
      <BasePage>
      <Parallax ref={parallaxRef} pages={3}>
      
        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundImage: url('clients', true)
          }}
        />

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => this.parallax.scrollTo(1)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src={url('server')} style={{ width: '20%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src={url('bash')} style={{ width: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src={url('clients-main')} style={{ width: '40%' }} />
        </ParallaxLayer>
      </Parallax>
      </BasePage>
    </BaseLayout>
  )
}
