import css from './SearchBar.module.css'
import toast, { Toaster } from 'react-hot-toast';

const SearchBar = ({onSubmit}) => {

    const handleSubmit = (evt) => {
        evt.preventDefault();
    const form = evt.target;
    const searchQuery = form.elements.query.value.trim();

    if(!searchQuery) {
toast.error('Please enter a search query!', {
    style: {
        background: 'red',
        color: 'white',
    }
});
return;
    }
    onSubmit(searchQuery);
    form.reset()
    }

return (
    <header className={css.header}>
<form className={css.form} onSubmit={handleSubmit}> 
    <input
    className={css.searchInput}
    type="text"
    name="query"
    autoComplete="off"
    autoFocus
    placeholder="Search images and photos"
    />
    <button className={css.submitBtn} type="submit">Search</button>
    <Toaster position="top-right" reverseOrder={false} />
</form>
</header>
)
};

export default SearchBar;