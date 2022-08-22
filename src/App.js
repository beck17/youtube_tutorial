import React, {useEffect, useState} from 'react';
import './index.scss';
import Collection from "./components/Collection";

const cats = [
    {"name": "Все"},
    {"name": "Море"},
    {"name": "Горы"},
    {"name": "Архитектура"},
    {"name": "Города"}
]

function App() {
    const [categoryId, setCategoryId] = useState(0)
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [collections, setCollections] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        setIsLoading(true)

        const category = categoryId ? `category=${categoryId}` : ''


        fetch(
            `https://63028f4bc6dda4f287bb7e94.mockapi.io/photos?page=${page}&limit=3&${category}`,
        )
            .then(res => res.json())
            .then((json) => {
                setCollections(json)
            })
            .catch((e) => {
                console.warn(e)
            })
            .finally(() => setIsLoading(false))
    }, [categoryId,page])


    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {
                        cats.map((cat, i) =>
                            <li
                                key={cat.name}
                                onClick={() => setCategoryId(i)}
                                className={categoryId === i ? 'active' : ''}
                            >
                                {cat.name}
                            </li>
                        )
                    }
                </ul>
                <input className="search-input"
                       placeholder="Поиск по названию"
                       value={search}
                       onChange={e => setSearch(e.target.value)}
                />
            </div>
            <div className="content">
                {isLoading ? (
                    <h2>Идёт загрузка...</h2>
                ) : (
                    collections
                        .filter((obj) => {
                            return obj.name.toLowerCase().includes(search.toLowerCase())
                        })
                        .map((obj, index) =>
                            <Collection
                                key={index + obj.name}
                                name={obj.name}
                                images={obj.photos}
                            />
                        )
                )}

            </div>
            <ul className="pagination">
                {
                    [...Array(3)].map((_,i) => (
                        <li
                            className={page === (i + 1) ? 'active' : ''}
                            onClick={() => setPage(i+1)}
                        >{i + 1}</li>
                    ))
                }
            </ul>
        </div>
    );
}

export default App;
