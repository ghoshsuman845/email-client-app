import Page500Img from '../../assets/images/Page500.jpg';
import ErrorPage from '../ErrorPage';

const Page500: React.FC = ()=> {    
    return (
      <div className='page-500'>
        <ErrorPage
          notFoundImg={Page500Img}
          buttonText='Back to home'
          buttonLink='/'
        />
      </div>
    );
}
export default Page500;