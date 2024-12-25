import css from './ImageGallery.module.css'
import ImageCard from '../ImageCard/ImageCard'

const ImageGallery = ({ images, openModal }) => {
	return (
	  <ul className={css.imgList}>
		{images.map(({ id, description, urls: { small, regular } }) => {
		  return (
			<li key={id} className={css.imgItem}>
			  <ImageCard
				small={small}
				regular={regular}
				description={description}
				openModal={openModal}
			  />
			</li>
		  );
		})}
	  </ul>
	);
  };
  
  export default ImageGallery;