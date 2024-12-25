import css from './ImageCard.module.css';

interface ImageProps {
    description: string;
    small: string;
    regular: string;
    color: string;
    openModal: (url: string, description: string) => void;
}

const ImageCard: React.FC<ImageProps> = ({description, small, regular, openModal}) => {
return (
    <img 
    className={css.img}
    src={small}
    alt={description}
    onClick={() => openModal(regular, description)}
    />
);
};
export default ImageCard;