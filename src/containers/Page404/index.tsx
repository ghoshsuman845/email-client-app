import Page404Img from '../../assets/images/Page404.jpg';
import ErrorPage from '../../components/ErrorPage';

const Page404  : React.FC = ()=> {
    return (
      <div className='page-404'>
        <ErrorPage
          notFoundImg={Page404Img}
          buttonText='Back to home'
          buttonLink='/'
        />
      </div>
    );
}
export default Page404;