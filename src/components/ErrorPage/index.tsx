
import { Link } from 'react-router-dom';
import { ErrorPageProps } from '../../utils/types/type';

const ErrorPage : React.FC<ErrorPageProps> = ({ notFoundImg, title, subTitle, buttonLink, buttonColor, buttonText }) => {
    return (
        <div className='not-found-style width100 valign-wrapper vcenter'>
            <div className='img-container valign-wrapper vcenter'>
                <img src={notFoundImg} className='not-found' alt='not-found' />
            </div>
            <p className='title center-align'>{title}</p>
            <p className='sub-title center-align'>{subTitle}</p>
            <Link to={buttonLink} className={`link-button valign-wrapper vcenter text-decoration-none ${buttonColor}`}>
                {buttonText}
            </Link>
        </div>
    );
}

export default ErrorPage;