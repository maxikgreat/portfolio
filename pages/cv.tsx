import { BaseLayout } from '@/components/layouts/BaseLayout';
import { BasePage } from '@/components/shared/BasePage';
import { useGetUser } from '@/actions/user';

export default function CV() {
  // const { data, loading } = useGetUser();
  return (
    <BaseLayout data={null} loading={null} title="CV">
      <BasePage className="cv" title="Curriculum Vitae">
        <embed 
          src="assets/Maksym_Vasylenko_CV.pdf" 
          width="100%"
          height="500"
          // pluginspage="http://www.adobe.com/products/acrobat/readstep2.html"
        />
        <a href="/assets/Maksym_Vasylenko_CV.pdf" download>
          <button 
            className="btn-glow btn-hover-shine"
          >Download</button>
        </a>
      </BasePage>
    </BaseLayout>
  )
}
