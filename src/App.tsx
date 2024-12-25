import { useState, useEffect } from 'react'
import { getImages } from './components/services/api'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { Image, Response } from './types';

interface ModalState {
    isOpen: boolean;
    imgUrl: string;
    imgAlt: string;
}

function App() {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<null | string>(null);
    const [isEmpty, setIsEmpty] =useState<boolean>(false);
    const[images, setImages] = useState<Image[]>([]);
    const [page, setPage] = useState<number>(1);
    const [nbPage, setNbPage] = useState(false)
    const [modal, setModal] = useState<ModalState>({ 
        isOpen: false, 
        imgUrl: "", 
        imgAlt: "" });

const handleSubmit = (searchQuery: string): void => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
}

useEffect(()=>{
if(!searchQuery) {
    return;
}
const fetchImage = async () =>{
    try {
        setIsLoading(true);
        const {results, total_pages}: Response = await getImages(searchQuery, page);

        if (results.length === 0 && page === 1) {
            setIsEmpty(true);
        } else {
            setImages(prev => page === 1 ? results : [...prev, ...results]);
            setNbPage(page < total_pages);
            setIsEmpty(false);
        }
    } catch (err) {
        if (err instanceof Error) {
            setIsError(err.message);
        } else {
            setIsError('Error occurred');
        }
        
    } finally {
        setIsLoading(false);
    }
};

fetchImage()
}, [searchQuery, page]);

const handleLoadMore = (): void => {
    setPage(prev => prev + 1)
};

const openModal = (url: string, alt: string): void => {
    setModal({ ...modal, isOpen: true, imgUrl: url, imgAlt: alt || "Image" });
};

const closeModal = (): void => {
    setModal({ ...modal, isOpen: false, imgUrl: "", imgAlt: "Image" });
};

return (
    <div>
        <SearchBar onSubmit={handleSubmit}/>
        {isEmpty && (
        <p style={{ color: "red" }}>
            Sorry.You should write correct text.</p>
        )}

        {isError && <ErrorMessage error={isError} />}

        {images.length >0 && (<ImageGallery images={images} openModal={openModal} />)}
        {nbPage && <LoadMoreBtn onClick={handleLoadMore}/>}
        {isLoading && <Loader />}
        <ImageModal
        isOpen={modal.isOpen}
        imgUrl={modal.imgUrl}
        imgAlt={modal.imgAlt}
        closeModal={closeModal}
        />
    </div>
);
};

export default App;
