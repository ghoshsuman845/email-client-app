import Page500Img from '../../assets/images/Page500.png';
import ErrorPage from '../ErrorPage';

const Page500: React.FC = ()=> {
    return (
      <div className='Page'>
        <ErrorPage
          notFoundImg={Page500Img}
          title='Oopsie! Something went wrong...'
          buttonText='Back to home'
          buttonLink='/'
          buttonColor='bg-green'
        />
      </div>
    );
}
export default Page500;