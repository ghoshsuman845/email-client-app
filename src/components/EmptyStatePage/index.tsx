import notFound from '../../assets/images/NotFound.jpg';
import { EmptyStateProps } from '../../utils/types/type';

const EmptyState : React.FC<EmptyStateProps> = ({ title, subTitle }) => { 
       
  return (
    <div className='empty-state-style'>
      <div className='img-container'>
        <img src={notFound} className='not-found' alt='not-found' />
      </div>
      <p className='title'>{title}</p>
      <p className='sub-title'>{subTitle}</p>
    </div>
  );
}


export default EmptyState;