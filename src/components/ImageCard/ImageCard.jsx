import css from './ImageCard.module.css';

const ImageCard = ({description, small, regular, openModal}) => {
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