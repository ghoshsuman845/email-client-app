import Page404Img from '../../assets/images/Page404.svg';
import ErrorPage from '../../components/ErrorPage';

const Page404  : React.FC = ()=> {
    return (
      <div className='valign-wrapper width100'>
        <ErrorPage
          notFoundImg={Page404Img}
          title='Oopsie! Something’s missing...'
          subTitle='What you’re looking for may have been replaces in long term memory.'
          buttonText='Back to home'
          buttonLink='/'
          buttonColor='bg-blue'
        />
      </div>
    );
}
export default Page404;