import { useState, useEffect } from 'react'
import { getImages } from './components/services/api'
import './App.css'
import SearchBar from './components/SearchBar/SearchBar'
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';


function App() {

    const [searchQuery, setSearchQuery] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] =useState(false);
    const[images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [nbPage, setNbPage] = useState(false)
    const [modal, setModal] = useState({ isOpen: false, imgUrl: "", imgAlt: "" });

const handleSubmit = (searchQuery) => {
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
        setIsError(false);
        setIsLoading(true);
        const {results, total_pages} = await getImages(searchQuery, page);
        if (results.length === 0 && page === 1) {
            setIsEmpty(true);
        } else {
            setImages(prev => page === 1 ? results : [...prev, ...results]);
            setNbPage(page < total_pages);
            setIsEmpty(false);
        }
    } catch {
        setIsError(true);
    } finally {
        setIsLoading(false);
    }
};
fetchImage()
}, [searchQuery, page]);

const handleLoadMore = () => {
    setPage(prev => prev + 1)
};

const openModal = (url, alt) => {
    setModal({ ...modal, isOpen: true, imgUrl: url, imgAlt: alt || "Image" });
};

const closeModal = () => {
    setModal({ ...modal, isOpen: false, imgUrl: "", imgAlt: "Image" });
};

return (
    <div>
        <SearchBar onSubmit={handleSubmit}/>
        {isEmpty && (
        <ErrorMessage>Sorry.You should write correct text.</ErrorMessage>
        )}
        {isError && <ErrorMessage>Something went wrong. Try refreshing the page.</ErrorMessage>}
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

export default App
