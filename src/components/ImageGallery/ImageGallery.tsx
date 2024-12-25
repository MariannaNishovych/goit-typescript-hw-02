import css from './ImageGallery.module.css'
import ImageCard from '../ImageCard/ImageCard'
import { Image } from '../../types';

type GalleryProps = {
	images: Image[];
	openModal: (url: string, alt: string) => void;
};

const ImageGallery = ({ images, openModal }: GalleryProps) => {
	return (
	<ul className={css.imgList}>
		{images.map(({ id, alt_description, urls, color}: Image) => {
		return (
			<li key={id} className={css.imgItem}>
			<ImageCard
				small={urls.small}
				regular={urls.regular}
				color={color}
				description={alt_description}
				openModal={openModal}
			/>
			</li>
		);
		})}
	</ul>
	);
};

export default ImageGallery;