
import { Link } from 'react-router-dom';
import { ErrorPageProps } from '../../utils/types/type';

const ErrorPage : React.FC<ErrorPageProps> = ({ notFoundImg, buttonLink, buttonText }) => {    
    return (
        <div className='not-found-style'>
            <div className='img-container'>
                <img src={notFoundImg} className='not-found' alt='not-found' />
            </div>
            <Link to={buttonLink} className="link-button">
                {buttonText}
            </Link>
        </div>
    );
}

export default ErrorPage;