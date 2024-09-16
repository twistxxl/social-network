import React from "react";
import style from "./Users.module.css"

type PropsType = {
    currentPage: number
    onPageChanged: (p: number) => void
    totalItemsCount: number
    pageSize: number
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({ currentPage, onPageChanged, totalItemsCount, pageSize, portionSize = 10 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = React.useState(1)

    //как типизировать хук
    // let [portionNumber, setPortionNumber] = React.useState<number | null>(null)
    // if(portionNumber === null){
    //     portionNumber = 1
    // }
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <>
            <div className={style.paginator}>
                {portionNumber > 1 &&
                    <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>
                }
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return <span className={currentPage === p && style.selectedPage} onClick={() => { onPageChanged(p) }}>{p}</span>
                    })}
                {portionCount > portionNumber &&
                    <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>
                }

            </div>
        </>

    )

}


export default Paginator